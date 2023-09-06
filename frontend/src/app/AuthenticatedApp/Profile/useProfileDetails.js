import React from 'react';
import dayjs from 'dayjs';
import { MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isEmpty, getFormattedDate, getBooleanValue, interestOptions, languageOptions, getBeDate, getBeLanguages, getBeInterests, getBeGender } from '../../../utils';
import InputField from '../../../components/inputs/InputField';
import useCountriesAndCities from '../../../hooks/useCountriesAndCities';
import MultiSelect from '../../../components/inputs/Multiselect';

const booleanOptions = ['Yes', 'No'];

const EditTextInput = ({ onChange, defaultValue }) => <InputField defaultValue={defaultValue} onChange={(event) => onChange(event.target.value)} size="small" />;

const EditMultilineTextInput = ({ onChange, defaultValue }) => <InputField sx={{ width: '100%' }} defaultValue={defaultValue} onChange={(event) => onChange(event.target.value)} size="small" minRows={5} multiline />;

const renderSelectInput = ({ onChange, options, defaultValue }) => <InputField defaultValue={defaultValue} onChange={(event) => onChange(event.target.value)} size="small" select>{options.map((option) => <MenuItem value={option}>{option}</MenuItem>)}</InputField>

const renderMultiSelectInput = ({ onChange, options, defaultValue }) =>  <MultiSelect defaultValue={defaultValue} onChange={(event) => onChange(event.target.value)} options={options} />

const EditDatePickerInput = ({ onChange, defaultValue }) => <LocalizationProvider dateAdapter={AdapterDayjs}><DatePicker defaultValue={dayjs(defaultValue)} onChange={(event) => onChange(new Date(event).toISOString())} format="DD/MM/YYYY" /></LocalizationProvider>

const getFeInterests = (interests) => interests.map((interest) => interestOptions.find((option) => option.value === interest).label);

const getFeLanguages = (languages) => languages.map((lang) => languageOptions.find((option) => option.value === lang).label);

const getBeBooleanValue = (value) => value === 'Yes';

const useProfileDetails = ({ user }) => {
    const { citiesList, countries } = useCountriesAndCities({ country: user.country });

    return !isEmpty(user) ? [
        { 
            key: '', 
            beKey: 'bio',
            getBeValue: (value) => value,
            isExist: !isEmpty(user.bio), 
            value: user.bio, 
            isEditable: true,
            EditComponent: EditMultilineTextInput
        },
        { 
            key: 'Country', 
            beKey: 'country',
            getBeValue: (value) => value,
            isExist: true, 
            value: user.country, 
            isEditable: true,
            EditComponent: ({ onChange, defaultValue }) => renderSelectInput({ onChange, defaultValue, options: countries })
        },
        { 
            key: 'City', 
            beKey: 'city',
            getBeValue: (value) => value,
            isExist: true, 
            value: user.city, 
            isEditable: true,
            EditComponent: ({ onChange, defaultValue }) => renderSelectInput({ onChange, defaultValue, options: citiesList })
        },
        { 
            key: 'Gender', 
            beKey: 'is_male',
            getBeValue: getBeGender,
            isExist: true, 
            value: user.is_male ? 'Male' : 'Female', 
            isEditable: true,
            EditComponent: ({ onChange, defaultValue }) => renderSelectInput({ onChange, defaultValue, options: ['Male', 'Female'] })
        },
        { 
            key: 'Birth Date', 
            beKey: 'birthdate',
            getBeValue: getBeDate,
            isExist: true, 
            value: getFormattedDate(user.birthdate), 
            isEditable: false,
            EditComponent: EditDatePickerInput
        },
        { 
            key: 'Job', 
            beKey: 'work_as',
            getBeValue: (value) => value,
            isExist: !isEmpty(user.work_as), 
            value: user.work_as, 
            isEditable: true,
            EditComponent: EditTextInput
        },
        { 
            key: 'Interests', 
            beKey: 'interests',
            getBeValue: getBeInterests,
            isExist: !isEmpty(user.interests), 
            value: getFeInterests(user.interests), 
            isEditable: true,
            EditComponent: ({ onChange, defaultValue }) => renderMultiSelectInput({ onChange, defaultValue, options: interestOptions.map((interest) => interest.label) })
        },
        { 
            key: 'My Ideal Partners', 
            beKey: 'ideal_partner_details',
            getBeValue: (value) => value,
            isExist: !isEmpty(user.ideal_partner_details), 
            value: user.ideal_partner_details, 
            isEditable: true,
            EditComponent: EditMultilineTextInput
        },
        { 
            key: 'Visited Countries', 
            beKey: 'visited_countries',
            getBeValue: (value) => value,
            isExist: !isEmpty(user.visited_countries), 
            value: user.visited_countries, 
            isEditable: true,
            EditComponent: ({ onChange, defaultValue }) => renderMultiSelectInput({ onChange, defaultValue, options: countries })
        },
        { 
            key: 'Smoke', 
            beKey: 'do_smoke',
            getBeValue: getBeBooleanValue,
            isExist: true, 
            value: getBooleanValue(user.do_smoke), 
            isEditable: true,
            EditComponent: ({ onChange, defaultValue }) => renderSelectInput({ onChange, defaultValue, options: booleanOptions })
        },
        { 
            key: 'Drink', 
            beKey: 'do_drink',
            getBeValue: getBeBooleanValue,
            isExist: true, 
            value: getBooleanValue(user.do_drink), 
            isEditable: true,
            EditComponent: ({ onChange, defaultValue }) => renderSelectInput({ onChange, defaultValue, options: booleanOptions })
        },
        { 
            key: 'Have Kids', 
            beKey: 'have_kids',
            getBeValue: getBeBooleanValue,
            isExist: true, 
            value: getBooleanValue(user.have_kids), 
            isEditable: true,
            EditComponent: ({ onChange, defaultValue }) => renderSelectInput({ onChange, defaultValue, options: booleanOptions })
        },
        { 
            key: 'Languages', 
            beKey: 'languages',
            getBeValue: getBeLanguages,
            isExist: !isEmpty(user.languages), 
            value: getFeLanguages(user.languages), 
            isEditable: true,
            EditComponent: ({ onChange, defaultValue }) => renderMultiSelectInput({ onChange, defaultValue, options: languageOptions.map((language) => language.label) })
        },
        { 
            key: 'Member Since', 
            getBeValue: () => {},
            beKey: 'registration_datetime',
            isExist: true, 
            value: getFormattedDate(user.registration_datetime), 
            isEditable: false,
            EditComponent: () => null
        },
    ] : [];
};

export default useProfileDetails;
