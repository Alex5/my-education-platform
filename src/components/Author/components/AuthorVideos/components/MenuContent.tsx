import React, {FC, useState} from 'react';
import {IVideo} from "../../../../../redux/slices/videosSlice/types";
import {Badge, Button, Popover} from "@geist-ui/core";
import {VideosRequests} from "../../../../../api/videosRequests";
import {setVideos} from "../../../../../redux/slices/videosSlice";
import {useDispatch} from "react-redux";

interface P {
    video: IVideo
}

const MenuContent: FC<P> = ({video}) => {
    const [load, setLoad] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleUpdateVideo = async (video: IVideo) => {
        debugger
        setLoad(true)
        const videos = await VideosRequests.updateVideo({
            ...video,
            // accountId: getAccountId()
        });
        dispatch(setVideos(videos));
        // setSaveType('save');
        // setVideo({} as IVideo);
        setLoad(false)
    }

    const handleEditVideo = (video: IVideo) => {
        return () => {
            // setSaveType('update')
            // setVideo(video);
            // setVisible(true);
        }
    }

    const handleDeleteVideo = (video: Pick<IVideo, 'videoId' | 'ownerId'>) => {
        return async () => {
            const videos = await VideosRequests.deleteVideo(video);
            dispatch(setVideos(videos));
        }
    }

    return (
        <>
            <Popover.Item title>
                <span>Действия</span>
            </Popover.Item>
            <Popover.Item>
                {video.published
                    ? <Button
                        onClick={() => handleUpdateVideo({...video, published: false})}
                        scale={1 / 2}
                    >Снять с публикации</Button>
                    : (
                        <Badge.Anchor>
                            <Badge scale={0.5} type="error" dot/>
                            <Button
                                onClick={() => handleUpdateVideo({...video, published: true})}
                                loading={load}
                                type="secondary"
                                scale={1 / 2}
                            >
                                Опубликовать
                            </Button>
                        </Badge.Anchor>
                    )
                }
            </Popover.Item>
            <Popover.Item>
                <Button scale={1 / 2} onClick={handleEditVideo(video)}>Редактировать</Button>
            </Popover.Item>
            <Popover.Item>
                <Button scale={1 / 2} type={"error"} onClick={handleDeleteVideo(video)}>Удалить</Button>
            </Popover.Item>
        </>
    );
};

export default MenuContent;