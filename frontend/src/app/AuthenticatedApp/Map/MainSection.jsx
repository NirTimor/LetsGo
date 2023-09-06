import React, { memo, useState } from "react";
import { observer } from "mobx-react";
import { Close, Replay } from "@mui/icons-material";
import { Box, IconButton, colors } from '@mui/material';
import { Async, border, isEmpty, countryCodes, Divider } from '../../../utils';
import WorldMap from "react-svg-worldmap";
import authStore, { useAuthStore } from "../../../stores/authStore";
import Typography, { Link, RouterLink } from "../../../components/Typography";
import Button from "../../../components/Button";
import { CountryFlag } from "../../../utils";
import List from "../../../components/List";

const MainSection = () => {
    const { user: { visited_countries } } = useAuthStore();
    const [isRandom, setIsRandom] = useState(false);
    const [finishedRandom, setFinishedRandom] = useState(false);
    const [randomCountry, setRandomCountry] = useState({});

    const getData = () => countryCodes.map((country) => ({
        country: country.countryCode,
        value: visited_countries.includes(country.countryName)
    }));

    const makeRandomCountry = () => {
        setFinishedRandom(false);
        setIsRandom(true);
        const randomInterval = setInterval(() => {
            let randomCountry = countryCodes[Math.floor(Math.random() * (countryCodes.length))];
            while (visited_countries.includes(randomCountry.countryName)) {
                randomCountry = countryCodes[Math.floor(Math.random() * (countryCodes.length))];
            }
            setRandomCountry(randomCountry);
        }, 50);
        setTimeout(() => {
            clearInterval(randomInterval);
            setTimeout(() => {
                setFinishedRandom(true);
            }, 500);
        }, 4000);
    }

    return (
        <Box sx={{
            padding: '20px',
            border: border,
            borderRadius: '4px',
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <Typography variant="body1" bold>My Map</Typography>
            <Divider />
            <WorldMap
                styleFunction={(country) => {
                    const color = isRandom ? (randomCountry.countryName === country.countryName ? colors.blue[600] : 'white') : country.countryValue ? colors.red[400] : colors.green[400];
                    return {
                        fill: color,
                        strokeWidth: 1,
                        strokeOpacity: 0.2,
                        stroke: isRandom  && randomCountry.countryName === country.countryName ? color : 'black',
                        cursor: 'pointer',
                    }
                }}
                tooltipTextFunction={(value) => value.countryName}
                size={800}
                data={getData()}
                backgroundColor="inherit"
            />
            <Async
                isNoData={isEmpty(visited_countries)}
                NoDataComponent={<Typography variant="body2" type="secondary">You haven't visited at any country. You can update your visited countries by <Link><RouterLink to={`/profile/${authStore.userEmail}`}>edit your profile</RouterLink></Link></Typography>}
            >
                <Typography variant="body2" bold sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    You visited at: 
                    <List valuesToShow={5}>
                        {visited_countries.map((country) => <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}><Typography variant="body2">{country}</Typography> <CountryFlag countryName={country} /><Box /></Box>)}
                    </List>
                </Typography>
            </Async>
            <Button isDisabled={isRandom} onClick={makeRandomCountry}>Where should I go?</Button>
            {finishedRandom && isRandom && (
                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CountryFlag size="medium" countryName={randomCountry.countryName} />
                    <Typography variant="h5" bold>{randomCountry.countryName}!</Typography>
                    <IconButton onClick={() => setIsRandom(false)}>
                        <Close />
                    </IconButton>
                    <IconButton>
                        <Replay onClick={() => makeRandomCountry()} />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default memo(observer(MainSection));
