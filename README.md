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
| Cross-field: Address 2 | Type must be `AI` if present |
| Cross-field: Paired fields | Identification/ID Document/Contact Type ↔ Number/Value both filled or both empty |
| Cross-field: Identification | At least one group (TIN/SSS/GSIS) required |

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

- **MFI vs non-MFI provider gating is not enforced.** The spec gates several fields (Address 2 mandatoriness, ID34 StreetNo, ID36 Subdivision, Contact mandatoriness) on whether the provider is a Microfinance Institution. MFI status is not present in the file itself, so it cannot be determined from the data alone. A production build would take this as a per-provider configuration input.
- **HD3 File Reference Date is compared only to ID4 Subject Reference Date.** The spec states HD3 must be "≥ all other Reference Dates in the file," but other D-typed fields (DOB, ID issue/expiry, hire dates, occupied-since) are not business "reference dates" in the submission sense — they're historical facts. Only the pairing with Subject Ref Date is validated.
- **Country domain is a condensed ISO 3166-1 alpha-2 subset** (~200 codes, covers all countries in the test data). A production build should use a canonical list such as `i18n-iso-countries`.
- **Currency domain is a common subset** including PHP, USD, EUR, JPY, etc. Same caveat — a production build should integrate an authoritative reference.
- **PSIC (ID85) and PSOC (ID92) domains are not enforced.** Their reference tables are not included in the rules summary provided.
- **No unit tests.** Validated end-to-end against the provided `test-submit-data.txt`. See the `test-data/` directory.
- **Field-count mismatch cascades.** If an ID line has far fewer than 122 fields, every missing mandatory field produces its own error in addition to the field-count error. This is noisy but technically accurate.
