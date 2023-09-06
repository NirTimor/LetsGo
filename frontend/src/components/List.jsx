import { Box, Tooltip, colors } from '@mui/material';
import React from 'react';
import Typography from './Typography';
import { isEmpty } from '../utils';

const Plus = ({ list }) => (
    <Tooltip title={list.map((item) => <Box>{item}</Box>)}>
        <Box sx={{
            borderRadius: '50%',
            backgroundColor: colors.grey[300],
            color: colors.blue[700],
            width: '25px',
            height: '25px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '12px',
            '&:hover': {
                backgroundColor: colors.blue[700],
                color: 'white',
            }
        }}>
            +{list.length}
        </Box>
    </Tooltip>
)

const List = ({ children, valuesToShow }) => {
    const shortList = children.slice(0, valuesToShow);
    const tooltipItems = children.slice(valuesToShow - 1, -1);

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            flexWrap: 'wrap'
        }}>
            {shortList.map((item, index) => (
                <Typography variant="body2" sx={{ display: 'flex' }}>
                    {item}{index < shortList.length - 1 && ', '}
                </Typography>
            ))}
            {!isEmpty(tooltipItems) && <Plus list={tooltipItems} />}
        </Box>
    )
};

export default List;
