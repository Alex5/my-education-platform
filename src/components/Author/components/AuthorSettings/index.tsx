import {Button, Card, Description, Divider, Fieldset, Grid, Input, Modal, Spacer, useModal} from '@geist-ui/core';
import React, {useEffect, useState} from 'react';
import {AuthorRequests} from "../../../../api/authorRequests";
import {useDispatch, useSelector} from "react-redux";
import {getAccounts, setAccounts} from "../../../../redux/slices/userSlice/userSlice";
import {IAccount} from "../../../../redux/slices/userSlice/types";
import {updateObjectProp} from "../../../../services/helpers";
import SnipText from "../../../shared/SnipText";

const Settings = () => {
    const {visible, setVisible, bindings} = useModal();
    const [account, setAccount] = useState({} as IAccount);

    const dispatch = useDispatch();
    const accounts = useSelector(getAccounts);

    const onAccountStateEdit = (key: keyof IAccount, value: string) => {
        const updatedAccount: IAccount = updateObjectProp(key, account, value)
        setAccount(updatedAccount);
    }


    const handleAddAccount = async () => {
        const accounts = await AuthorRequests.addAccount(account);
        dispatch(setAccounts(accounts));
    }

    useEffect(() => {
        AuthorRequests.getAccounts().then(accounts => dispatch(setAccounts(accounts)))
    }, [])

    return (
        <>
            <Fieldset width={"100%"}>
                <Fieldset.Title style={{justifyContent: "space-between", width: '100%'}}>
                    Добавленые аккаунты
                    <Button scale={1 / 2} onClick={() => setVisible(true)} children={"Добавить аккаунт"}/>
                </Fieldset.Title>
                <Spacer/>
                <Fieldset.Subtitle>
                    <Grid.Container gap={2}>
                        {accounts && accounts.map(account => (
                            <Grid xs={24} md={8}>
                                <Card>
                                    <Description title="Имя" content={<SnipText text={account.name}/>}/>
                                    <Spacer/>
                                    <Description title="Ссылка на канал" content={<SnipText text={account.channelLink}/>}/>
                                    <Spacer/>
                                    <Description title="Уровень знаний или должность" content={<SnipText text={account.knowledge}/>}/>
                                    <Spacer/>
                                    <Description title="Ссылка на фото" content={<SnipText text={account.photoLink}/>}/>
                                </Card>
                            </Grid>
                        ))}
                    </Grid.Container>
                </Fieldset.Subtitle>
            </Fieldset>
            <Modal {...bindings}>
                <Modal.Title>Добавление аккаунта</Modal.Title>
                <Modal.Content>
                    <Input
                        onChange={e => onAccountStateEdit('name', e.target.value)}
                        value={account.name}
                        placeholder={"Лучший канал про React"}
                        width={"100%"}>
                        Название канала или Ф.И.О автора
                    </Input>
                    <Spacer/>
                    <Input onChange={e => onAccountStateEdit('knowledge', e.target.value)}
                           value={account.knowledge}
                           placeholder={"senior pomidor engineer"} width={"100%"}>
                        Уровень знаний или должность
                    </Input>
                    <Spacer/>
                    <Input onChange={e => onAccountStateEdit('channelLink', e.target.value)}
                           value={account.channelLink}
                           placeholder={"https://www.youtube.com/channel..."} width={"100%"}>
                        Ссылка на YouTube канал
                    </Input>
                    <Spacer/>
                    <Input onChange={e => onAccountStateEdit('photoLink', e.target.value)} value={account.photoLink}
                           width={"100%"}>
                        Ссылка на фото профиля
                    </Input>
                    <Spacer/>
                </Modal.Content>
                <Modal.Action passive onClick={() => setVisible(false)}>Отменить</Modal.Action>
                <Modal.Action onClick={handleAddAccount}>Сохранить</Modal.Action>
            </Modal>
        </>
    );
};

export default Settings;