import { FC, useState } from 'react';
import { Button, Card, CssBaseline, Grid, Input, Note, Text } from "@geist-ui/core";
import { ICourse } from "../../../../../../../redux/slices/coursesSlice/types";
import styled from "styled-components";
import { PlusCircle, Trash } from "@geist-ui/react-icons";
import AuthorAccountsSelect from '../../../../AuthorAccountsSelect';
import { useSelector } from 'react-redux';
import { getSelectedAccount } from '../../../../../../../redux/slices/authorSlice/author.slice';
import AuthorAccountPreview from '../../../../AuthorAccountPreview';
import { getFirebaseUser } from '../../../../../../../redux/slices/userSlice/userSlice';
import AuthorSocialMediaAccounts from '../../../../AuthorSocialMediaAccounts';


interface Props {
    handleUpdateState: (key: keyof ICourse, targetValue: any) => void
    data: any;
    courseKey: keyof ICourse;
}


const SwitchBlockContent: FC<Props> = ({ courseKey, data, handleUpdateState }) => {
    const [tagInput, setTagInput] = useState('');
    const { id } = useSelector(getSelectedAccount);
    const user = useSelector(getFirebaseUser);

    switch (courseKey) {
        case "accountId":
            return (
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <AuthorAccountPreview ownerId={user?.uid || ''} accountId={id || data} />
                    <AuthorAccountsSelect accountId={id || data} onChange={() => handleUpdateState('accountId', id)} />
                </div>
            )
        case "tags":
            return (
                <StyledTags>
                    {data && data.map((tag: string) => (
                        <Card key={tag}>
                            <Card.Content style={{ display: "flex", alignItems: "center" }} padding={0.3}>
                                <Text mr={0.5} b key={tag}>{tag}</Text>
                                <Trash cursor={'pointer'} onClick={() => handleUpdateState('tags', tag)} size={15} />
                            </Card.Content>
                        </Card>
                    ))}
                    {data?.length !== 5 && (
                        <Input
                            onIconClick={() => {
                                handleUpdateState('tags', tagInput.toLowerCase())
                                setTagInput('');
                            }}
                            value={tagInput}
                            iconClickable
                            iconRight={<PlusCircle />}
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
                    : <Note style={{ display: 'flex', justifyContent: 'space-between' }} type="warning" label={false}>
                        В курсе пока что нет ни одного урока.
                        <Button auto type="warning" children="Добавить" scale={1 / 3} />
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
        case "socialAccounts":
            return (
                <AuthorSocialMediaAccounts existSocials={data} handleUpdateState={handleUpdateState}/>
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

export default SwitchBlockContent;