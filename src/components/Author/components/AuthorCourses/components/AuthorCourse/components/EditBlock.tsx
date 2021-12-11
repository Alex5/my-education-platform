import React, {FC} from 'react';
import {Button, Collapse, Fieldset, Image, Input, Spacer, Text} from "@geist-ui/react";
import {IAuthor, IKey} from "../../../../../../../redux/types";

interface EditBlockProps {
    name: string;
    handleUpdate: (key: IKey, data: any) => (() => void);
    handleUpdateState: (key: IKey, targetValue: any) => void
    loading?: boolean;
    data: any;
    courseKey: IKey;
}

const EditBlock: FC<EditBlockProps> = (
    {
        name,
        handleUpdate,
        handleUpdateState,
        loading,
        data,
        courseKey
    }) => {

    return (
        <>
            <Fieldset>
                <Fieldset.Title>{name}</Fieldset.Title>
                <Fieldset.Subtitle>
                    <Spacer/>
                    <Input
                        width={"100%"}
                        onChange={(e) => handleUpdateState(courseKey, e.target.value)}
                        value={data}/>
                </Fieldset.Subtitle>
                <Fieldset.Footer>
                    <span>Сохранить изменения</span>
                    <Button loading={loading} onClick={handleUpdate(courseKey, data)} auto
                            scale={1 / 3}>Сохранить</Button>
                </Fieldset.Footer>
                {courseKey === 'cover' &&
                <Collapse shadow scale={1/2} title={'Предварительный просмотр'}>
                    <Image src={data}/>
                </Collapse>
                }
            </Fieldset>
            <Spacer/>
        </>
    );
};

export default EditBlock;