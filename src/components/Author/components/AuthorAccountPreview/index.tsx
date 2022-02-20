import {Link, User} from '@geist-ui/core';
import React, {FC, Suspense} from 'react';
import {snipText} from '../../../../services/helpers';
import SnipText from '../../../shared/SnipText';
import {useRecoilValue} from "recoil";
import {authorAccountQuery} from "./selectors";

interface AAPProps {
    ownerId: string
    accountId: string
    snipLength?: number;
    disableLink?: boolean;
    updateAt?: number;
}

const AuthorAccountPreview: FC<AAPProps> = (props) => {
    const {ownerId, accountId, disableLink, snipLength} = props;

    const AccountPreview = () => {
        const account = useRecoilValue(authorAccountQuery(`${ownerId}&${accountId}`))

        return (
            <Link onClick={e => disableLink && e.preventDefault()} href={account?.channelLink} target="_blank">
                <User src={account?.photoLink} name={snipText(account?.name, 10)}>
                    {account?.knowledge && <SnipText length={snipLength} text={account?.knowledge}/>}
                </User>
            </Link>
        )
    }

    return (
        <Suspense fallback={<span>downloading...</span>}>
            <AccountPreview/>
        </Suspense>
    );
};

export default AuthorAccountPreview;
