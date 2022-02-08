import { useState } from 'react';
import { PublicRequests } from "../../api/publicRequests";
import { getFirebaseUser, getUser, setUser } from "../../redux/slices/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Fieldset, Grid, Input, Note, Radio, Spacer, Text, useClipboard, useToasts } from '@geist-ui/core';
import { Copy } from "@geist-ui/react-icons";
import { EStatus } from "../../redux/enums";

const Account = () => {
    const { uid, email, displayName, photoURL } = useSelector(getFirebaseUser);
    const { author } = useSelector(getUser);

    const [load, setLoad] = useState(false);
    const [status, setStatus] = useState<string | number>(author ? EStatus.author : EStatus.user);

    const { copy } = useClipboard()
    const { setToast } = useToasts()
    const handleCopy = (value: string, key: string) => {
        copy(value);
        setToast({ text: `${key} скопирован`, type: 'success' })
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
                <Note type="success">My Education Platform не хранит ваше имя, email и фотографию. Вся информация загружается с серверов Google во время входа, и хранится у вас на вашем компьютере.</Note>
                <Spacer />
                <Fieldset style={{ width: '100%' }}>
                    <Fieldset.Title>Тип аккаунта</Fieldset.Title>
                    <Fieldset.Subtitle>
                        <Text
                            children="Смените тип аккаунт, все созданные вами курсы остануться. Но вы потеряете доступ к созданию новых." />
                        <Radio.Group value={author ? EStatus.author : EStatus.user} onChange={(val) => setStatus(val)}>
                            <Radio value={EStatus.author}>Автор</Radio>
                            <Radio value={EStatus.user}>Пользователь</Radio>
                        </Radio.Group>
                    </Fieldset.Subtitle>
                    <Fieldset.Footer>
                        Не забудьте сохранить изменения
                        <Button loading={load} onClick={handleSaveStatus} auto scale={1 / 3}>Сохранить</Button>
                    </Fieldset.Footer>
                </Fieldset>
                <Spacer />
                <Fieldset style={{ width: '100%' }}>
                    <Fieldset.Title>Ваше имя Google</Fieldset.Title>
                    <Fieldset.Subtitle>
                        <Text children="Это ваше имя." />
                        <Input
                            width={'260px'}
                            iconClickable={true}
                            onIconClick={() => handleCopy(displayName, 'Имя')}
                            iconRight={<Copy />}
                            value={displayName}
                        />
                    </Fieldset.Subtitle>
                </Fieldset>
                <Spacer />
                <Fieldset style={{ width: '100%' }}>
                    <Fieldset.Title>Ваш ID</Fieldset.Title>
                    <Fieldset.Subtitle>
                        <Text children="Это ваш идентификатор." />
                        <Input
                            width={'260px'}
                            iconClickable={true}
                            onIconClick={() => handleCopy(uid, 'ID')}
                            iconRight={<Copy />}
                            value={uid}
                        />
                    </Fieldset.Subtitle>
                </Fieldset>
                <Spacer />
                <Fieldset style={{ width: '100%' }}>
                    <Fieldset.Title>Ваш email</Fieldset.Title>
                    <Fieldset.Subtitle>
                        <Text children="Это ваш email." />
                        <Input
                            width={'260px'}
                            iconClickable={true}
                            onIconClick={() => handleCopy(email, 'email')}
                            iconRight={<Copy />}
                            value={email}
                        />
                    </Fieldset.Subtitle>
                </Fieldset>
                <Spacer />
                <Fieldset style={{ width: '100%' }}>
                    <Fieldset.Title>Ссылка на фотографию</Fieldset.Title>
                    <Fieldset.Subtitle>
                        <Text children="Это ваша ссылка на фотографию." />
                        <Input
                            width={'260px'}
                            iconClickable={true}
                            onIconClick={() => handleCopy(photoURL, 'Ссылка на фотографию')}
                            iconRight={<Copy />}
                            value={photoURL}
                        />
                    </Fieldset.Subtitle>
                </Fieldset>
                <Spacer />
                <Fieldset style={{ width: '100%', border: '1px solid #e00' }}>
                    <Fieldset.Title>Удалить личный кабинет</Fieldset.Title>
                    <Fieldset.Subtitle>
                        <Text
                            children="Безвозвратно удалите свою Личную учетную запись и все ее содержимое с My Education Platform. Это действие необратимо, поэтому будьте осторожны." />
                    </Fieldset.Subtitle>
                    <Fieldset.Footer>
                        <span />
                        <Button auto scale={1 / 2} type="error" style={{ fontWeight: 500 }}>Удалить личный
                            кабинет</Button>
                    </Fieldset.Footer>
                </Fieldset>
            </Grid>
        </Grid.Container>
    )
};


export default Account;