import React, {useEffect, useState} from 'react';
import SearchBar from "../shared/SearchBar";
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
    useToasts
} from "@geist-ui/react";
import {formatEmbedLink, snipText, updateObjectProp} from "../../../../services/helpers";
import {IVideo} from "../../../../redux/slices/videosSlice/types";
import {nanoid} from "nanoid";
import {VideosRequests} from "../../../../api/videosRequests";
import {useDispatch, useSelector} from "react-redux";
import {getVideos, setVideos} from "../../../../redux/slices/videosSlice";
import {getUser} from "../../../../redux/slices/userSlice/userSlice";
import Iframe from "../shared/Iframe";
import {MoreVertical} from "@geist-ui/react-icons";
import SnipText from "../../../shared/SnipText";

const AuthorVideos = () => {
    const {visible, setVisible, bindings} = useModal()
    const user = useSelector(getUser);

    const [load, setLoad] = useState<boolean>(false);
    const [video, setVideo] = useState<IVideo>({videoId: nanoid(), ownerId: user.uid} as IVideo);
    const [saveType, setSaveType] = useState<'save' | 'update'>('save')

    const [, setToast] = useToasts();

    const dispatch = useDispatch();
    const videos = useSelector(getVideos);

    const handleUpdateState = (key: keyof IVideo, newValue: string) => {
        if (key === 'embedLink') {
            const formattedLink = formatEmbedLink(newValue)
            const videoId = formattedLink.split("embed/")[1] || ''
            const newObj = updateObjectProp(key, video, formattedLink)
            const newObjUpdate = updateObjectProp("cover", newObj, `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)
            return setVideo(newObjUpdate);
        }

        const newObj = updateObjectProp(key, video, newValue)
        setVideo(newObj);
    }

    const handleSaveVideo = async () => {
        if (saveType === 'update') {
            return handleUpdateVideo(video);
        }
        setLoad(true)
        const videos = await VideosRequests.saveVideo(video);
        dispatch(setVideos(videos));
        setVisible(false);
        setLoad(false)
    }

    const handleEditVideo = (video: IVideo) => {
        return () => {
            setSaveType('update')
            setVideo(video);
            setVisible(true);
        }
    }

    const handleDeleteVideo = (video: Pick<IVideo, 'videoId' | 'ownerId'>) => {
        return async () => {
            const videos = await VideosRequests.deleteVideo(video);
            dispatch(setVideos(videos));
        }
    }

    const handleUpdateVideo = (video: IVideo) => {
        return async () => {
            setLoad(true)
            const videos = await VideosRequests.updateVideo(video);
            dispatch(setVideos(videos));
            setSaveType('save');
            setVideo({} as IVideo);
            setLoad(false)
            setVisible(false);
        }
    }

    const menuContent = (video: IVideo) => {
        return (
            <div style={{width:'170px'}}>
                <Popover.Item title>
                    <span>Действия</span>
                </Popover.Item>
                <Popover.Item>
                    {video.published
                        ? <span onClick={handleUpdateVideo({...video, published: false})}>Снять с публикации</span>
                        : (
                            <Badge.Anchor>
                                <Badge scale={0.5} type="error" dot/>
                                <span onClick={handleUpdateVideo({...video, published: true})}>Опубликовать</span>
                            </Badge.Anchor>
                        )
                    }
                </Popover.Item>
                <Popover.Item>
                    <span onClick={handleEditVideo(video)}>Редактировать</span>
                </Popover.Item>
                <Popover.Item>
                    <Text mb={0} mt={0} type={"error"} onClick={handleDeleteVideo(video)}>Удалить</Text>
                </Popover.Item>
            </div>
        )
    }

    useEffect(() => {
        (async () => {
            const videos = await VideosRequests.getVideos('author');
            dispatch(setVideos(videos));
        })()
    }, [])


    return (
        <>
            <SearchBar onClick={() => setVisible(true)}/>
            <Grid.Container>
                <Grid.Container gap={2}>
                    {videos && videos.map(video => (
                        <Grid key={video.videoId} xs={8}>
                            <Card>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <SnipText h5 text={video.name}/>
                                    <Spacer/>
                                    <Popover content={menuContent(video)}>
                                        <Badge.Anchor>
                                            {!video.published && <Badge scale={0.5} type="error" dot/>}
                                            <MoreVertical/>
                                        </Badge.Anchor>
                                    </Popover>
                                </div>
                                <Iframe height={"165px"} src={video.embedLink}/>
                            </Card>
                        </Grid>
                    ))}
                </Grid.Container>
            </Grid.Container>
            <Modal {...bindings}>
                <Modal.Title>Добавление видео</Modal.Title>
                <Modal.Subtitle>Пожалуйста заполните все поля</Modal.Subtitle>
                <Modal.Content>
                    <Grid.Container>
                        <Grid.Container gap={2}>
                            <Grid height={"100%"} xs={24} direction={"column"}>
                                <div>
                                    <Input
                                        value={video.name}
                                        onChange={e => handleUpdateState('name', e.target.value)}
                                        placeholder={"Me at the zoo"} width={"100%"}
                                    >
                                        Название видео
                                    </Input>
                                </div>
                                <Spacer/>
                                <div>
                                    <Text small type={"secondary"} children={"Описание"}/>
                                    <Input.Textarea placeholder={"Me at the zoo"} value={video.description}
                                                    onChange={e => handleUpdateState('description', e.target.value)}
                                                    resize={"vertical"}
                                                    width={"100%"}/>
                                </div>
                                <Spacer/>
                                <div>
                                    <Input placeholder={"<iframe..."} width={"100%"} value={video.embedLink}
                                           onChange={e => handleUpdateState('embedLink', e.target.value)}>
                                        Ссылка для встраивания
                                    </Input>
                                </div>
                                <Spacer/>
                                {video.embedLink && (
                                    <Collapse shadow style={{fontSize: "10px"}} title="Предварительный просмотр видео">
                                        <Iframe src={video.embedLink} height={"185px"}/>
                                    </Collapse>
                                )}
                                <Spacer/>
                                <div>
                                    <Input placeholder={""} width={"100%"} value={video.cover}
                                           onChange={e => handleUpdateState('cover', e.target.value)}>
                                        Обложка
                                    </Input>
                                </div>
                                <Spacer/>
                                {video.cover && (
                                    <Collapse shadow style={{fontSize: "10px"}}
                                              title={"Предварительный просмотр обложки"}>
                                        <Image src={video.cover}/>
                                    </Collapse>
                                )}
                                <Spacer/>
                            </Grid>
                        </Grid.Container>
                    </Grid.Container>
                </Modal.Content>
                <Modal.Action
                    passive
                    onClick={() => {
                        setVisible(false)
                        setVideo({} as IVideo);
                        setSaveType('save');
                    }}
                >
                    Отменить
                </Modal.Action>
                <Modal.Action
                    loading={load}
                    onClick={saveType === 'save'
                        ? handleSaveVideo
                        : () => handleUpdateVideo(video)}
                >
                    Сохранить
                </Modal.Action>
            </Modal>
        </>
    );
};

export default AuthorVideos;