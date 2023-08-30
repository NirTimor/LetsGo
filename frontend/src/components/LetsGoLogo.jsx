import { Typography } from "@mui/material";
import { RouterLink } from "./Typography";

const LetsGoLogo = () => (
    <RouterLink to="/">
        <Typography
            variant="h4"
            component="a"
            sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: 'inherit',
                textDecoration: "none",
            }}
        >
            LetsGo
        </Typography>
    </RouterLink>
);

export default LetsGoLogo;
