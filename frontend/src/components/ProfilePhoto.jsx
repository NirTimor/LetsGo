import React from 'react';
import { AccountCircle } from "@mui/icons-material";
import { isEmpty } from '../utils';

const ProfilePhoto = ({ photo, size, color = 'text.primary' }) => {
    const getSize = () => {
        switch(size) {
            case ('small'):
                return '20px';
            case ('medium'):
                return '30px';
            case ('large'):
                return '40px';
            default:
                return '30px';
        }
    }

    return (
        isEmpty(photo) ? (
            <AccountCircle sx={{ color, width: getSize(), height: getSize() }} />
        ) : (
            <img style={{ width: getSize(), height: getSize(), objectFit: 'cover', borderRadius: '50%' }} src={`data:image/jpeg;base64,${photo}`} />
        )
    )
};

export default ProfilePhoto;
