export type FieldType = 'X' | 'D' | 'N';
export type Mandatory = 'M' | 'NM' | 'D';

export interface FieldSpec {
  id: string;
  name: string;
  type: FieldType;
  mandatory: Mandatory;
  maxLength: number;
  domain?: readonly string[];
  fixedValue?: string;
}

export interface ValidationError {
  field?: string;
  message: string;
}

export type RecordType = 'HD' | 'ID' | 'UNKNOWN';

export interface LineResult {
  lineNumber: number;
  recordType: RecordType;
  rawRecordType: string;
  passed: boolean;
  errors: ValidationError[];
  raw: string;
}

export interface FileReport {
  totalLines: number;
  passed: number;
  failed: number;
  lines: LineResult[];
}
