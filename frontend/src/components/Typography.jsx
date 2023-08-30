import { Typography as MuiTypography, colors, Link as MuiLink } from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";

const Typography = ({ type = 'primary', bold, error, children, sx, ...props }) => (
    <MuiTypography
        fontWeight={bold ? 700 : undefined}
        sx={{
            color: error ? colors.red[400] : `text.${type}`,
            ...sx,
        }}
        {...props}
    >
        {children}
    </MuiTypography>
);

export const RouterLink = ({ children, ...props }) => (
    <ReactRouterLink style={{ textDecoration: 'none', color: 'inherit' }} {...props}>{children}</ReactRouterLink>
);

export const Link = ({ children, ...props }) => (
    <MuiLink variant="body2" underline="hover" sx={{ cursor: 'pointer' }} {...props}>{children}</MuiLink>
);

export default Typography;
