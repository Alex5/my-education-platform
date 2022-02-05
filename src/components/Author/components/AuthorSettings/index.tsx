import {Button, Card, Description, Fieldset, Grid, Input, Modal, Spacer, useModal} from '@geist-ui/core';
import React, {useEffect, useState} from 'react';
import {AuthorRequests} from "../../../../api/authorRequests";
import {useDispatch, useSelector} from "react-redux";
import {getAccounts, setAccounts} from "../../../../redux/slices/userSlice/userSlice";
import {IAccount} from "../../../../redux/slices/authorSlice/author.types";
import {updateObjectProp} from "../../../../services/helpers";
import SnipText from "../../../shared/SnipText";
import {Edit} from '@geist-ui/react-icons'
import AccountCard from "./components/AccountCard";


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
        (async () => {
            const accounts = await AuthorRequests.getAccounts();
            dispatch(setAccounts(accounts))
        })()
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
                    <Grid.Container gap={1}>
                        {accounts && accounts.map(account => (
                            <Grid xs={8}>
                                <AccountCard account={account}/>
                            </Grid>
                        ))}
                    </Grid.Container>
                </Fieldset.Subtitle>
                <Fieldset.Footer>
                    Можно добавить максимально 6 аккаунтов
                </Fieldset.Footer>
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
                        О чём канал, или должность, или уровень знаний
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