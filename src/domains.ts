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

export const CURRENCY_DOMAIN = [
  'PHP', 'USD', 'EUR', 'JPY', 'GBP', 'CNY', 'HKD', 'SGD', 'AUD', 'CAD',
  'CHF', 'NZD', 'KRW', 'TWD', 'THB', 'MYR', 'IDR', 'VND', 'INR', 'AED',
  'SAR', 'QAR', 'KWD', 'BHD', 'OMR', 'ZAR', 'BRL', 'MXN', 'RUB',
] as const;

// ISO 3166-1 alpha-2 country codes (condensed common subset).
export const COUNTRY_DOMAIN = [
  'AF','AL','DZ','AS','AD','AO','AI','AQ','AG','AR','AM','AW','AU','AT','AZ',
  'BS','BH','BD','BB','BY','BE','BZ','BJ','BM','BT','BO','BA','BW','BR','BN',
  'BG','BF','BI','KH','CM','CA','CV','KY','CF','TD','CL','CN','CO','KM','CG',
  'CD','CR','CI','HR','CU','CY','CZ','DK','DJ','DM','DO','EC','EG','SV','GQ',
  'ER','EE','ET','FJ','FI','FR','GF','PF','GA','GM','GE','DE','GH','GI','GR',
  'GL','GD','GP','GU','GT','GN','GW','GY','HT','HN','HK','HU','IS','IN','ID',
  'IR','IQ','IE','IL','IT','JM','JP','JO','KZ','KE','KI','KP','KR','KW','KG',
  'LA','LV','LB','LS','LR','LY','LI','LT','LU','MO','MK','MG','MW','MY','MV',
  'ML','MT','MH','MQ','MR','MU','MX','FM','MD','MC','MN','ME','MS','MA','MZ',
  'MM','NA','NR','NP','NL','NC','NZ','NI','NE','NG','NU','NF','MP','NO','OM',
  'PK','PW','PS','PA','PG','PY','PE','PH','PL','PT','PR','QA','RE','RO','RU',
  'RW','WS','SM','ST','SA','SN','RS','SC','SL','SG','SK','SI','SB','SO','ZA',
  'ES','LK','SD','SR','SZ','SE','CH','SY','TW','TJ','TZ','TH','TL','TG','TO',
  'TT','TN','TR','TM','TV','UG','UA','AE','GB','US','UY','UZ','VU','VE','VN',
  'VG','VI','YE','ZM','ZW',
] as const;
