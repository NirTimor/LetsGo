import React from 'react';
import { decompressFromUTF16 } from 'lz-string';
import { AccountCircle } from "@mui/icons-material";
import { isEmpty } from '../utils';

const ProfilePhoto = ({ photo, size, color = 'text.primary' }) => {
    const base64 = decompressFromUTF16(photo);
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
        isEmpty(base64) ? (
            <AccountCircle sx={{ color, width: getSize(), height: getSize() }} />
        ) : (
            <img style={{ width: getSize(), height: getSize(), objectFit: 'cover', borderRadius: '50%' }} src={`data:image/jpeg;base64,${base64}`} />
        )
    )
};

export default ProfilePhoto;
