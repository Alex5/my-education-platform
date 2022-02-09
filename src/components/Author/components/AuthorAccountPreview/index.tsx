import { Card, Link, User } from '@geist-ui/core';
import { Timestamp } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { PublicRequests } from '../../../../api/publicRequests';
import { IAccount } from '../../../../redux/slices/authorSlice/author.types';
import { snipText } from '../../../../services/helpers';
import SnipText from '../../../shared/SnipText';

interface AuthorAccountPreviewProps {
    ownerId: string
    accountId: string
    snipLength?: number;
    disableLink?: boolean;
    updateAt?: number;
}

const AuthorAccountPreview: FC<AuthorAccountPreviewProps> = ({ ownerId, accountId, snipLength, disableLink, updateAt }) => {
    const [account, setAccount] = useState<IAccount>({} as IAccount);

    useEffect(() => {
        (async () => {
            const account = await PublicRequests.getAuthorAccount(ownerId, accountId);
            setAccount(account);
        })()
    }, [accountId, updateAt]);

    return (
        <Link onClick={e => disableLink && e.preventDefault()} href={account?.channelLink} target="_blank">
            <User src={account?.photoLink} name={snipText(account?.name, 10)}>
                <SnipText length={snipLength} text={account?.knowledge} />
            </User>
        </Link>

    )
};

export default AuthorAccountPreview;
