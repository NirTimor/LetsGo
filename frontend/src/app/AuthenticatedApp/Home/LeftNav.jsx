import React from 'react';
import { observer } from 'mobx-react';
import { Box, colors, MenuItem, FormControlLabel } from "@mui/material";
import { useTripStore, tripDetailsKeys } from '../../../stores/tripStore';
import Button from '../../../components/Button';
import TripDetailsForm from './TripDetailsForm';
import Typography from '../../../components/Typography';
import { Divider, interestOptions, getBeInterests } from '../../../utils';
import MultiSelect from '../../../components/inputs/Multiselect';
import InputField from '../../../components/inputs/InputField';
import NumberInput from '../../../components/inputs/NumberInput';

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
                bold
                sx={{
                    borderBottom: `1px solid ${colors.grey[300]}`,
                    paddingBottom: '7px',
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
                <Divider />
                <Typography bold variant="body1">About my partner:</Typography>
                <MultiSelect 
                    label="interests" 
                    onChange={(event) => onFilter(tripDetailsKeys.interests, getBeInterests(event.target.value))} 
                    options={interestOptions.map((interest) => interest.label)} 
                />
                <InputField 
                    onChange={(event) => onFilter(tripDetailsKeys.isMale, event.target.value)}
                    size="small" 
                    label="Gender"
                    select
                >
                    <MenuItem value={undefined}>None</MenuItem>
                    <MenuItem value={true}>Male</MenuItem>
                    <MenuItem value={false}>Female</MenuItem>
                </InputField>
                <FormControlLabel
                    sx={{ justifyContent: 'space-between', margin: 0, color: 'text.secondary' }}
                    componentsProps={{ typography: { variant: 'body1', whiteSpace: 'nowrap', margin: '0 3px' } }}
                    labelPlacement="start"
                    control={<NumberInput min={0} max={365} defaultValue={filters[tripDetailsKeys.minAge]} onChange={(event, value) => onFilter(tripDetailsKeys.minAge, value)} />}
                    label="Min Age"
                />
                <FormControlLabel
                    sx={{ justifyContent: 'space-between', margin: 0, color: 'text.secondary' }}
                    componentsProps={{ typography: { variant: 'body1', whiteSpace: 'nowrap', margin: '0 3px' } }}
                    labelPlacement="start"
                    control={<NumberInput min={0} max={365} defaultValue={filters[tripDetailsKeys.maxAge]} onChange={(event, value) => onFilter(tripDetailsKeys.maxAge, value)} />}
                    label="Max Age"
                />
            </Box>
            <Button onClick={onSubmit}>Submit</Button>
        </Box>
    )
}

export default observer(LeftNav);
