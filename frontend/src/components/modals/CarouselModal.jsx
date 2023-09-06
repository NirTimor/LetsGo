import React from 'react';
import { decompressFromUTF16 } from 'lz-string';
import { Box, IconButton, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Modal from './Modal';
import { isEmpty } from '../../utils';

export const PhotoWithDelete = ({ photo, onDelete = () => {} }) => {
    const base64 = decompressFromUTF16(photo);
    return (
        <Box sx={{
            position: 'relative',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        }}>
            <Box sx={{
                width: 'fit-content',
                height: 'fit-content',
                position: 'relative',
            }}>
                <img style={{ borderRadius: '10px', maxHeight: '500px', maxWidth: '500px' }} src={`data:image/jpeg;base64,${base64}`} />
                <IconButton 
                    onClick={() => onDelete(photo)} 
                    sx={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px'
                    }}
                >
                    <Delete />
                </IconButton> 
            </Box>
        </Box>
    )
}

export const Photo = ({ photo }) => {
    const base64 = decompressFromUTF16(photo)
    return (
        <Box sx={{
            position: 'relative',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        }}>
            <Box sx={{
                width: 'fit-content',
                height: 'fit-content',
                position: 'relative',
            }}>
                <img style={{ borderRadius: '10px', maxHeight: '500px', maxWidth: '500px' }} src={`data:image/jpeg;base64,${base64}`} />
            </Box>
        </Box>
    )
}

const CarouselModal = ({ children, open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
            }}>
                {isEmpty(children) ? <Typography variant="body2" type="secondary">No photos to display</Typography> : (
                    <div class="carousel-wrapper">
                        <Carousel infiniteLoop showArrows>
                            {children}
                        </Carousel>   
                    </div>
                )}
            </Box>
        </Modal>
    )
}

export default CarouselModal;
