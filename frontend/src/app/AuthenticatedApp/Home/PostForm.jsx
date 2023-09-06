import React from "react";
import { compressToUTF16 } from "lz-string";
import { observer } from "mobx-react";
import { FileUploader } from 'react-drag-drop-files';
import InputField from "../../../components/inputs/InputField";
import { Box, colors } from "@mui/material";
import TripDetailsForm from "./TripDetailsForm";
import Modal from "../../../components/modals/Modal";
import { getFormattedDate } from "../../../utils";
import authStore from "../../../stores/authStore";
import Typography from "../../../components/Typography";
import Button from "../../../components/Button";
import { useTripStore, tripDetailsKeys } from "../../../stores/tripStore";
import { Account } from "../../../components/Post";
import usersStore from "../../../stores/usersStore";
import ProfilePhoto from "../../../components/ProfilePhoto";
import PhotosCollage from "../../../components/PhotosCollage";

const ERROR_MESSAGE = "Please fill all of the fields";

const PostForm = ({ edit: { id, isEdit }, isOpen, setOpen }) => {
    const [error, setError] = React.useState(false);
    const { setPostDetails, postDetails, createTrip, db, resetNewPost, editTrip } = useTripStore();

    const onSubmit = async () => {
        setError(false);
        if (
            !postDetails[tripDetailsKeys.country] ||
            !postDetails[tripDetailsKeys.city] ||
            !postDetails[tripDetailsKeys.startMonth] ||
            !postDetails[tripDetailsKeys.endMonth] ||
            !postDetails[tripDetailsKeys.details]
        ) {
            setError(true);
        } else {
            setError(false);
            if (isEdit) {
                await editTrip.fetch(id);
            } else {
                await createTrip.fetch();
            }
            onCloseModal();
        }
    };

    const onCloseModal = () => {
        setOpen(false);
        setError(false);
        resetNewPost();
    }

    const onUploadImages = (files) => {
        let base64Files = [];
        Object.values(files).forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const base64File = event.target.result.split(',')[1];
                const compressed = compressToUTF16(base64File);
                base64Files = [...base64Files, compressed];
                setPostDetails(tripDetailsKeys.photos, base64Files);
            };
        });
    };


    return (
        <Modal open={isOpen} onClose={onCloseModal}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: "20px",
                        width: "600px",
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '10px',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography bold>About Your Trip</Typography>
                        <TripDetailsForm onChangeInput={setPostDetails} values={postDetails} />
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "grid",
                            gridGap: "10px",
                            borderLeft: `1px solid ${colors.grey[300]}`,
                            paddingLeft: "20px",
                        }}
                        >
                        <Account
                            email={authStore.user.email}
                            name={usersStore.getName(authStore.user.email)}
                            creationTime={getFormattedDate(new Date())}
                            profilePhoto={<ProfilePhoto size="large" photo={usersStore.getProfilePhoto(authStore.user.email)} />}
                        />
                        <InputField
                            id="details"
                            label="Add few words..."
                            defaultValue={postDetails[tripDetailsKeys.details]}
                            multiline
                            onChange={(event) =>
                                setPostDetails(event.target.name, event.target.value)
                            }
                            InputProps={{
                                rows: 10,
                            }}
                        />
                        <PhotosCollage photos={postDetails[tripDetailsKeys.photos] || []} />
                        <FileUploader
                            handleChange={onUploadImages}
                            name="file"
                            multiple
                        >
                            <Button sx={{ marginTop: '10px', width: '100%' }}>Upload images</Button>
                        </FileUploader>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        borderTop: `1px solid ${colors.grey[300]}`,
                        width: "100%",
                        paddingTop: "20px",
                        margin: "0 auto",
                    }}
                >
                    <Button
                        onClick={onSubmit}
                        isLoading={createTrip.isLoading || db.isLoading || editTrip.isLoading}
                    >
                        Submit
                    </Button>
                    <Button variant="outlined" onClick={onCloseModal}>
                        Discard
                    </Button>
                </Box>
                {error && (
                    <Typography variant="body2" bold error>
                        {ERROR_MESSAGE}
                    </Typography>
                )}
            </Box>
        </Modal>
    );
};

export default observer(PostForm);
