import { TextField } from "@mui/material";

const InputField = ({ id, label, isRequired, isError, errorMessage, sx, ...props }) => (
    <TextField 
        id={id}
        name={id}
        label={label}
        variant="outlined"
        required={isRequired}
        error={isError}
        helperText={isError ? errorMessage : undefined}
        fullWidth
        sx={{
            backgroundColor: 'background.paper',
            ...sx,
        }} 
        {...props}
    />
);

export default InputField;
