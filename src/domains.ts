export const TITLE_DOMAIN = [
  '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
] as const;

export const GENDER_DOMAIN = ['M', 'F'] as const;

export const RESIDENT_DOMAIN = ['0', '1'] as const;

export const CIVIL_STATUS_DOMAIN = ['1', '2', '3', '4'] as const;

export const HOUSE_OWNER_DOMAIN = ['1', '2', '3', '4'] as const;

export const IDENTIFICATION_TYPE_DOMAIN = [
  '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
] as const;

export const ID_DOC_TYPE_DOMAIN = [
  '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
  '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
  '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
] as const;

export const CONTACT_TYPE_DOMAIN = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

export const ANNUAL_MONTHLY_DOMAIN = ['M', 'Y'] as const;

export const OCCUPATION_STATUS_DOMAIN = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

export const SUBMISSION_TYPE_DOMAIN = ['0', '1'] as const;

// ISO 4217 active national currency codes (2026 snapshot). Sourced from the
// Wikipedia ISO 4217 active-codes table.
export const CURRENCY_DOMAIN = [
  'AED', 'AFN', 'ALL', 'AMD', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM',
  'BBD', 'BDT', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN',
  'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNY', 'COP',
  'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN',
  'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF',
  'GTQ', 'GYD', 'HKD', 'HNL', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD',
  'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW',
  'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD',
  'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR',
  'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD',
  'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON',
  'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP',
  'SLE', 'SOS', 'SRD', 'SSP', 'STN', 'SVC', 'SYP', 'SZL', 'THB', 'TJS',
  'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD',
  'UYU', 'UZS', 'VED', 'VES', 'VND', 'VUV', 'WST', 'YER', 'ZAR', 'ZMW',
  'ZWG',
] as const;

// ISO 3166-1 alpha-2 country codes — complete 249-entry list (2026 snapshot).
// Sourced from the Wikipedia ISO 3166-1 alpha-2 table.
export const COUNTRY_DOMAIN = [
  'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR',
  'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE',
  'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ',
  'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD',
  'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR',
  'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM',
  'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI',
  'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF',
  'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS',
  'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU',
  'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT',
  'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN',
  'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK',
  'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME',
  'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ',
  'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA',
  'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU',
  'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM',
  'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS',
  'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI',
  'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV',
  'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK',
  'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA',
  'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI',
  'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW',
] as const;

// PSIC 2009 (with 2019 updates) — 88 two-digit division codes. Sourced from
// the PSA PSIC structure (21 sections, 88 divisions). We validate that the
// first 2 digits of the PSIC field match a real division; higher-precision
// codes (group/class/sub-class) are accepted under a valid division prefix.
export const PSIC_DIVISION_DOMAIN = [
  '01', '02', '03',                                      // A Agriculture, forestry, fishing
  '05', '06', '07', '08', '09',                          // B Mining and quarrying
  '10', '11', '12', '13', '14', '15', '16', '17',        // C Manufacturing (part 1)
  '18', '19', '20', '21', '22', '23', '24', '25',        // C Manufacturing (part 2)
  '26', '27', '28', '29', '30', '31', '32', '33',        // C Manufacturing (part 3)
  '35',                                                  // D Electricity, gas, steam, air-con
  '36', '37', '38', '39',                                // E Water supply, sewerage, waste
  '41', '42', '43',                                      // F Construction
  '45', '46', '47',                                      // G Wholesale and retail trade
  '49', '50', '51', '52', '53',                          // H Transportation and storage
  '55', '56',                                            // I Accommodation and food service
  '58', '59', '60', '61', '62', '63',                    // J Information and communication
  '64', '65', '66',                                      // K Financial and insurance
  '68',                                                  // L Real estate
  '69', '70', '71', '72', '73', '74', '75',              // M Professional, scientific, technical
  '77', '78', '79', '80', '81', '82',                    // N Administrative and support service
  '84',                                                  // O Public administration, defence
  '85',                                                  // P Education
  '86', '87', '88',                                      // Q Human health and social work
  '90', '91', '92', '93',                                // R Arts, entertainment, recreation
  '94', '95', '96',                                      // S Other service activities
  '97', '98',                                            // T Households as employers
  '99',                                                  // U Extraterritorial organisations
] as const;

// PSOC 2012 — 43 two-digit sub-major group codes, aligned to ISCO-08 which
// PSOC mirrors. Major group 0 (Armed Forces / special) uses 01, 02, 03.
// We validate that the first 2 digits of the Occupation field match a real
// sub-major group; higher-precision codes (minor/unit) are accepted under
// a valid sub-major prefix.
export const PSOC_SUB_MAJOR_DOMAIN = [
  '01', '02', '03',                        // 0 Armed Forces / Special
  '11', '12', '13', '14',                  // 1 Managers
  '21', '22', '23', '24', '25', '26',      // 2 Professionals
  '31', '32', '33', '34', '35',            // 3 Technicians and associate professionals
  '41', '42', '43', '44',                  // 4 Clerical support workers
  '51', '52', '53', '54',                  // 5 Service and sales workers
  '61', '62', '63',                        // 6 Skilled agricultural, forestry, fishery
  '71', '72', '73', '74', '75',            // 7 Craft and related trades
  '81', '82', '83',                        // 8 Plant and machine operators, assemblers
  '91', '92', '93', '94', '95', '96',      // 9 Elementary occupations
] as const;
