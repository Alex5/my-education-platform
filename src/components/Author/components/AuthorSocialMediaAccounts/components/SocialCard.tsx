import { Card, Link, Spacer } from '@geist-ui/core'
import { Github } from '@geist-ui/react-icons'
import React, { FC } from 'react'

const SocialCard: FC<{ socialLink: string }> = ({ socialLink }) => {
    const socialIcon = () => {
        if (socialLink.includes('github')) {
            return <Github />
        }
    }

    return (
        <Card width={'100%'}>
            <Card.Content style={{ display: 'flex' }}>
                {socialIcon()}
                <Spacer />
                <Link block target={'_blank'} href={socialLink} children='Github' />
            </Card.Content>
        </Card>
    )
}

export default SocialCard