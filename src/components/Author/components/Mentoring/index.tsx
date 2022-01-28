import React from 'react';
import {Button, Spacer, Text} from "@geist-ui/core";

const Mentoring = () => {
    return (
        <div>
            <Text>
                Ментроство — один из самых удобных и эффективных способов
                делиться знаниями, классный способ помочь другим, заинтересованным в развитии людям,
                а также способ самому вырасти, так как процесс передачи знаний, ничто иное, как рост!
            </Text>
            <Spacer h={3}/>
            <Text h5>Вы можете стать ментром, если:</Text>
            <ul>
                <li>опыт работы в сфере от 2 лет</li>
                <li>уровень знаний Senior или уверенный Middle</li>
            </ul>
            <Spacer h={3}/>
            <Button type={"secondary"}>Стать ментором</Button>
        </div>
    );
};

export default Mentoring;