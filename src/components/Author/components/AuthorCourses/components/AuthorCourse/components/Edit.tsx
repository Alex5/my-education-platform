import React, {useState} from 'react';
import {Button, Input, Spacer, Fieldset, Text, Textarea, Divider, Badge, Code, Grid} from "@geist-ui/react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Edit = () => {
    const [code, setCode] = useState<string>('');
    return (
        <Grid.Container gap={2}>
            <Grid xs={18}>
                <Fieldset width={"100%"}>
                    <Fieldset.Title>
                        1. Создание нового урока
                    </Fieldset.Title>
                    <Fieldset.Subtitle>
                        <Text>Название урока</Text>
                        <Input/>
                        <Text>Описание</Text>
                        <Textarea width={"100%"}/>
                        <Text>Ссылка на ролик</Text>
                        <Input label="https://www.youtube.com/"/>
                        <Spacer/>
                        <Fieldset>
                            <Fieldset.Title>
                                Домашнее задание
                            </Fieldset.Title>
                            <Fieldset.Subtitle>
                                <Text>Описание</Text>
                                <Textarea width={"100%"}/>
                                <Text>Код</Text>
                                <Textarea resize="vertical"  width={"100%"} onChange={e => setCode(e.target.value)} placeholder="Вставьте код сюда"/>
                                {code && <SyntaxHighlighter language="javascript" style={vs}>
                                    {code}
                                </SyntaxHighlighter>}
                            </Fieldset.Subtitle>
                            <Fieldset.Footer>
                                Сохраните несколько домашних заданий
                                <Button auto scale={1 / 3}>Сохранить</Button>
                            </Fieldset.Footer>
                        </Fieldset>
                    </Fieldset.Subtitle>
                    <Fieldset.Footer>
                        Сохраните ваш урок, обязательные поля подсветятся
                        <Button auto scale={1 / 3}>Сохранить</Button>
                    </Fieldset.Footer>
                </Fieldset>
            </Grid>
            <Grid xs={6}>
                sidebar
            </Grid>
        </Grid.Container>

    );
};

export default Edit;