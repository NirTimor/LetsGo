import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { FormControlLabel, Checkbox, Link } from "@mui/material";
import { useAuthStore } from "../../../stores/authStore";
import InputField from '../../../components/inputs/InputField';
import Button from "../../../components/Button";
import UnauthenticatedTemplate from "../UnauthenticatedTemplate";
import { requiredFieldRules } from "../formUtils";

const ERROR_MESSAGE = 'Email and Password are incorrect';

const SignIn = () => {
	const { login: { fetch, isError, isLoading } } = useAuthStore();
	const { handleSubmit, control } = useForm({
        defaultValues: {
            email: null,
            password: null,
			rememberMe: false,
        },
    });
	const navigate = useNavigate();

	const onSubmit = (data) => {
		fetch(data.email, data.password, data.rememberMe, navigate);
	};

	return (
		<UnauthenticatedTemplate
			handleSubmit={handleSubmit(onSubmit)}
			isError={isError}
			errorMessage={ERROR_MESSAGE}
		>
			<Controller
                name="email"
                control={control}
                rules={requiredFieldRules}
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
                name="rememberMe"
                control={control}
                render={({ field }) => (
					<FormControlLabel
						control={<Checkbox value="rememberMe" name="rememberMe" color="primary" {...field} />}
						label="Remember me"
					/>
                )}
            />
			<Button
                isLoading={isLoading}
				type="submit"
			>
				Sign In
			</Button>
			<Link href="/register" variant="body2" underline="hover" textAlign="center">
				Don't have an account? Sign Up
            </Link>
		</UnauthenticatedTemplate>
	);
};

export default observer(SignIn);
