import type { FieldSpec, FileReport, LineResult, ValidationError, RecordType } from './types.js';
import {
  HD_SCHEMA, HD_MIN_FIELDS, HD_MAX_FIELDS,
  ID_SCHEMA, ID_MIN_FIELDS, ID_MAX_FIELDS,
} from './schema.js';

const DATE_RE = /^\d{8}$/;
const INTEGER_RE = /^\d+$/;

function parseDDMMYYYY(value: string): Date | null {
  if (!DATE_RE.test(value)) return null;
  const day = Number(value.slice(0, 2));
  const month = Number(value.slice(2, 4));
  const year = Number(value.slice(4, 8));
  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > 2100) return null;
  const d = new Date(Date.UTC(year, month - 1, day));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) {
    return null;
  }
  return d;
}

function yearsBetween(from: Date, to: Date): number {
  let years = to.getUTCFullYear() - from.getUTCFullYear();
  const beforeBirthday =
    to.getUTCMonth() < from.getUTCMonth() ||
    (to.getUTCMonth() === from.getUTCMonth() && to.getUTCDate() < from.getUTCDate());
  if (beforeBirthday) years -= 1;
  return years;
}

function validateField(spec: FieldSpec, raw: string | undefined): ValidationError[] {
  const errors: ValidationError[] = [];
  const value = raw ?? '';
  const label = `${spec.id} (${spec.name})`;

  if (spec.mandatory === 'M' && value === '') {
    errors.push({ field: spec.id, message: `${label}: mandatory field is empty` });
    return errors;
  }
  if (value === '') return errors;

  if (spec.maxLength && value.length > spec.maxLength) {
    errors.push({ field: spec.id, message: `${label}: length ${value.length} exceeds max ${spec.maxLength}` });
  }
  if (spec.fixedValue !== undefined && value !== spec.fixedValue) {
    errors.push({ field: spec.id, message: `${label}: expected "${spec.fixedValue}", got "${value}"` });
  }
  if (spec.type === 'D' && !parseDDMMYYYY(value)) {
    errors.push({ field: spec.id, message: `${label}: invalid date "${value}" (expected DDMMYYYY, valid calendar date)` });
  }
  if (spec.type === 'N' && !INTEGER_RE.test(value)) {
    errors.push({ field: spec.id, message: `${label}: must be integer (no commas, no decimals), got "${value}"` });
  }
  if (spec.domain && spec.prefixLength) {
    // Hierarchical prefix check (e.g., PSIC division, PSOC sub-major group).
    if (value.length < spec.prefixLength) {
      errors.push({
        field: spec.id,
        message: `${label}: "${value}" is shorter than the ${spec.prefixLength}-digit classification prefix`,
      });
    } else {
      const prefix = value.slice(0, spec.prefixLength);
      if (!spec.domain.includes(prefix)) {
        errors.push({
          field: spec.id,
          message: `${label}: prefix "${prefix}" is not a valid classification code`,
        });
      }
    }
  } else if (spec.domain && !spec.domain.includes(value)) {
    errors.push({ field: spec.id, message: `${label}: "${value}" is not in allowed domain` });
  }
  return errors;
}

function validateRecord(
  schema: readonly FieldSpec[],
  fields: string[],
  minFields: number,
  maxFields: number,
): ValidationError[] {
  const errors: ValidationError[] = [];
  if (fields.length < minFields || fields.length > maxFields) {
    errors.push({
      message: `Field count ${fields.length} out of range (${minFields}–${maxFields})`,
    });
  }
  for (let i = 0; i < schema.length; i++) {
    errors.push(...validateField(schema[i]!, fields[i]));
  }
  return errors;
}

function validateIDCrossField(fields: string[], fileRefDate: Date | null): ValidationError[] {
  const errors: ValidationError[] = [];

  const get = (n: number): string => fields[n - 1] ?? '';

  const subjectRefRaw = get(4);
  const subjectRef = parseDDMMYYYY(subjectRefRaw);
  if (subjectRef && fileRefDate && subjectRef.getTime() > fileRefDate.getTime()) {
    errors.push({
      field: 'ID4',
      message: `ID4 (Subject Reference Date) ${subjectRefRaw} is after HD3 File Reference Date`,
    });
  }

  const dobRaw = get(14);
  const dob = parseDDMMYYYY(dobRaw);
  if (dob) {
    const ref = fileRefDate ?? new Date();
    const age = yearsBetween(dob, ref);
    if (age < 18 || age > 100) {
      errors.push({ field: 'ID14', message: `ID14 (Date of Birth): age ${age} is outside 18–100` });
    }
  }

  // Address 1: FullAddress (ID33) vs split fields (ID34, ID36..ID39)
  const addr1Full = get(33);
  const addr1Split = [get(34), get(36), get(37), get(38), get(39)];
  const hasAnySplit = addr1Split.some((s) => s !== '');
  if (!addr1Full && !hasAnySplit) {
    errors.push({
      message: 'Address 1: must provide either FullAddress (ID33) or split address fields',
    });
  }
  if (addr1Full && hasAnySplit) {
    errors.push({
      message: 'Address 1: FullAddress (ID33) and split fields are mutually exclusive',
    });
  }
  if (hasAnySplit) {
    if (get(38) === '') errors.push({ field: 'ID38', message: 'ID38 (Address 1: City) required when split address is used' });
    if (get(39) === '') errors.push({ field: 'ID39', message: 'ID39 (Address 1: Province) required when split address is used' });
  }

  // Address 2 Type rule: if provided, must be "AI"
  const addr2Type = get(43);
  if (addr2Type && addr2Type !== 'AI') {
    errors.push({ field: 'ID43', message: `ID43 (Address 2: Address Type): expected "AI" when provided, got "${addr2Type}"` });
  }

  // Address 2: FullAddress (ID44) vs split fields (ID45, ID47..ID50)
  // Only validate if Address 2 is being used (any of its fields is filled).
  const addr2Full = get(44);
  const addr2Split = [get(45), get(47), get(48), get(49), get(50)];
  const hasAnyAddr2Split = addr2Split.some((s) => s !== '');
  if (addr2Full && hasAnyAddr2Split) {
    errors.push({
      message: 'Address 2: FullAddress (ID44) and split fields are mutually exclusive',
    });
  }
  if (hasAnyAddr2Split) {
    if (get(49) === '') errors.push({ field: 'ID49', message: 'ID49 (Address 2: City) required when split address is used' });
    if (get(50) === '') errors.push({ field: 'ID50', message: 'ID50 (Address 2: Province) required when split address is used' });
  }

  // Paired fields: Identification Type/Number and ID Document Type/Number and Contact Type/Value
  const pairs: Array<[number, number, string]> = [
    [54, 55, 'Identification 1'],
    [56, 57, 'Identification 2'],
    [58, 59, 'Identification 3'],
    [60, 61, 'ID Document 1'],
    [66, 67, 'ID Document 2'],
    [72, 73, 'ID Document 3'],
    [78, 79, 'Contact 1'],
    [80, 81, 'Contact 2'],
    [116, 117, 'Sole Trader Identification 1'],
    [118, 119, 'Sole Trader Identification 2'],
    [120, 121, 'Sole Trader Contact 1'],
    [122, 123, 'Sole Trader Contact 2'],
  ];
  for (const [a, b, label] of pairs) {
    const aVal = get(a);
    const bVal = get(b);
    if ((aVal === '') !== (bVal === '')) {
      errors.push({
        message: `${label}: Type (ID${a}) and Number/Value (ID${b}) must both be filled or both be empty`,
      });
    }
  }

  // At least one Identification pair (ID54/55, ID56/57, or ID58/59) must be filled.
  // Rules doc prefers TIN/SSS/GSIS (codes 10/11/12) but does not strictly require
  // them — any valid identification type is accepted here.
  const hasAnyIdentification =
    (get(54) !== '' && get(55) !== '') ||
    (get(56) !== '' && get(57) !== '') ||
    (get(58) !== '' && get(59) !== '');
  if (!hasAnyIdentification) {
    errors.push({
      message: 'At least one Identification pair must be filled (ID54/55, ID56/57, or ID58/59)',
    });
  }

  return errors;
}

export function detectRecordType(firstField: string): RecordType {
  if (firstField === 'HD') return 'HD';
  if (firstField === 'ID') return 'ID';
  return 'UNKNOWN';
}

export function validateHDLine(line: string, lineNumber: number): LineResult {
  const fields = line.split('|');
  const errors = validateRecord(HD_SCHEMA, fields, HD_MIN_FIELDS, HD_MAX_FIELDS);
  return {
    lineNumber,
    recordType: 'HD',
    rawRecordType: fields[0] ?? '',
    passed: errors.length === 0,
    errors,
    raw: line,
  };
}

export function validateIDLine(line: string, lineNumber: number, fileRefDate: Date | null): LineResult {
  const fields = line.split('|');
  const errors = validateRecord(ID_SCHEMA, fields, ID_MIN_FIELDS, ID_MAX_FIELDS);
  errors.push(...validateIDCrossField(fields, fileRefDate));
  return {
    lineNumber,
    recordType: 'ID',
    rawRecordType: fields[0] ?? '',
    passed: errors.length === 0,
    errors,
    raw: line,
  };
}

export function validateFile(text: string): FileReport {
  const lines = text.split(/\r?\n/).filter((l, idx, arr) => !(idx === arr.length - 1 && l === ''));
  const results: LineResult[] = [];
  let fileRefDate: Date | null = null;
  const subjectNumbers = new Map<string, number>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const lineNumber = i + 1;
    const fields = line.split('|');
    const recType = detectRecordType(fields[0] ?? '');

    if (recType === 'HD') {
      const result = validateHDLine(line, lineNumber);
      if (fields[2]) fileRefDate = parseDDMMYYYY(fields[2]);
      results.push(result);
    } else if (recType === 'ID') {
      const result = validateIDLine(line, lineNumber, fileRefDate);
      const subjectNo = fields[4] ?? '';
      if (subjectNo !== '') {
        const firstSeen = subjectNumbers.get(subjectNo);
        if (firstSeen !== undefined) {
          result.errors.push({
            field: 'ID5',
            message: `ID5 (Provider Subject No): duplicate value "${subjectNo}" (first seen on line ${firstSeen})`,
          });
          result.passed = false;
        } else {
          subjectNumbers.set(subjectNo, lineNumber);
        }
      }
      results.push(result);
    } else {
      results.push({
        lineNumber,
        recordType: 'UNKNOWN',
        rawRecordType: fields[0] ?? '',
        passed: false,
        errors: [{ message: `Unknown record type "${fields[0] ?? ''}" (expected HD or ID)` }],
        raw: line,
      });
    }
  }

  const passed = results.filter((r) => r.passed).length;
  return {
    totalLines: results.length,
    passed,
    failed: results.length - passed,
    lines: results,
  };
}
