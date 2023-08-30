import React from "react";
import dayjs from 'dayjs';
import { useForm, Controller } from "react-hook-form";
import { observer } from "mobx-react";
import { Link, MenuItem } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAuthStore } from "../../../stores/authStore";
import InputField from '../../../components/inputs/InputField';
import Button from "../../../components/buttons/Button";
import UnauthenticatedTemplate from "../UnauthenticatedTemplate";
import useCountriesAndCities from "../../../hooks/useCountriesAndCities";
import { emailFieldRules, requiredFieldRules } from "../formUtils";

const today = dayjs();

const Register = () => {
    const { register: { fetch, isError, error } } = useAuthStore();
    const { handleSubmit, control, getValues, watch, setValue } = useForm({
        defaultValues: {
            email: null,
            password: null,
            name: null,
            date: today,
            gender: null,
            country: null,
            city: null
        },
    });

    watch();

    const {
        countries,
        citiesList,
    } = useCountriesAndCities({ country: getValues().country });

    const onSubmit = (data) => {
        fetch({ 
            email: data.email, 
            password: data.password, 
            name: data.name, 
            isMale: data.gender === 'Male', 
            date: data.date.format('YYYY-MM-DD'), 
            country: data.country, 
            city: data.city
        });
    }

    return (
        <UnauthenticatedTemplate
            handleSubmit={handleSubmit(onSubmit)}
            isError={isError}
            errorMessage={error?.message}
        >
            <Controller
                name="email"
                control={control}
                rules={emailFieldRules}
                render={({ field, fieldState: { error } }) => (
                    <InputField
                        id="email"
                        label="Email Address *"
                        isError={error}
                        helperText={error?.message}
                        {...field}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                rules={requiredFieldRules}
                render={({ field, fieldState: { error } }) => (
                    <InputField
                        label="Password *"
                        type="password"
                        id="password"
                        isError={error}
                        helperText={error?.message}
                        {...field}
                    />
                )}
            />
            <Controller
                name="name"
                control={control}
                rules={requiredFieldRules}
                render={({ field, fieldState: { error } }) => (
                    <InputField
                        label="Full Name *"
                        id="name"
                        isError={error}
                        helperText={error?.message}
                        {...field}
                    />
                )}
            />
            <Controller
                name="date"
                control={control}
                render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Birthday" defaultValue={today} format="DD/MM/YYYY" {...field} />
                    </LocalizationProvider>
                )}
            />
            <Controller
                name="gender"
                control={control}
                rules={requiredFieldRules}
                render={({ field, fieldState: { error } }) => (
                    <InputField
                        id="gender"
                        label="Gender *"
                        select
                        isError={error}
                        helperText={error?.message}
                        {...field}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </InputField>
                )}
            />
            <Controller
                name="country"
                control={control}
                rules={requiredFieldRules}
                render={({ field, fieldState: { error } }) => (
                    <InputField
                        {...field}
                        id="country"
                        label="Country *"
                        select
                        isError={error}
                        helperText={error?.message}
                        onChange={(event) => {
                            setValue('country', event.target.value)
                            setValue('city', null)
                        }}
                    >
                        {countries.map((country) => (
                            <MenuItem key={country} value={country}>{country}</MenuItem>
                        ))}
                    </InputField>
                )}
            />
            <Controller
                name="city"
                control={control}
                rules={requiredFieldRules}
                render={({ field, fieldState: { error } }) => (
                    <InputField
                        disabled={!getValues().country}
                        id="city"
                        label="City *"
                        select
                        isError={error}
                        helperText={error?.message}
                        {...field}
                    >
                        {citiesList?.map((city) => (
                            <MenuItem key={city} value={city}>{city}</MenuItem>
                        ))}
                    </InputField>
                )}
            />
            <Button
                type="submit"
            >
                Create Account
            </Button>
            <Link href="/login" variant="body2" underline="hover" textAlign="center">
                Already have an account? Sign In
            </Link>
        </UnauthenticatedTemplate>
    );
}

export default observer(Register);
