import React from 'react';
import { observer } from 'mobx-react';
import Navbar from '../../components/Navbar';
import { Box, colors } from '@mui/material';
import { useDarkModeStore } from '../../stores/darkModeStore';

const Page = ({ children }) => {
    const { isDarkMode } = useDarkModeStore();

    return (
        <Box sx={{ minHeight: '100vh', overflowX: 'hidden', backgroundColor: isDarkMode ?  'background.paper' : colors.blue[50] }}>
            <Navbar />
            <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                {children}
            </Box>
        </Box>
    )
}

export default observer(Page);
