import React from 'react';
import {Button, Fieldset, Spacer, Textarea, Text, Note} from "@geist-ui/react";

const General = () => {
    const content = false;

    return (
        <>
            <Fieldset>
                <Fieldset.Title>Описание курса</Fieldset.Title>
                <Fieldset.Subtitle>
                    <Textarea width="100%" placeholder={"Поле не заполнено"}/>
                </Fieldset.Subtitle>
                <Fieldset.Footer>
                    Пожалуйста, используйте максимум 148 символов.
                    <Button auto scale={1 / 3}>Сохранить</Button>
                </Fieldset.Footer>
            </Fieldset>
            <Spacer/>
            <Fieldset>
                <Fieldset.Title>Содержание</Fieldset.Title>
                <Fieldset.Subtitle>
                    {content
                        ? <span>содержание курса</span>
                        : <Note style={{display: 'flex',justifyContent: 'space-between'}} type="warning" label={false}>
                            В курсе пока что нет ни одного урока.
                            <Button auto type="warning" children="Редактировать" scale={1/3}/>
                    </Note>
                    }
                </Fieldset.Subtitle>
                <Fieldset.Footer>
                    <Button auto scale={1 / 3}>Сохранить</Button>
                </Fieldset.Footer>
            </Fieldset>
        </>
    );
};

export default General;