import React, {FC, useState} from 'react';
import {Modal} from "@geist-ui/core";
import {IVideo} from "../../../../../redux/slices/videosSlice/types";
import {ModalHooksBindings} from "@geist-ui/core/dist/use-modal";
import {useDispatch} from "react-redux";
import {snipText} from "../../../../../services/helpers";
import AddVideoForm from "./AddVideoForm";

interface P {
    bindings: ModalHooksBindings;
    video: IVideo;
    setVideo: (video: IVideo) => void;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AddVideoModal: FC<P> = ({bindings, video, setVideo, setVisible}) => {
    return (
        <Modal {...bindings}>
            <Modal.Title>{snipText(video.name) || 'Добавление видео'}</Modal.Title>
            <Modal.Content>
                <AddVideoForm video={video}/>
            </Modal.Content>
        </Modal>
    );
};

export default AddVideoModal;