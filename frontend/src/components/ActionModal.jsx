import React from 'react';
import { Box } from '@mui/material';
import Modal from './Modal';
import Typography from './Typography';
import Button from './buttons/Button';

const ActionModal = ({ open, onClose, title, subTitle, onSubmit = () => {}, isLoading }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px',
            }}>
                <Typography variant="body1" bold>{title}</Typography>
                <Typography variant="body2">{subTitle}</Typography>
                <Box sx={{
                    display: 'flex',
                    gap: '20px'
                }}>
                    <Button variant="contained" onClick={onSubmit} isLoading={isLoading} size="small">Yes</Button>
                    <Button variant="outlined" onClick={onClose} size="small">No</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ActionModal;
