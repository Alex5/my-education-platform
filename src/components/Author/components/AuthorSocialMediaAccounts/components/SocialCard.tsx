import {Button, Card, Image, Link, Spacer, Text} from '@geist-ui/core'
import {Github} from '@geist-ui/react-icons'
import React, {FC, useEffect, useState} from 'react'
import styled from 'styled-components';
import {ISocialInfo} from '..';
import {getSocialInfo} from '../../../../../services/helpers';
import SnipText from '../../../../shared/SnipText';

interface ISocialCardProps {
    id: string
    name: string
    icon: string
    deleteSocial: (id: string) => void
    link: string
}

const SocialCard: FC<ISocialCardProps> = ({id, name, icon, deleteSocial, link}) => {
    return (
        <Card width={'100%'} hoverable>
            <Card.Content padding={0.5}>
                <StyledSocialCard>
                    <StyledSocialImage style={{backgroundImage: `url(${icon})`}}/>
                    <StyledSocialCardContent>
                        <SnipText length={20} h5 text={name}/>
                        <Link href={link} children={<SnipText text={link}/>}/>
                    </StyledSocialCardContent>
                </StyledSocialCard>
                <Spacer/>
                <Button onClick={() => deleteSocial(id)} scale={0.3} w={'100%'} ghost type='error'
                        children={'удалить'}/>
            </Card.Content>
        </Card>

    )
}

const StyledSocialCard = styled.div`
  display: flex;
  align-items: center;
`

const StyledSocialImage = styled.div`
  margin-right: 10px;
  height: 38px;
  width: 38px;
  background-repeat: no-repeat;
  background-size: cover;
`

const StyledSocialCardContent = styled.div`
  display: flex;
  flex-direction: column;
`

export default SocialCard