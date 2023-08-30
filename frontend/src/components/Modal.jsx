import React from 'react';
import { Modal as MuiModal, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const Modal = ({ open, onClose, children, ...props }) => {
    return (
        <MuiModal
            open={open}
            onClose={onClose}
            {...props}
        >
            <Box sx={{
                width: 'fit-content',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'background.default',
                borderRadius: '4px',
            }}>
                <IconButton 
                    sx={{
                        width: 'fit-content',
                    }}
                    onClick={onClose}
                >
                    <Close />
                </IconButton>
                <Box sx={{
                    padding: '20px 30px',
                    paddingTop: '0px',
                }}>
                    {children}
                </Box>
            </Box>
        </MuiModal>
    )
}

export default Modal;
