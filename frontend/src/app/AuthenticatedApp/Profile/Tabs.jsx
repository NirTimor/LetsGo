import React from 'react';
import { observer } from 'mobx-react';
import MuiTabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useProfileStore, tabs } from '../../../stores/profileStore';

const Tabs = () => {
    const { setTab, tab } = useProfileStore();

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box>
            <MuiTabs
                value={tab}
                onChange={handleChange}
            >
                <Tab value={tabs.posts} label={tabs.posts} />
                <Tab value={tabs.favoritePosts} label={tabs.favoritePosts} />
            </MuiTabs>
        </Box>
    );
}

export default observer(Tabs);
