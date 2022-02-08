import { Button, Image, Fieldset, Grid, Input, Modal, Spacer, useModal, Card } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { AuthorRequests } from "../../../../api/authorRequests";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts, getFirebaseUser, setAccounts } from "../../../../redux/slices/userSlice/userSlice";
import { IAccount } from "../../../../redux/slices/authorSlice/author.types";
import { updateObjectProp } from "../../../../services/helpers";
import AuthorAccountPreview from '../AuthorAccountPreview';


const Settings = () => {
    const accounts = useSelector(getAccounts);
    const firebaseUser = useSelector(getFirebaseUser);

    const { setVisible, bindings } = useModal();
    const [account, setAccount] = useState({ ownerId: firebaseUser?.uid } as IAccount);
    const [mutateProgress, setMutateProgress] = useState(false);

    const dispatch = useDispatch();

    const onAccountStateEdit = (key: keyof IAccount, value: string) => {
        const updatedAccount: IAccount = updateObjectProp(key, account, value)
        setAccount(updatedAccount);
    }

    const handleAddAccount = async () => {
        setMutateProgress(true);
        const accounts = await AuthorRequests.mutateAccount(account);
        dispatch(setAccounts(accounts));
        setMutateProgress(false);
        setVisible(false);
    }

    const openAccountModal = (accountId?: string) => {
        setVisible(true);
        if (accountId) {
            const account = accounts.find(account => account.id === accountId) || {} as IAccount;
            setAccount(account);
        }
    }

    const closeAccountModal = () => {
        setAccount({} as IAccount);
        setVisible(false);
    }

    useEffect(() => {
        (async () => {
            const accounts = await AuthorRequests.getAccounts();
            dispatch(setAccounts(accounts));
        })()
    }, [])

    return (
        <>
            <Fieldset width={"100%"}>
                <Fieldset.Title style={{ justifyContent: "space-between", width: '100%' }}>
                    Добавленые аккаунты
                    <Button scale={1 / 2} onClick={() => openAccountModal()} children={"Добавить аккаунт"} />
                </Fieldset.Title>
                <Spacer />
                <Fieldset.Subtitle>
                    <Grid.Container gap={1}>
                        {accounts && accounts.map(account => (
                            <Grid xs={8}>
                                <Card
                                    onClick={() => openAccountModal(account.id)}
                                    style={{ cursor: "pointer" }}
                                    hoverable width="100%" >
                                    <Card.Content padding={0.5} mb={0}>
                                        <AuthorAccountPreview
                                            disableLink
                                            ownerId={account.ownerId}
                                            accountId={account.id}
                                            updateAt={account.updatedAt}
                                        />
                                    </Card.Content>
                                </Card>
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
                    <Spacer />
                    <Input onChange={e => onAccountStateEdit('knowledge', e.target.value)}
                        value={account.knowledge}
                        placeholder={"senior pomidor engineer"} width={"100%"}>
                        О чём канал, или должность, или уровень знаний
                    </Input>
                    <Spacer />
                    <Input onChange={e => onAccountStateEdit('channelLink', e.target.value)}
                        value={account.channelLink}
                        placeholder={"https://www.youtube.com/channel..."} width={"100%"}>
                        Ссылка на YouTube канал
                    </Input>
                    <Spacer />
                    <Input onChange={e => onAccountStateEdit('photoLink', e.target.value)} value={account.photoLink}
                        width={"100%"}>
                        Ссылка на фото профиля
                    </Input>
                    <Spacer />
                    {account.photoLink && (
                        <Image src={account.photoLink} />
                    )}
                </Modal.Content>
                <Modal.Action passive onClick={closeAccountModal}>Отменить</Modal.Action>
                <Modal.Action onClick={handleAddAccount} loading={mutateProgress}>Сохранить</Modal.Action>
            </Modal>
        </>
    );
};

export default Settings;