import React from 'react';
import Page from '../Page';
import { Box } from '@mui/material';
import LeftNav from './LeftNav';
import Posts from './Posts';
import RightBar from '../../../components/rightBar';

const Home = () => {
    return (
        <Page>
            <Box sx={{
                display: 'flex',
                gap: '20px'
            }}>
                <LeftNav />
                <Posts />
                <RightBar />
            </Box>
        </Page>
    )
}

export default Home;
