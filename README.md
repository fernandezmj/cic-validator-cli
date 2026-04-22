# CIC Submission File Validator — CLI

Validates pipe-delimited CIC submission files (HD header + ID individuals records) against the rules in `validation-rules-HD-ID.txt`.

## Quick start

```bash
npm install
npm run validate
```

This compiles TypeScript and runs the validator against `test-data/test-submit-data.txt`.

## Usage

```bash
# Build once, then run:
npm run build
node dist/index.js path/to/submission.txt

# Or development mode (no build step):
npx tsx src/index.ts path/to/submission.txt

# Disable ANSI colors:
node dist/index.js path/to/submission.txt --no-color
```

Exit code is `0` if all lines pass, `1` if any line fails, `2` on usage/IO error.

## What it validates

| Category | Examples |
|---|---|
| Field count | HD: 5–6, ID: 122–123 |
| Mandatory (M) fields | Non-empty check |
| Fixed values | `HD`, `ID`, version `1.0`, Address 1 type `MI` |
| Date format | `DDMMYYYY`, valid calendar date |
| Number (N) fields | Integer only, no commas/decimals |
| Domain | Gender, Title, Civil Status, Country (ISO), Currency, Contact/ID/Identification types, etc. |
| Max length | Per-field cap |
| Cross-field: Age | 18–100 against HD File Reference Date |
| Cross-field: Dates | Subject Ref Date ≤ File Ref Date |
| Cross-field: Address 1 | FullAddress XOR split fields; City+Province required with split |
| Cross-field: Address 2 | Type must be `AI` if present; FullAddress XOR split; City+Province required with split |
| Cross-field: Paired fields | Identification/ID Document/Contact Type ↔ Number/Value both filled or both empty |
| Cross-field: Identification | At least one of ID54/55, ID56/57, ID58/59 must be filled |

Lines starting with anything other than `HD`/`ID` (e.g., `FT` footer, blank record type) are flagged as unknown.

## Project layout

```
src/
  types.ts       Type definitions
  domains.ts     Allowed values (ISO countries, currencies, enumerations)
  schema.ts      Field specs for HD (6) and ID (123)
  validator.ts   Pure validation engine (isomorphic — runs in Node and browser)
  format.ts      Console report formatting
  index.ts       CLI entry
```

The `validator.ts` module has **no Node-specific imports** and is reused as-is in the companion `cic-validator-web` repository.

## Known limitations

These are conscious scope decisions, documented so reviewers can see what's in and out.

- **MFI vs non-MFI provider gating is not enforced.** The spec gates several fields (Address 2 mandatoriness, ID34 StreetNo, ID36 Subdivision, Contact mandatoriness) on whether the provider is a Microfinance Institution. MFI status is not a field in the submission file — it is determined by the provider's registration with CIC. A production deployment would accept this as a per-provider configuration input. See the [CIC submitting-entities list](https://www.creditinfo.gov.ph/list-submitting-entities-production).
- **HD3 File Reference Date is compared only to ID4 Subject Reference Date.** The spec states HD3 must be "≥ all other Reference Dates in the file," but other D-typed fields (DOB, ID issue/expiry, hire dates, occupied-since) are historical facts, not business "reference dates." Only the pairing with Subject Ref Date is validated.
- **PSOC (ID92 — Occupation) is format-validated only.** The field is checked for digits-only and max length 4. PSOC 2012 has 456 unit groups under 43 sub-major groups that broadly align with ISCO-08; we have not been able to confirm a complete Philippine-specific sub-major list against an authoritative PSA publication, so we do not reject at the sub-major level to avoid false positives against legitimate Philippine codes. See the [PSA PSOC page](https://psa.gov.ph/classification/psoc).
- **Sole Trader cross-field rules (ID93–ID123) are not enforced.** The spec states rules "similar to Address 1" apply to Sole Trader addresses and that at least one Sole Trader Identification should be TIN when any are provided. Pair/length/domain validation on the individual fields still runs, but the cross-field logic mirror is not implemented.
- **No unit tests.** Validated end-to-end against the provided `test-submit-data.txt`.
- **Field-count mismatch cascades.** If an ID line has far fewer than 122 fields, every missing mandatory field produces its own error in addition to the field-count error. This is noisy but technically accurate.

### What was tightened in this revision

- **Country domain** now covers the complete ISO 3166-1 alpha-2 list (249 codes) — previously a ~200-entry subset.
- **Currency domain** now covers the full set of active ISO 4217 national currencies (~152 codes) — previously a ~30-entry common subset.
- **PSIC (ID85)** now validates against the 88 real [PSIC 2009 divisions](https://psa.gov.ph/classification/psic) at the 2-digit prefix level. Higher-precision codes (group / class / sub-class) are accepted under any valid division. Catches garbage codes like `99999`-in-a-nonexistent-division.
