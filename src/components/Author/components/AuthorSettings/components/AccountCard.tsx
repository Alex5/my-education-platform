import React, {FC, useEffect, useState} from 'react';
import {Edit, Lock, Save, Unlock} from "@geist-ui/react-icons";
import {Card, Collapse, Divider, Image, Input, Modal, Spacer, Text, useModal, User} from "@geist-ui/core";
import {IAccount} from "../../../../../redux/slices/authorSlice/author.types";
import SnipText from "../../../../shared/SnipText";

const AccountCard: FC<{ account: IAccount }> = ({account}) => {
    const [stateAccount, setStateAccount] = useState({} as IAccount);
    const [edit, setEdit] = useState<boolean>(false);
    const {visible, setVisible, bindings} = useModal();

    const handleAccountSave = () => {
        setEdit(false);
    }

    const handleAccountEdit = () => {

    }

    useEffect(() => {
        setStateAccount(account);
    }, [account])

    return (
        <>
            <Card style={{cursor: "pointer"}} hoverable width="100%" onClick={() => setVisible(true)}>
                <Card.Content padding={0.5} mb={0}>
                    <User src={stateAccount.photoLink} name={stateAccount.name}>
                        <SnipText text={stateAccount.knowledge || '-'}/>
                    </User>
                </Card.Content>
            </Card>
            <Modal {...bindings}>
                <Modal.Title>Редактирование аккаунта</Modal.Title>
                <Modal.Content>
                    <div style={{display: 'flex', justifyContent: "space-between"}}>
                        <Text h5 children={stateAccount.name}/>
                        {edit
                            ? <Unlock color={"#0070F3"} onClick={() => setEdit(!edit)}/>
                            : <Lock onClick={() => setEdit(!edit)}/>
                        }
                    </div>
                    <Divider/>
                    <Input width={"100%"} disabled={!edit} value={stateAccount.name}>Имя</Input>
                    <Spacer/>
                    <Input width={"100%"} disabled={!edit} value={stateAccount.channelLink}>Ссылка на канал</Input>
                    <Spacer/>
                    <Input width={"100%"} disabled={!edit} value={stateAccount.knowledge}>Уровень знаний или
                        должность</Input>
                    <Spacer/>
                    <Input width={"100%"} disabled={!edit} value={stateAccount.photoLink}>Ссылка на фото</Input>
                    <Spacer/>
                    {stateAccount.photoLink && (
                        <Image src={stateAccount.photoLink}/>
                    )}
                </Modal.Content>
                <Modal.Action passive onClick={() => setVisible(false)}>Отменить</Modal.Action>
                <Modal.Action onClick={handleAccountSave}>Сохранить</Modal.Action>
            </Modal>
        </>

    );
};

export default AccountCard;