import React, {FC, useState} from 'react';
import {Button, Grid, Input, Note, Text} from "@geist-ui/react";
import {ICourse} from "../../../../../../../redux/slices/coursesSlice/types";
import styled from "styled-components";
import {PlusCircle, Trash} from "@geist-ui/react-icons";

interface Props {
    handleUpdateState: (key: keyof ICourse, targetValue: any) => void
    data: any;
    courseKey: keyof ICourse;
}

const SwitchBlockContent: FC<Props> = ({courseKey, data, handleUpdateState}) => {
    const [tagInput, setTagInput] = useState('')

    switch (courseKey) {
        case "author":
            return (
                <Grid.Container mb={1.5} gap={1}>
                    <Grid xs={8}>
                        <Input
                            value={data.name}
                            onChange={e => handleUpdateState('author', {
                                ...data,
                                name: e.target.value
                            })} width="100%"
                            placeholder="Иван Иванов"
                        >
                            Имя Фамилия
                        </Input>
                    </Grid>
                    <Grid xs={8}>
                        <Input
                            value={data.appointment}
                            onChange={e => handleUpdateState('author', {
                                ...data,
                                appointment: e.target.value
                            })}
                            width="100%"
                            placeholder="Senior Pomidor JavaScript Developer"
                        >
                            Должность
                        </Input>
                    </Grid>
                    <Grid xs={8}>
                        <Input value={data.channelLink}
                               onChange={e => handleUpdateState('author', {
                                   ...data,
                                   channelLink: e.target.value
                               })}
                               width="100%"
                               placeholder="https://www.youtube.com/c/">
                            Ссылка на YouTube-канал
                        </Input>
                    </Grid>
                </Grid.Container>
            )
        case "tags":
            return (
                <StyledTags>
                    {data && data.map((tag: string) => (
                        <StyledTag key={tag}>
                            <Text mr={0.5} b key={tag}>{tag} </Text>
                            <Trash cursor={'pointer'} onClick={() => handleUpdateState('tags', tag)} size={15}/>
                        </StyledTag>
                    ))}
                    {data.length !== 5 && (
                        <Input
                            onIconClick={() => {
                                handleUpdateState('tags', tagInput.toLowerCase())
                                setTagInput('');
                            }}
                            value={tagInput}
                            iconClickable
                            iconRight={<PlusCircle/>}
                            placeholder="Название тега"
                            onChange={e => setTagInput(e.target.value)}
                        />
                    )}
                </StyledTags>
            )
        case "lessons":
            return (
                data && data.length > 0
                    ? data.map((lesson: any) =>
                    <StyledLessonItem key={lesson.lessonId}>
                        &#8226; {lesson.name}
                    </StyledLessonItem>
                )
                    : <Note style={{display: 'flex', justifyContent: 'space-between'}} type="warning" label={false}>
                        В курсе пока что нет ни одного урока.
                        <Button auto type="warning" children="Добавить" scale={1 / 3}/>
                    </Note>
            )
        case "description":
            return (
                <Input.Textarea
                    resize={"vertical"}
                    width={"100%"}
                    onChange={(e) => handleUpdateState(courseKey, e.target.value)}
                    value={data}
                />
            )
        default:
            return (
                <Input
                    width={"100%"}
                    onChange={(e) => handleUpdateState(courseKey, e.target.value)}
                    value={data}
                />
            )
    }
};

const StyledLessonItem = styled.div`
  padding: 5px;
  border-radius: 5px;
  transition: ease-in-out 0.2s;
  margin-bottom: 5px;
`


const StyledTags = styled.div`
  flex-direction: row;
  display: flex;
  grid-gap: 5px;
`

const StyledTag = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px;
`

export default SwitchBlockContent;