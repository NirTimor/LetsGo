import React from 'react';
import { Box } from '@mui/material';
import Page from '../Page';
import RightBar from '../../../components/RightBar';
import MainSection from './MainSection';

const Map = () => {
    return (
        <Page>
            <Box sx={{
                display: 'flex',
                gap: '20px'
            }}>
                <MainSection />
                <RightBar />
            </Box>
        </Page>
    )
};

export default Map;
