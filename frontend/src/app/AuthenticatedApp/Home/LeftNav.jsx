import React from 'react';
import { observer } from 'mobx-react';
import { Typography, Box, colors } from "@mui/material";
import { useTripStore, tripDetailsKeys } from '../../../stores/tripStore';
import Button from '../../../components/buttons/Button';
import TripDetailsForm from './TripDetailsForm';

const LeftNav = () => {
    const { setFilters, db, setPage, filters } = useTripStore();

    const onFilter = (filterKey, filterValue) => {
        if (filterKey === tripDetailsKeys.country) {
            setFilters(tripDetailsKeys.city, null);
        }
        setFilters(filterKey, filterValue);
    }

    const onSubmit = () => {
        setPage(1);
        db.fetch();
    }

    return (
        <Box sx={{
            width: '220px',
            padding: '20px',
            height: 'fit-content',
            border: `1px solid ${colors.grey[300]}`,
            borderRadius: '4px',
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        }}>
            <Typography 
                variant="body1" 
                sx={{
                    fontWeight: 700,
                    borderBottom: `1px solid ${colors.grey[300]}`,
                    paddingBottom: '7px',
                    color: 'text.primary'
                }}
            >
                Filter by:
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
            }}>
                <TripDetailsForm onChangeInput={onFilter} values={filters} />
            </Box>
            <Button onClick={onSubmit}>Submit</Button>
        </Box>
    )
}

export default observer(LeftNav);
