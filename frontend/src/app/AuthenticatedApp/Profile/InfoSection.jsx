import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { FileUploader } from 'react-drag-drop-files';
import { Box, IconButton, Skeleton, colors, Menu, MenuItem } from '@mui/material';
import { Edit, Check } from '@mui/icons-material';
import Typography from '../../../components/Typography';
import { IconAndTextWrapper, Async, isEmpty } from '../../../utils';
import profileStore, { useProfileStore } from '../../../stores/profileStore';
import useProfileDetails from './useProfileDetails';
import CarouselModal, { Photo, PhotoWithDelete } from '../../../components/CarouselModal';
import alertsStore from '../../../stores/alertsStore';
import ProfilePhoto from '../../../components/ProfilePhoto';

const InfoItem = ({ itemKey, itemValue }) => {
    const formattedValue = Array.isArray(itemValue) ? itemValue.join(', ') : itemValue;

    return (
        <IconAndTextWrapper>
            {itemKey && <Typography bold variant="body2">{itemKey}: </Typography>}
            <Typography variant="body2">{formattedValue}</Typography>
        </IconAndTextWrapper>
    )
};

const EditIcon = <Edit color='text.primary' fontSize="small" />

const CheckIcon = <Check color='text.primary' fontSize="small" />

const MyProfileInfoItem = ({ infoItem, onEdit }) => {
    const [isEdited, setIsEdited] = useState(false);
    const [value, setValue] = useState(null);

    const onChange = (eventValue) => {
        setValue(eventValue);
    }

    const onClickCheck = async () => {
        console.log('value ', infoItem.getBeValue(value));
        await onEdit(infoItem.beKey, infoItem.getBeValue(value));
        setIsEdited(false);
    }

    const formattedValue = Array.isArray(infoItem.value) ? infoItem.value.join(', ') : infoItem.value;

    return (
        <Box sx={{
            display: 'flex',
            gap: '7px',
            alignItems: isEdited ? 'flex-start' : 'center'
        }}>
            {!isEmpty(infoItem.key) && <Typography bold variant="body2" sx={{ whiteSpace: 'nowrap' }}>{infoItem.key}:</Typography>}
            {isEdited ? (
                <>
                    <infoItem.EditComponent onChange={onChange} defaultValue={infoItem.value} />
                    <IconButton onClick={onClickCheck} sx={{ height: 'fit-content' }}>
                        {CheckIcon}
                    </IconButton>
                </>
            ) : (
                <>
                    <Typography variant="body2">{infoItem.isExist ? formattedValue : 'Not Available'}</Typography>
                    {infoItem.isEditable && (
                        <IconButton onClick={() => setIsEdited(true)} sx={{ height: 'fit-content' }}>
                            {EditIcon}
                        </IconButton>
                    )}
                </>
            )}
        </Box>
    )
}

const ProfilePhotoOther = ({ profilePhoto, photos = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false)
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const getPhotos = () => {
        if (!isEmpty(profilePhoto)) {
            return [profilePhoto, ...photos];
        }
        return photos;
    };

    return (
        <>
            <Box onClick={handleOpenModal} sx={{ position: 'relative', cursor: 'pointer' }}>
                <ProfilePhoto size="large" photo={profilePhoto} />
            </Box>
            <CarouselModal open={isModalOpen} onClose={handleCloseModal}>
                {getPhotos().map((photo) => (
                    <Photo base64={photo} />
                ))}
            </CarouselModal>
        </>
    )
}


const MyProfilePhoto = ({ profilePhoto, photos }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [base64Files, setBase64Files] = useState([]);

    const handleCloseMenu = () => setAnchorEl(null);
    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);

    const handleCloseModal = () => {
        setAnchorEl(null);
        setIsModalOpen(false)
    };
    const handleOpenModal = () => {
        setAnchorEl(null);
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (!isEmpty(base64Files)) {
            setBase64Files([]);
            const fetch = async () => {
                await profileStore.updateUser.fetch('photos', [...photos, ...base64Files]);
                alertsStore.alert('success', 'Successfully updated photos!');
            } 
            fetch();
        }
    }, [base64Files])

    const onUploadFile = (file) => {
        handleCloseMenu();
        const reader = new FileReader();
        // @ts-ignore
        reader.readAsDataURL(file);
        reader.onload = async (event) => {
            const base64File = event.target.result.split(',')[1];
            await profileStore.updateUser.fetch('profile_photo', base64File);
            alertsStore.alert('success', 'Successfully updated profile photo!')
        };
    };

    const onUploadMultipleFiles = (files) => {
        handleCloseMenu();
        setBase64Files([]);
        Object.values(files).forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const base64File = event.target.result.split(',')[1];
                setBase64Files((prev) => [...prev, base64File]);
            };
        });
    };

    const onDeleteProfilePhoto = async () => {
        handleCloseMenu();
        await profileStore.updateUser.fetch('profile_photo', '');
        alertsStore.alert('success', 'Successfully deleted profile photo!')
    }

    const onDeletePhoto = async (_photo) => {
        handleCloseMenu();
        await profileStore.updateUser.fetch('photos', photos.filter((photo) => photo !== _photo));
        alertsStore.alert('success', 'Successfully deleted photo!')
    }

    const getPhotos = () => {
        if (!isEmpty(profilePhoto)) {
            return [{ photo: profilePhoto, onDelete: onDeleteProfilePhoto }, ...photos.map((photo) => ({ photo, onDelete: onDeletePhoto }))];
        }
        return photos.map((photo) => ({ photo, onDelete: onDeletePhoto }));
    };

    return (
        <>
            <Box onClick={handleOpenMenu} sx={{ position: 'relative', cursor: 'pointer' }}>
                <ProfilePhoto size="large" photo={profilePhoto} />
                <Edit sx={{ fontSize: '14px', color: 'white', padding: '2px', backgroundColor: colors.blue[300], position: 'absolute', right: '-7px', bottom: '-1px', border: '2px solid', borderColor: 'background.paper', borderRadius: '50%' }} />
            </Box>
            <Menu
                id="profile-photo-menu"
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorEl={anchorEl}
            >
                <FileUploader
                    handleChange={onUploadFile}
                    name="file"
                    multiple={false}
                >
                    <MenuItem>Update profile photo</MenuItem>
                </FileUploader>
                <FileUploader
                    handleChange={onUploadMultipleFiles}
                    name="file"
                    multiple
                >
                    <MenuItem>Add photos</MenuItem>
                </FileUploader>
                <MenuItem onClick={handleOpenModal}>Show my photos</MenuItem>
                <MenuItem onClick={onDeleteProfilePhoto}>Delete profile photo</MenuItem>
            </Menu>
            <CarouselModal open={isModalOpen} onClose={handleCloseModal}>
                {getPhotos().map((photo) => (
                    <PhotoWithDelete base64={photo.photo} onDelete={photo.onDelete} />
                ))}
            </CarouselModal>
        </>
    )
}

const InfoSection = () => {
    const { user, isMyProfile, updateUser, fetchUser: { isLoading } } = useProfileStore();
    const profileDetails = useProfileDetails({ user });

    return (
        <Box sx={{
            width: '500px',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            padding: '20px 0',
        }}>
            <Async
                isLoading={isLoading}
                isNoData={isEmpty(user)}
                NoDataComponent={(
                    <Typography variant="body2" type="secondary">Something went wrong, try to refresh the page</Typography>
                )}
                LoadingComponent={(
                    <>
                        <IconAndTextWrapper>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="text" width={100} />
                        </IconAndTextWrapper>
                        <Skeleton variant="text" width={300} />
                        <Skeleton variant="text" width={300} />
                        <Skeleton variant="text" width={300} />
                    </>
                )}
            >
                <Box sx={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                }}>
                    {isMyProfile ? <MyProfilePhoto profilePhoto={user.profile_photo} photos={user.photos} /> : <ProfilePhotoOther profilePhoto={user.profile_photo} photos={user.photos} />}
                    <Typography variant="body1" bold>{user.name}</Typography>
                </Box>
                {isMyProfile ? (
                    <>
                        {profileDetails.map((infoItem) => (
                            <MyProfileInfoItem infoItem={infoItem} onEdit={updateUser.fetch} />
                        ))}
                    </>
                ) : (
                    <>
                        {profileDetails.map((infoItem) => (
                            infoItem.isExist ? <InfoItem itemKey={infoItem.key} itemValue={infoItem.value} /> : null
                        ))}
                    </>
                )}
            </Async>
        </Box>
    );
};

export default observer(InfoSection);
