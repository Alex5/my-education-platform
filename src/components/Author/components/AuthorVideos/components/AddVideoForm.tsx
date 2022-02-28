import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {Button, Collapse, Divider, Grid, Image, Input, Note, Spacer, Text} from "@geist-ui/core";
import Iframe from "../../shared/Iframe";
import React, {FC, useState} from "react";
import {IVideo} from "../../../../../redux/slices/videosSlice/types";
import {useSelector} from "react-redux";
import {getSelectedAccount} from "../../../../../redux/slices/authorSlice/author.slice";
import AuthorAccountsSelect from "../../AuthorAccountsSelect";
import {getFirebaseUser} from "../../../../../redux/slices/userSlice/userSlice";
import {formatEmbedLink} from "../../../../../services/helpers";

interface P {
    video: IVideo;
}

const AddVideoForm: FC<P> = ({video}) => {
    const [load, setLoad] = useState<boolean>(false);

    const firebaseUser = useSelector(getFirebaseUser);
    const selectedAccount = useSelector(getSelectedAccount);

    const getAccountId = () => selectedAccount ? selectedAccount.id : video.accountId;

    const {control, handleSubmit, watch, formState: {errors, isValid}} = useForm<IVideo>({
        defaultValues: video || {
            videoId: '', // нужно присваивать id во время сохранения
            ownerId: '',
            embedLink: '',
            name: '',
            published: false,
            cover: '',
            description: '',
            accountId: ''
        }
    });

    const embedLink = watch('embedLink');
    const cover = watch('cover');

    const handleSaveVideo = async (video: IVideo) => {
        setLoad(true)
        // const videos = await VideosRequests.saveVideo({
        //     ...video,
        // });
        // dispatch(setVideos(videos));
        // setLoad(false)
        // setVisible(false);
        console.log(video)
    }

    return (
        <form onSubmit={handleSubmit(handleSaveVideo)}>
            <Controller
                name="name"
                control={control}
                rules={{required: true}}
                render={({field}) => {
                    return (
                        <Input type={errors.name ? "error" : 'default'} width={'100%'} {...field}>
                            <Text type={errors.name ? 'error' : 'default'} children={errors.name ? '*Имя' : 'Имя'}/>
                        </Input>
                    )
                }
                }
            />
            <Spacer/>
            <Controller
                name="description"
                control={control}
                render={({field}) => <Input width={'100%'} {...field}>Описание</Input>}
            />
            <Spacer/>
            <Controller
                name="embedLink"
                control={control}
                rules={{required: true}}
                render={({field}) => {
                    return (
                        <Input type={errors.embedLink ? "error" : 'default'} width={'100%'} {...field}>
                            <Text
                                type={errors.embedLink ? 'error' : 'default'}
                                children={`${errors.embedLink ? '*' : ''}Ссылка для встраивания`}
                            />
                        </Input>
                    )
                }}
            />
            <Spacer h={0.5}/>
            {embedLink && (
                <Collapse shadow style={{fontSize: "10px"}} title="Предварительный просмотр видео">
                    <Iframe src={embedLink} height={"185px"}/>
                </Collapse>
            )}
            {/*<Spacer/>*/}
            {/*<Controller*/}
            {/*    name="cover"*/}
            {/*    control={control}*/}
            {/*    rules={{required: true}}*/}
            {/*    render={({field}) => <Input width={'100%'} {...field}>Обложка</Input>}*/}
            {/*/>*/}
            <Spacer h={0.5}/>
            {cover && (
                <Collapse shadow style={{fontSize: "10px"}}
                          title={"Предварительный просмотр обложки"}>
                    <Image src={cover}/>
                </Collapse>
            )}
            <Spacer/>
            <Controller
                name="accountId"
                control={control}
                render={({field}) => <AuthorAccountsSelect type={errors.accountId ? 'error' : 'default'} {...field}/>}
            />
            <AuthorAccountsSelect/>
            {/*<AuthorAccountPreview ownerId={ownerId} accountId={getAccountId()}/>*/}
            <Spacer h={3}/>
            <Grid.Container gap={1}>
                <Grid xs={24} md={12}>
                    <Button width={'100%'} children={'Отменить'}/>
                </Grid>
                <Grid xs={24} md={12}>
                    <Button type={'secondary'} width={'100%'} htmlType={'submit'} children={'Сохранить'}/>
                </Grid>
            </Grid.Container>

        </form>
    );
};

export default AddVideoForm;