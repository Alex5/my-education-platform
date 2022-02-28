import React, {useEffect, useState} from 'react';
import {
    Badge,
    Card,
    Collapse,
    Grid,
    Image,
    Input,
    Modal,
    Popover,
    Spacer,
    Text,
    useModal,
} from "@geist-ui/core";
import {formatEmbedLink, updateObjectProp} from "../../../../services/helpers";
import {IVideo} from "../../../../redux/slices/videosSlice/types";
import {VideosRequests} from "../../../../api/videosRequests";
import {useDispatch, useSelector} from "react-redux";
import {getVideos, setVideos} from "../../../../redux/slices/videosSlice";
import {getFirebaseUser, getUser} from "../../../../redux/slices/userSlice/userSlice";
import Iframe from "../shared/Iframe";
import {MoreVertical} from "@geist-ui/react-icons";
import SnipText from "../../../shared/SnipText";
import {Button} from '@geist-ui/core';
import AuthorAccountsSelect from "../AuthorAccountsSelect";
import {getSelectedAccount} from "../../../../redux/slices/authorSlice/author.slice";
import PageLayout from '../../../Layouts/PageLayout';
import AddVideoModal from "./components/AddVideoModal";
import AuthorVideo from "./components/AuthorVideo";

const AuthorVideos = () => {
    const {setVisible, bindings} = useModal();
    const user = useSelector(getFirebaseUser);

    const [video, setVideo] = useState<IVideo>({ownerId: user?.uid} as IVideo);

    const dispatch = useDispatch();
    const videos = useSelector(getVideos);

    const handleOpenModal = (video: IVideo) => {
        setVisible(true);
        setVideo(video);
    }

    useEffect(() => {
        (async () => {
            const videos = await VideosRequests.getVideos('author');
            dispatch(setVideos(videos));
        })()
    }, [])

    return (
        <PageLayout title='Ваши видео' headerActions={[
            <Button
                onClick={() => handleOpenModal({} as IVideo)}
                width={"100%"}
                type="secondary"
                children={"Новое видео"}
            />
        ]}>
            <Grid.Container>
                <Grid.Container gap={2}>
                    {videos && videos.length > 0
                        ? videos.map(video => (
                            <Grid key={video.videoId} xs={24} md={8}>
                                <AuthorVideo
                                    onClick={() => handleOpenModal(video)}
                                    name={video.name}
                                    cover={video.cover}
                                />
                            </Grid>
                        ))
                        : <span>Нет видео</span>}
                </Grid.Container>
            </Grid.Container>
            <AddVideoModal setVisible={setVisible} bindings={bindings} video={video} setVideo={setVideo}/>
        </PageLayout>
    );
};

export default AuthorVideos;