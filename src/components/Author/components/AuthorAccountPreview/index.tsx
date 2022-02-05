import { Card, Link, User } from '@geist-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { PublicRequests } from '../../../../api/publicRequests';
import { IAccount } from '../../../../redux/slices/authorSlice/author.types';
import SnipText from '../../../shared/SnipText';

interface AuthorAccountPreviewProps {
    ownerId: string
    accountId: string
    snipLength?: number;
    disableLink?: boolean;
}

const AuthorAccountPreview: FC<AuthorAccountPreviewProps> = ({ ownerId, accountId, snipLength, disableLink }) => {
    const [account, setAccount] = useState<IAccount>({} as IAccount);

    useEffect(() => {
        (async () => {
            const account = await PublicRequests.getAuthorAccount(ownerId, accountId);
            setAccount(account);
        })()
    }, []);


    return (
        <Link onClick={e => disableLink && e.preventDefault()} href={account?.channelLink} target="_blank">
            <User src={account?.photoLink} name={account?.name}>
                <SnipText length={snipLength} text={account?.knowledge} />
            </User>
        </Link>

    )
};

export default AuthorAccountPreview;
