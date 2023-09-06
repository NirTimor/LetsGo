import React from 'react';
import { MenuItem, Box, FormControlLabel, Checkbox } from "@mui/material";
import { months } from '../../../utils';
import InputField from '../../../components/inputs/InputField';
import { tripDetailsKeys } from '../../../stores/tripStore';
import useCountriesAndCities from '../../../hooks/useCountriesAndCities';
import NumberInput from '../../../components/inputs/NumberInput';

const TripDetailsForm = ({ onChangeInput = () => {}, values }) => {
    const {
        countries,
        citiesList,
    } = useCountriesAndCities({ country: values[tripDetailsKeys.country] });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        }}>
            <InputField
                select
                id={tripDetailsKeys.startMonth}
                defaultValue={values[tripDetailsKeys.startMonth]}
                label="Start Month"
                size="small"
                onChange={(event) => onChangeInput(event.target.name, event.target.value)}
            >
                <MenuItem value={null}>None</MenuItem>
                {months.map((month) => (
                    <MenuItem value={month.number}>{month.name}</MenuItem>
                ))}
            </InputField>
            <InputField
                select
                id={tripDetailsKeys.endMonth}
                defaultValue={values[tripDetailsKeys.endMonth]}
                label="End Month"
                size="small"
                onChange={(event) => onChangeInput(event.target.name, event.target.value)}
            >
                <MenuItem value={null}>None</MenuItem>
                {months.map((month) => (
                    <MenuItem value={month.number}>{month.name}</MenuItem>
                ))}
            </InputField>
            <InputField
                select
                id={tripDetailsKeys.country}
                defaultValue={values[tripDetailsKeys.country]}
                label="Country"
                size="small"
                onChange={(event) => {
                    onChangeInput(event.target.name, event.target.value);
                }}
            >
                <MenuItem value={null}>None</MenuItem>
                {countries?.map((country) => (
                    <MenuItem value={country}>{country}</MenuItem>
                ))}
            </InputField>
            <InputField
                select
                id={tripDetailsKeys.city}
                defaultValue={values[tripDetailsKeys.city]}
                label="City"
                size="small"
                disabled={!values[tripDetailsKeys.country]}
                onChange={(event) => onChangeInput(event.target.name, event.target.value)}
            >
                <MenuItem value={null}>None</MenuItem>
                {citiesList?.map((city) => (
                    <MenuItem value={city}>{city}</MenuItem>
                ))}
            </InputField>
            <FormControlLabel
                sx={{ justifyContent: 'space-between', margin: 0, color: 'text.secondary' }}
                componentsProps={{ typography: { variant: 'body1', whiteSpace: 'nowrap', margin: '0 3px' } }}
                labelPlacement="start"
                control={<NumberInput min={0} max={365} defaultValue={values[tripDetailsKeys.durationDays]} onChange={(event, value) => onChangeInput(tripDetailsKeys.durationDays, value)} />}
                label="Duration Days"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        value={tripDetailsKeys.isFlexible}
                        name={tripDetailsKeys.isFlexible}
                        defaultChecked={values[tripDetailsKeys.isFlexible]}
                        color="primary"
                        onChange={(event) => onChangeInput(event.target.name, event.target.checked)}
                    />
                }
                sx={{
                    marginTop: '-10px'
                }}
                componentsProps={{
                    typography: {
                        color: "text.secondary",
                    },
                }}
                label="Flexible?"
            />
        </Box>
    )
}

export default TripDetailsForm;
