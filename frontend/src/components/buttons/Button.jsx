import { LoadingButton } from '@mui/lab'

const Button = ({ children, variant = 'contained', type, isDisabled, isLoading, onClick = () => {}, size = 'medium', startIcon, endIcon, ...props }) => (
    <LoadingButton
        variant={variant}
        disabled={isDisabled}
        onClick={onClick}
        size={size}
        startIcon={startIcon}
        endIcon={endIcon}
        loading={isLoading}
        type={type}
        {...props}
    >
        {children}
    </LoadingButton>
);

export default Button;
