import React, {useState} from 'react';
import {PublicRequests} from "../../api/publicRequests";
import {getUser, setUser} from "../../redux/slices/userSlice/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {Button, Fieldset, Grid, Input, Radio, Spacer, Text, useClipboard, useToasts} from '@geist-ui/core';
import {Copy} from "@geist-ui/react-icons";
import {EStatus} from "../../redux/enums";

const Account = () => {
    const {author, uid} = useSelector(getUser);

    const [load, setLoad] = useState(false);
    const [status, setStatus] = useState<string | number>(author ? EStatus.author : EStatus.user)
    const handler = (val: string | number) => {
        setStatus(val)
    }

    const {copy} = useClipboard()
    const {setToast} = useToasts()
    const handleCopy = () => {
        copy(uid)
        setToast({text: 'ID Скопированно'})
    }

    const dispatch = useDispatch();


    const handleSaveStatus = async () => {
        setLoad(true)
        const updatedUser = await PublicRequests.transformAccount(uid, status);
        dispatch(setUser(updatedUser));
        setLoad(false)
    }

    return (
        <Grid.Container gap={2} justify="center">
            <Grid xs={24} direction={"column"}>
                <Fieldset style={{width: '100%'}}>
                    <Fieldset.Title>Тип аккаунта</Fieldset.Title>
                    <Fieldset.Subtitle>
                        <Text
                            children="Смените тип аккаунт, все созданные вами курсы остануться. Но вы потеряете доступ к созданию новых."/>
                        <Radio.Group value={author ? EStatus.author : EStatus.user} onChange={handler}>
                            <Radio value={EStatus.author}>Автор</Radio>
                            <Radio value={EStatus.user}>Пользователь</Radio>
                        </Radio.Group>
                    </Fieldset.Subtitle>
                    <Fieldset.Footer>
                        Не забудьте сохранить изменения
                        <Button loading={load} onClick={handleSaveStatus} auto scale={1 / 3}>Сохранить</Button>
                    </Fieldset.Footer>
                </Fieldset>
                <Spacer/>
                <Fieldset style={{width: '100%'}}>
                    <Fieldset.Title>Ваш ID</Fieldset.Title>
                    <Fieldset.Subtitle>
                        <Text children="Это ваш идентификатор пользователя в My Education Platform."/>
                        <Input
                            width={'260px'}
                            iconClickable={true}
                            onIconClick={handleCopy}
                            iconRight={<Copy/>}
                            value={uid}
                        />
                    </Fieldset.Subtitle>
                    <Fieldset.Footer>
                        Используется при взаимодействии с MEP API.
                        <span></span>
                    </Fieldset.Footer>
                </Fieldset>
                <Spacer/>
                <Fieldset style={{width: '100%', border: '1px solid #e00'}}>
                    <Fieldset.Title>Удалить личный кабинет</Fieldset.Title>
                    <Fieldset.Subtitle>
                        <Text
                            children="Безвозвратно удалите свою Личную учетную запись и все ее содержимое с My Education Platform. Это действие необратимо, поэтому будьте осторожны."/>
                    </Fieldset.Subtitle>
                    <Fieldset.Footer>
                        <span/>
                        <Button auto scale={1 / 2} type="error" style={{fontWeight: 500}}>Удалить личный
                            кабинет</Button>
                    </Fieldset.Footer>
                </Fieldset>
            </Grid>
        </Grid.Container>
    )
};


export default Account;