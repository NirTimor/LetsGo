import React from 'react';
import dayjs from "dayjs";
import { Box, colors } from '@mui/material';
import { PushPin } from '@mui/icons-material';

// Constants

export const PAGE_SIZE = 10;

// Functions

export const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const capitalizeSentence = (s) => {
    if (!s) return;
    const words = s.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
};

export const isEmpty = (item) => {
    if (typeof item === 'object' && item !== null) {
        return Object.keys(item).length === 0;
    }
    if (Array.isArray(item)) {
        return item.length === 0;
    }
    return !item;
};

export const getBeDate = (date) => dayjs(date).toISOString();

export const getBeLanguages = (languages) => languages.map((lang) => languageOptions.find((option) => option.label === lang).value);

export const getBeInterests = (interests) => interests.map((interest) => interestOptions.find((option) => option.label === interest).value);

export const getBeGender = (gender) => gender === 'Male';

export const getBooleanValue = (bool) => bool ? 'Yes' : 'No';

export const getFormattedDate = (timestamp) => dayjs(timestamp).format("DD MMMM, YYYY");

export const getMonthName = (monthNumber) => months.filter((month) => month.number === monthNumber)[0]?.name;

// Styles

export const border = `1px solid ${colors.grey[300]}`;

// Lists

export const months = [
    {
        number: 1,
        name: "January"
    },
    {
        number: 2,
        name: "February"
    },
    {
        number: 3,
        name: "March"
    },
    {
        number: 4,
        name: "April"
    },
    {
        number: 5,
        name: "May"
    },
    {
        number: 6,
        name: "June"
    },
    {
        number: 7,
        name: "July"
    },
    {
        number: 8,
        name: "August"
    },
    {
        number: 9,
        name: "September"
    },
    {
        number: 10,
        name: "October"
    },
    {
        number: 11,
        name: "November"
    },
    {
        number: 12,
        name: "December"
    }
];

export const countryCodes = [
    { countryCode: 'SZ', countryName: 'Swaziland' },
    { countryCode: 'SG', countryName: 'Singapore' },
    { countryCode: 'SM', countryName: 'San Marino' },
    { countryCode: 'LC', countryName: 'Saint Lucia' },
    { countryCode: 'YT', countryName: 'Mayotte' },
    { countryCode: 'MU', countryName: 'Mauritius' },
    { countryCode: 'MQ', countryName: 'Martinique' },
    { countryCode: 'MT', countryName: 'Malta' },
    { countryCode: 'LI', countryName: 'Liechtenstein' },
    { countryCode: 'IM', countryName: 'Isle of Man' },
    { countryCode: 'HK', countryName: 'Hong Kong' },
    { countryCode: 'GU', countryName: 'Guam' },
    { countryCode: 'GP', countryName: 'Guadeloupe' },
    { countryCode: 'PF', countryName: 'French Polynesia' },
    { countryCode: 'FO', countryName: 'Faroe Islands' },
    { countryCode: 'CG', countryName: 'Congo' },
    { countryCode: 'KY', countryName: 'Cayman Islands' },
    { countryCode: 'BN', countryName: 'Brunei' },
    { countryCode: 'BB', countryName: 'Barbados' },
    { countryCode: 'BH', countryName: 'Bahrain' },
    { countryCode: 'AW', countryName: 'Aruba' },
    { countryCode: 'AG', countryName: 'Antigua and Barbuda' },
    { countryCode: 'AS', countryName: 'AmericanSamoa' },
    { countryCode: 'FJ', countryName: 'Fiji' },
    { countryCode: "AD", countryName: "Andorra" },
    { countryCode: 'TZ', countryName: 'Tanzania' },
    { countryCode: 'EH', countryName: 'Western Sahara' },
    { countryCode: 'CA', countryName: 'Canada' },
    { countryCode: 'US', countryName: 'United States' },
    { countryCode: 'KZ', countryName: 'Kazakhstan' },
    { countryCode: 'UZ', countryName: 'Uzbekistan' },
    { countryCode: 'PG', countryName: 'Papua New Guinea' },
    { countryCode: 'ID', countryName: 'Indonesia' },
    { countryCode: 'AR', countryName: 'Argentina' },
    { countryCode: 'CL', countryName: 'Chile' },
    { countryCode: 'CD', countryName: 'Democratic Republic of the Congo' },
    { countryCode: 'SO', countryName: 'Somalia' },
    { countryCode: 'KE', countryName: 'Kenya' },
    { countryCode: 'SD', countryName: 'Sudan' },
    { countryCode: 'TD', countryName: 'Chad' },
    { countryCode: 'HT', countryName: 'Haiti' },
    { countryCode: 'DO', countryName: 'Dominican Republic' },
    { countryCode: 'RU', countryName: 'Russia' },
    { countryCode: 'BS', countryName: 'Bahamas' },
    { countryCode: 'FK', countryName: 'Falkland Islands' },
    { countryCode: 'NO', countryName: 'Norway' },
    { countryCode: 'GL', countryName: 'Greenland' },
    { countryCode: 'TL', countryName: 'Timor-Leste' },
    { countryCode: 'ZA', countryName: 'South Africa' },
    { countryCode: 'LS', countryName: 'Lesotho' },
    { countryCode: 'MX', countryName: 'Mexico' },
    { countryCode: 'UY', countryName: 'Uruguay' },
    { countryCode: 'BR', countryName: 'Brazil' },
    { countryCode: 'BO', countryName: 'Bolivia' },
    { countryCode: 'PE', countryName: 'Peru' },
    { countryCode: 'CO', countryName: 'Colombia' },
    { countryCode: 'PA', countryName: 'Panama' },
    { countryCode: 'CR', countryName: 'Costa Rica' },
    { countryCode: 'NI', countryName: 'Nicaragua' },
    { countryCode: 'HN', countryName: 'Honduras' },
    { countryCode: 'SV', countryName: 'El Salvador' },
    { countryCode: 'GT', countryName: 'Guatemala' },
    { countryCode: 'BZ', countryName: 'Belize' },
    { countryCode: 'VE', countryName: 'Venezuela' },
    { countryCode: 'GY', countryName: 'Guyana' },
    { countryCode: 'SR', countryName: 'Suriname' },
    { countryCode: 'FR', countryName: 'France' },
    { countryCode: 'EC', countryName: 'Ecuador' },
    { countryCode: 'PR', countryName: 'Puerto Rico' },
    { countryCode: 'JM', countryName: 'Jamaica' },
    { countryCode: 'CU', countryName: 'Cuba' },
    { countryCode: 'ZW', countryName: 'Zimbabwe' },
    { countryCode: 'BW', countryName: 'Botswana' },
    { countryCode: 'NA', countryName: 'Namibia' },
    { countryCode: 'SN', countryName: 'Senegal' },
    { countryCode: 'ML', countryName: 'Mali' },
    { countryCode: 'MR', countryName: 'Mauritania' },
    { countryCode: 'BJ', countryName: 'Benin' },
    { countryCode: 'NE', countryName: 'Niger' },
    { countryCode: 'NG', countryName: 'Nigeria' },
    { countryCode: 'CM', countryName: 'Cameroon' },
    { countryCode: 'TG', countryName: 'Togo' },
    { countryCode: 'GH', countryName: 'Ghana' },
    { countryCode: 'CI', countryName: "Côted'Ivoire" },
    { countryCode: 'GN', countryName: 'Guinea' },
    { countryCode: 'GW', countryName: 'Guinea-Bissau' },
    { countryCode: 'LR', countryName: 'Liberia' },
    { countryCode: 'SL', countryName: 'Sierra Leone' },
    { countryCode: 'BF', countryName: 'Burkina Faso' },
    { countryCode: 'CF', countryName: 'Central African Republic' },
    { countryCode: 'CG', countryName: 'Republic of the Congo' },
    { countryCode: 'GA', countryName: 'Gabon' },
    { countryCode: 'GQ', countryName: 'Equatorial Guinea' },
    { countryCode: 'ZM', countryName: 'Zambia' },
    { countryCode: 'MW', countryName: 'Malawi' },
    { countryCode: 'MZ', countryName: 'Mozambique' },
    { countryCode: 'SZ', countryName: 'Eswatini' },
    { countryCode: 'AO', countryName: 'Angola' },
    { countryCode: 'BI', countryName: 'Burundi' },
    { countryCode: 'IL', countryName: 'Israel' },
    { countryCode: 'LB', countryName: 'Lebanon' },
    { countryCode: 'MG', countryName: 'Madagascar' },
    { countryCode: 'PS', countryName: 'Palestine' },
    { countryCode: 'GM', countryName: 'The Gambia' },
    { countryCode: 'TN', countryName: 'Tunisia' },
    { countryCode: 'DZ', countryName: 'Algeria' },
    { countryCode: 'JO', countryName: 'Jordan' },
    { countryCode: 'AE', countryName: 'United Arab Emirates' },
    { countryCode: 'QA', countryName: 'Qatar' },
    { countryCode: 'KW', countryName: 'Kuwait' },
    { countryCode: 'IQ', countryName: 'Iraq' },
    { countryCode: 'OM', countryName: 'Oman' },
    { countryCode: 'VU', countryName: 'Vanuatu' },
    { countryCode: 'KH', countryName: 'Cambodia' },
    { countryCode: 'TH', countryName: 'Thailand' },
    { countryCode: 'LA', countryName: 'Lao PDR' },
    { countryCode: 'MM', countryName: 'Myanmar' },
    { countryCode: 'VN', countryName: 'Vietnam' },
    { countryCode: 'KP', countryName: 'Dem. Rep. Korea' },
    { countryCode: 'KR', countryName: 'Republic of Korea' },
    { countryCode: 'MN', countryName: 'Mongolia' },
    { countryCode: 'IN', countryName: 'India' },
    { countryCode: 'BD', countryName: 'Bangladesh' },
    { countryCode: 'BT', countryName: 'Bhutan' },
    { countryCode: 'NP', countryName: 'Nepal' },
    { countryCode: 'PK', countryName: 'Pakistan' },
    { countryCode: 'AF', countryName: 'Afghanistan' },
    { countryCode: 'TJ', countryName: 'Tajikistan' },
    { countryCode: 'KG', countryName: 'Kyrgyzstan' },
    { countryCode: 'TM', countryName: 'Turkmenistan' },
    { countryCode: 'IR', countryName: 'Iran' },
    { countryCode: 'SY', countryName: 'Syria' },
    { countryCode: 'AM', countryName: 'Armenia' },
    { countryCode: 'SE', countryName: 'Sweden' },
    { countryCode: 'BY', countryName: 'Belarus' },
    { countryCode: 'UA', countryName: 'Ukraine' },
    { countryCode: 'PL', countryName: 'Poland' },
    { countryCode: 'AT', countryName: 'Austria' },
    { countryCode: 'HU', countryName: 'Hungary' },
    { countryCode: 'MD', countryName: 'Moldova' },
    { countryCode: 'RO', countryName: 'Romania' },
    { countryCode: 'LT', countryName: 'Lithuania' },
    { countryCode: 'LV', countryName: 'Latvia' },
    { countryCode: 'EE', countryName: 'Estonia' },
    { countryCode: 'DE', countryName: 'Germany' },
    { countryCode: 'BG', countryName: 'Bulgaria' },
    { countryCode: 'GR', countryName: 'Greece' },
    { countryCode: 'TR', countryName: 'Turkey' },
    { countryCode: 'AL', countryName: 'Albania' },
    { countryCode: 'HR', countryName: 'Croatia' },
    { countryCode: 'CH', countryName: 'Switzerland' },
    { countryCode: 'LU', countryName: 'Luxembourg' },
    { countryCode: 'BE', countryName: 'Belgium' },
    { countryCode: 'NL', countryName: 'Netherlands' },
    { countryCode: 'PT', countryName: 'Portugal' },
    { countryCode: 'ES', countryName: 'Spain' },
    { countryCode: 'IE', countryName: 'Ireland' },
    { countryCode: 'NC', countryName: 'New Caledonia' },
    { countryCode: 'SB', countryName: 'Solomon Islands' },
    { countryCode: 'NZ', countryName: 'New Zealand' },
    { countryCode: 'AU', countryName: 'Australia' },
    { countryCode: 'LK', countryName: 'Sri Lanka' },
    { countryCode: 'CN', countryName: 'China' },
    { countryCode: 'TW', countryName: 'Taiwan' },
    { countryCode: 'IT', countryName: 'Italy' },
    { countryCode: 'DK', countryName: 'Denmark' },
    { countryCode: 'GB', countryName: 'United Kingdom' },
    { countryCode: 'IS', countryName: 'Iceland' },
    { countryCode: 'AZ', countryName: 'Azerbaijan' },
    { countryCode: 'GE', countryName: 'Georgia' },
    { countryCode: 'PH', countryName: 'Philippines' },
    { countryCode: 'MY', countryName: 'Malaysia' },
    { countryCode: 'BN', countryName: 'Brunei Darussalam' },
    { countryCode: 'SI', countryName: 'Slovenia' },
    { countryCode: 'FI', countryName: 'Finland' },
    { countryCode: 'SK', countryName: 'Slovakia' },
    { countryCode: 'CZ', countryName: 'Czech Republic' },
    { countryCode: 'ER', countryName: 'Eritrea' },
    { countryCode: 'JP', countryName: 'Japan' },
    { countryCode: 'PY', countryName: 'Paraguay' },
    { countryCode: 'YE', countryName: 'Yemen' },
    { countryCode: 'SA', countryName: 'Saudi Arabia' },
    { countryCode: 'CYP', countryName: 'Northern Cyprus' },
    { countryCode: 'CY', countryName: 'Cyprus' },
    { countryCode: 'MA', countryName: 'Morocco' },
    { countryCode: 'EG', countryName: 'Egypt' },
    { countryCode: 'LY', countryName: 'Libya' },
    { countryCode: 'ET', countryName: 'Ethiopia' },
    { countryCode: 'DJ', countryName: 'Djibouti' },
    { countryCode: 'SOM', countryName: 'Somaliland' },
    { countryCode: 'UG', countryName: 'Uganda' },
    { countryCode: 'RW', countryName: 'Rwanda' },
    { countryCode: 'BA', countryName: 'Bosnia and Herzegovina' },
    { countryCode: 'MK', countryName: 'Macedonia' },
    { countryCode: 'RS', countryName: 'Serbia' },
    { countryCode: 'ME', countryName: 'Montenegro' },
    { countryCode: 'XK', countryName: 'Kosovo' },
    { countryCode: 'TT', countryName: 'Trinidad and Tobago' },
    { countryCode: 'SS', countryName: 'South Sudan' },
    { countryCode: 'FJ', countryName: 'Fiji' },
    { countryCode: 'TZ', countryName: 'Tanzania' },
    { countryCode: 'EH', countryName: 'Western Sahara' },
    { countryCode: 'CA', countryName: 'Canada' },
    { countryCode: 'US', countryName: 'United States' },
    { countryCode: 'KZ', countryName: 'Kazakhstan' },
    { countryCode: 'UZ', countryName: 'Uzbekistan' },
    { countryCode: 'PG', countryName: 'Papua New Guinea' },
    { countryCode: 'ID', countryName: 'Indonesia' },
    { countryCode: 'AR', countryName: 'Argentina' },
    { countryCode: 'CL', countryName: 'Chile' },
    { countryCode: 'CD', countryName: 'Democratic Republic of the Congo' },
    { countryCode: 'SO', countryName: 'Somalia' },
    { countryCode: 'KE', countryName: 'Kenya' },
    { countryCode: 'SD', countryName: 'Sudan' },
    { countryCode: 'TD', countryName: 'Chad' },
    { countryCode: 'HT', countryName: 'Haiti' },
    { countryCode: 'DO', countryName: 'Dominican Republic' },
    { countryCode: 'RU', countryName: 'Russia' },
    { countryCode: 'BS', countryName: 'Bahamas' },
    { countryCode: 'FK', countryName: 'Falkland Islands' },
    { countryCode: 'NO', countryName: 'Norway' },
    { countryCode: 'GL', countryName: 'Greenland' },
    { countryCode: 'TL', countryName: 'Timor-Leste' },
    { countryCode: 'ZA', countryName: 'South Africa' },
    { countryCode: 'LS', countryName: 'Lesotho' },
    { countryCode: 'MX', countryName: 'Mexico' },
    { countryCode: 'UY', countryName: 'Uruguay' },
    { countryCode: 'BR', countryName: 'Brazil' },
    { countryCode: 'BO', countryName: 'Bolivia' },
    { countryCode: 'PE', countryName: 'Peru' },
    { countryCode: 'CO', countryName: 'Colombia' },
    { countryCode: 'PA', countryName: 'Panama' },
    { countryCode: 'CR', countryName: 'Costa Rica' },
    { countryCode: 'NI', countryName: 'Nicaragua' },
    { countryCode: 'HN', countryName: 'Honduras' },
    { countryCode: 'SV', countryName: 'El Salvador' },
    { countryCode: 'GT', countryName: 'Guatemala' },
    { countryCode: 'BZ', countryName: 'Belize' },
    { countryCode: 'VE', countryName: 'Venezuela' },
    { countryCode: 'GY', countryName: 'Guyana' },
    { countryCode: 'SR', countryName: 'Suriname' },
    { countryCode: 'FR', countryName: 'France' },
    { countryCode: 'EC', countryName: 'Ecuador' },
    { countryCode: 'PR', countryName: 'Puerto Rico' },
    { countryCode: 'JM', countryName: 'Jamaica' },
    { countryCode: 'CU', countryName: 'Cuba' },
    { countryCode: 'ZW', countryName: 'Zimbabwe' },
    { countryCode: 'BW', countryName: 'Botswana' },
    { countryCode: 'NA', countryName: 'Namibia' },
    { countryCode: 'SN', countryName: 'Senegal' },
    { countryCode: 'ML', countryName: 'Mali' },
    { countryCode: 'MR', countryName: 'Mauritania' },
    { countryCode: 'BJ', countryName: 'Benin' },
    { countryCode: 'NE', countryName: 'Niger' },
    { countryCode: 'NG', countryName: 'Nigeria' },
    { countryCode: 'CM', countryName: 'Cameroon' },
    { countryCode: 'TG', countryName: 'Togo' },
    { countryCode: 'GH', countryName: 'Ghana' },
    { countryCode: 'CI', countryName: "Côted'Ivoire" },
    { countryCode: 'GN', countryName: 'Guinea' },
    { countryCode: 'GW', countryName: 'Guinea-Bissau' },
    { countryCode: 'LR', countryName: 'Liberia' },
    { countryCode: 'SL', countryName: 'Sierra Leone' },
    { countryCode: 'BF', countryName: 'Burkina Faso' },
    { countryCode: 'CF', countryName: 'Central African Republic' },
    { countryCode: 'CG', countryName: 'Republic of the Congo' },
    { countryCode: 'GA', countryName: 'Gabon' },
    { countryCode: 'GQ', countryName: 'Equatorial Guinea' },
    { countryCode: 'ZM', countryName: 'Zambia' },
    { countryCode: 'MW', countryName: 'Malawi' },
    { countryCode: 'MZ', countryName: 'Mozambique' },
    { countryCode: 'SZ', countryName: 'Eswatini' },
    { countryCode: 'AO', countryName: 'Angola' },
    { countryCode: 'BI', countryName: 'Burundi' },
    { countryCode: 'IL', countryName: 'Israel' },
    { countryCode: 'LB', countryName: 'Lebanon' },
    { countryCode: 'MG', countryName: 'Madagascar' },
    { countryCode: 'PS', countryName: 'Palestine' },
    { countryCode: 'GM', countryName: 'The Gambia' },
    { countryCode: 'TN', countryName: 'Tunisia' },
    { countryCode: 'DZ', countryName: 'Algeria' },
    { countryCode: 'JO', countryName: 'Jordan' },
    { countryCode: 'AE', countryName: 'United Arab Emirates' },
    { countryCode: 'QA', countryName: 'Qatar' },
    { countryCode: 'KW', countryName: 'Kuwait' },
    { countryCode: 'IQ', countryName: 'Iraq' },
    { countryCode: 'OM', countryName: 'Oman' },
    { countryCode: 'VU', countryName: 'Vanuatu' },
    { countryCode: 'KH', countryName: 'Cambodia' },
    { countryCode: 'TH', countryName: 'Thailand' },
    { countryCode: 'LA', countryName: 'Lao PDR' },
    { countryCode: 'MM', countryName: 'Myanmar' },
    { countryCode: 'VN', countryName: 'Vietnam' },
    { countryCode: 'KP', countryName: 'Dem. Rep. Korea' },
    { countryCode: 'KR', countryName: 'Republic of Korea' },
    { countryCode: 'MN', countryName: 'Mongolia' },
    { countryCode: 'IN', countryName: 'India' },
    { countryCode: 'BD', countryName: 'Bangladesh' },
    { countryCode: 'BT', countryName: 'Bhutan' },
    { countryCode: 'NP', countryName: 'Nepal' },
    { countryCode: 'PK', countryName: 'Pakistan' },
    { countryCode: 'AF', countryName: 'Afghanistan' },
    { countryCode: 'TJ', countryName: 'Tajikistan' },
    { countryCode: 'KG', countryName: 'Kyrgyzstan' },
    { countryCode: 'TM', countryName: 'Turkmenistan' },
    { countryCode: 'IR', countryName: 'Iran' },
    { countryCode: 'SY', countryName: 'Syria' },
    { countryCode: 'AM', countryName: 'Armenia' },
    { countryCode: 'SE', countryName: 'Sweden' },
    { countryCode: 'BY', countryName: 'Belarus' },
    { countryCode: 'UA', countryName: 'Ukraine' },
    { countryCode: 'PL', countryName: 'Poland' },
    { countryCode: 'AT', countryName: 'Austria' },
    { countryCode: 'HU', countryName: 'Hungary' },
    { countryCode: 'MD', countryName: 'Moldova' },
    { countryCode: 'RO', countryName: 'Romania' },
    { countryCode: 'LT', countryName: 'Lithuania' },
    { countryCode: 'LV', countryName: 'Latvia' },
    { countryCode: 'EE', countryName: 'Estonia' },
    { countryCode: 'DE', countryName: 'Germany' },
    { countryCode: 'BG', countryName: 'Bulgaria' },
    { countryCode: 'GR', countryName: 'Greece' },
    { countryCode: 'TR', countryName: 'Turkey' },
    { countryCode: 'AL', countryName: 'Albania' },
    { countryCode: 'HR', countryName: 'Croatia' },
    { countryCode: 'CH', countryName: 'Switzerland' },
    { countryCode: 'LU', countryName: 'Luxembourg' },
    { countryCode: 'BE', countryName: 'Belgium' },
    { countryCode: 'NL', countryName: 'Netherlands' },
    { countryCode: 'PT', countryName: 'Portugal' },
    { countryCode: 'ES', countryName: 'Spain' },
    { countryCode: 'IE', countryName: 'Ireland' },
    { countryCode: 'NC', countryName: 'New Caledonia' },
    { countryCode: 'SB', countryName: 'Solomon Islands' },
    { countryCode: 'NZ', countryName: 'New Zealand' },
    { countryCode: 'AU', countryName: 'Australia' },
    { countryCode: 'LK', countryName: 'Sri Lanka' },
    { countryCode: 'CN', countryName: 'China' },
    { countryCode: 'TW', countryName: 'Taiwan' },
    { countryCode: 'IT', countryName: 'Italy' },
    { countryCode: 'DK', countryName: 'Denmark' },
    { countryCode: 'GB', countryName: 'United Kingdom' },
    { countryCode: 'IS', countryName: 'Iceland' },
    { countryCode: 'AZ', countryName: 'Azerbaijan' },
    { countryCode: 'GE', countryName: 'Georgia' },
    { countryCode: 'PH', countryName: 'Philippines' },
    { countryCode: 'MY', countryName: 'Malaysia' },
    { countryCode: 'BN', countryName: 'Brunei Darussalam' },
    { countryCode: 'SI', countryName: 'Slovenia' },
    { countryCode: 'FI', countryName: 'Finland' },
    { countryCode: 'SK', countryName: 'Slovakia' },
    { countryCode: 'CZ', countryName: 'Czech Republic' },
    { countryCode: 'ER', countryName: 'Eritrea' },
    { countryCode: 'JP', countryName: 'Japan' },
    { countryCode: 'PY', countryName: 'Paraguay' },
    { countryCode: 'YE', countryName: 'Yemen' },
    { countryCode: 'SA', countryName: 'Saudi Arabia' },
    { countryCode: 'CYP', countryName: 'Northern Cyprus' },
    { countryCode: 'CY', countryName: 'Cyprus' },
    { countryCode: 'MA', countryName: 'Morocco' },
    { countryCode: 'EG', countryName: 'Egypt' },
    { countryCode: 'LY', countryName: 'Libya' },
    { countryCode: 'ET', countryName: 'Ethiopia' },
    { countryCode: 'DJ', countryName: 'Djibouti' },
    { countryCode: 'SOM', countryName: 'Somaliland' },
    { countryCode: 'UG', countryName: 'Uganda' },
    { countryCode: 'RW', countryName: 'Rwanda' },
    { countryCode: 'BA', countryName: 'Bosnia and Herzegovina' },
    { countryCode: 'MK', countryName: 'Macedonia' },
    { countryCode: 'RS', countryName: 'Serbia' },
    { countryCode: 'ME', countryName: 'Montenegro' },
    { countryCode: 'XK', countryName: 'Kosovo' },
    { countryCode: 'TT', countryName: 'Trinidad and Tobago' },
    { countryCode: 'SS', countryName: 'South Sudan' },
]

export const interestOptions = [
    { value: 1, label: 'Hiking' },
    { value: 2, label: 'Cooking' },
    { value: 3, label: 'Photography' },
    { value: 4, label: 'Yoga' },
    { value: 5, label: 'Gardening' },
    { value: 6, label: 'Reading' },
    { value: 7, label: 'Painting' },
    { value: 8, label: 'Singing' },
    { value: 9, label: 'Dancing' },
    { value: 10, label: 'Camping' },
    { value: 11, label: 'Traveling' },
    { value: 12, label: 'Sports' },
    { value: 13, label: 'Movies' },
    { value: 14, label: 'Music' },
    { value: 15, label: 'Gaming' },
    { value: 16, label: 'Art' },
    { value: 17, label: 'Fashion' },
    { value: 18, label: 'Tech' },
    { value: 19, label: 'Cars' },
    { value: 20, label: 'Animals' },
    { value: 21, label: 'Nature' },
    { value: 22, label: 'Science' },
    { value: 23, label: 'Writing' },
    { value: 24, label: 'Volunteering' },
    { value: 25, label: 'Fitness' },
    { value: 26, label: 'DIY Projects' },
    { value: 27, label: 'Foodie' },
    { value: 28, label: 'Coding' },
    { value: 29, label: 'Meditation' },
    { value: 30, label: 'History' },
    { value: 31, label: 'Languages' },
    { value: 32, label: 'Science Fiction' },
    { value: 33, label: 'Comedy' },
    { value: 34, label: 'Travelling' },
    { value: 35, label: 'Adventure' },
    { value: 36, label: 'Swimming' },
    { value: 37, label: 'Skiing' },
    { value: 38, label: 'Running' },
    { value: 39, label: 'Cycling' },
    { value: 40, label: 'Baking' },
    { value: 41, label: 'Exercising' },
    { value: 42, label: 'Photography' },
    { value: 43, label: 'History' },
    { value: 44, label: 'Drawing' },
    { value: 45, label: 'Sculpting' },
    { value: 46, label: 'Fishing' },
    { value: 47, label: 'Chess' },
    { value: 48, label: 'Video Editing' },
    { value: 49, label: 'Reading' },
    { value: 50, label: 'Fashion' },
];

export const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'es', label: 'Spanish' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'zh', label: 'Chinese (Simplified)' },
    { value: 'ko', label: 'Korean' },
    { value: 'ar', label: 'Arabic' },
    { value: 'hi', label: 'Hindi' },
    { value: 'bn', label: 'Bengali' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'tr', label: 'Turkish' },
    { value: 'nl', label: 'Dutch' },
    { value: 'sv', label: 'Swedish' },
    { value: 'fi', label: 'Finnish' },
    { value: 'pl', label: 'Polish' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'he', label: 'Hebrew' },
    { value: 'th', label: 'Thai' },
    { value: 'el', label: 'Greek' },
    { value: 'no', label: 'Norwegian' },
    { value: 'hu', label: 'Hungarian' },
    { value: 'ro', label: 'Romanian' },
    { value: 'id', label: 'Indonesian' },
    { value: 'sk', label: 'Slovak' },
    { value: 'cs', label: 'Czech' },
    { value: 'ta', label: 'Tamil' },
];

export const getCountryCodeByName = (countryName) => {
    let result = '';
    countryCodes.forEach((country) => {
        if (country.countryName === countryName) {
            result = country.countryCode;
        }
    })
    return result;
}

// Components

export const Divider = () => (
    <Box sx={{
        borderBottom: border,
        width: '100%'
    }} />
);

export const IconAndTextWrapper = ({ children }) => (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '5px' }}>
        {children}
    </Box>
);

export const Async = ({ isLoading, isError, isNoData, LoadingComponent, ErrorComponent, NoDataComponent, children }) => {
    if (isLoading) {
        return LoadingComponent;
    }
    if (isError) {
        return ErrorComponent;
    }
    if (isNoData) {
        return NoDataComponent;
    }
    return children;
};

export const CountryFlag = ({ countryName, size = 'small' }) => {
    const sizeString = size === 'small' ? 'w20' : size === 'medium' ? 'w40' : 'w60';
    return (
        getCountryCodeByName(countryName) ? <img src={`https://flagcdn.com/${sizeString}/${getCountryCodeByName(countryName).toLowerCase()}.png`} /> : <PushPin fontSize="small" sx={{ color: colors.red[800] }} />
    )
}