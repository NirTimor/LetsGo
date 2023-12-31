import React, { useState } from 'react';
import { decompressFromUTF16 } from 'lz-string';
import { Box } from '@mui/material';
import Typography from './Typography';
import CarouselModal, { Photo } from './modals/CarouselModal';

const PhotosCollage = ({ photos = [] }) => {
    const base64Photos = photos.map((photo) => decompressFromUTF16(photo));
    const [isModalOpen, setIsModalOpen] = useState(false);

    const renderPhotos = () => {
        switch (base64Photos.length) {
            case 0:
                return null;
            case 1:
                return (
                    <Box 
                        onClick={() => setIsModalOpen(true)}
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        <img style={{ width: '100%', objectFit: 'cover', maxHeight: '300px' }} src={`data:image/jpeg;base64,${base64Photos[0]}`} />
                    </Box>
                );
            case 2:
                return (
                    <Box 
                        onClick={() => setIsModalOpen(true)}
                        sx={{
                            display: 'flex',
                            cursor: 'pointer'
                        }}
                    >
                        
                        <img style={{ width: '50%', objectFit: 'cover', maxHeight: '300px' }} src={`data:image/jpeg;base64,${base64Photos[0]}`} />
                        <Box sx={{
                            backgroundImage: `url(data:image/jpeg;base64,${base64Photos[1]})`,
                            position: 'relative',
                            width: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            maxHeight: '300px',
                            backgroundSize: 'cover',
                        }} />
                    </Box>
                )
            default:
                return (
                    <Box 
                        onClick={() => setIsModalOpen(true)}
                        sx={{
                            display: 'flex',
                            cursor: 'pointer'
                        }}
                    >
                        <img style={{ width: '50%', objectFit: 'cover', maxHeight: '300px' }} src={`data:image/jpeg;base64,${base64Photos[0]}`} />
                        <Box sx={{
                            backgroundImage: `url(data:image/jpeg;base64,${base64Photos[1]})`,
                            position: 'relative',
                            width: '50%',
                            opacity: '0.75',
                            display: 'flex',
                            alignItems: 'center',
                            maxHeight: '300px',
                            justifyContent: 'center',
                            backgroundSize: 'cover',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: '0px',
                                right: '0px',
                                bottom: '0px',
                                left: '0px',
                                backgroundColor: 'rgba(0,0,0,0.25)',
                            }
                        }}>
                            <Typography variant="h3" bold sx={{ color: 'white', zIndex: '0' }}>+ {base64Photos.length - 2}</Typography>
                        </Box>
                    </Box>
                )
        }
    }

    return (
        <>
            {renderPhotos()}
            <CarouselModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {photos.map((photo) => (
                    <Photo photo={photo} />
                ))}
            </CarouselModal>
        </>
    )
}

export default PhotosCollage;
