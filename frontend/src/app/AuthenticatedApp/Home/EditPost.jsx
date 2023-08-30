import React from "react";
import { observer } from "mobx-react";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import PostForm from "./PostForm";
import tripStore from "../../../stores/tripStore";

const EditPost = ({ trip }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const onEditClick = () => {
        tripStore.onUpdateTrip(trip);
        setIsModalOpen(true);
    }

    return (
        <>
            <IconButton onClick={onEditClick}>
                <Edit />
            </IconButton>
            <PostForm edit={{ isEdit: true, id: trip._id }} isOpen={isModalOpen} setOpen={setIsModalOpen} />
        </>
    );
};

export default observer(EditPost);
