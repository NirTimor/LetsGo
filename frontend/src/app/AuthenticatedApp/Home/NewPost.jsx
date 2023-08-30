import React from "react";
import { observer } from "mobx-react";
import InputField from "../../../components/inputs/InputField";
import PostForm from "./PostForm";

const NewPost = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <>
            <InputField
                id="new-post"
                defaultValue="Add new travel..."
                multiline
                InputProps={{
                    readOnly: true,
                }}
                onClick={() => {
                    setIsModalOpen(true);
                }}
            />
            <PostForm edit={false} isOpen={isModalOpen} setOpen={setIsModalOpen} />
        </>
    );
};

export default observer(NewPost);
