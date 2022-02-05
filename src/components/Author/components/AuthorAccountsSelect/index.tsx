import { Card, Loading, Select, Spacer, User } from '@geist-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { IAccount } from "../../../../redux/slices/authorSlice/author.types";
import { useDispatch, useSelector } from "react-redux";
import {
    setAccounts,
    setSelectedAccount,
    getAccounts,
    getSelectedAccount
} from '../../../../redux/slices/authorSlice/author.slice';
import { AuthorRequests } from "../../../../api/authorRequests";

interface AuthorAccountsSelectProps {
    accountId?: string;
    onChange?: () => void
}

const AuthorAccountsSelect: FC<AuthorAccountsSelectProps> = ({ accountId, onChange }) => {
    const accounts = useSelector(getAccounts);
    const selectedAccount = useSelector(getSelectedAccount);

    const [accountsLoad, setAccountsLoad] = useState<boolean>(false);

    const dispatch = useDispatch();

    const handleSetAccount = (accountId: string | string[]) => {
        if (typeof accountId === "string") {
            const account = accounts.find(account => account.id === accountId) || {} as IAccount;
            dispatch(setSelectedAccount(account));
            onChange && onChange();
        }
    }

    const accountExist = accounts.find(account => account.id === accountId);

    useEffect(() => {
        (async () => {
            setAccountsLoad(true);
            const accounts = await AuthorRequests.getAccounts();
            dispatch(setAccounts(accounts));
            setAccountsLoad(false);
        })()
    }, [])

    return (
        <>
            {accountsLoad
                ? <Loading />
                : (
                    <Select
                        onChange={handleSetAccount}
                        placeholder="Выберите аккаунт для привязки"
                        value={accountExist ? accountExist.id : selectedAccount.name}
                    >
                        {accounts && accounts.map(account => (
                            <Select.Option value={account.id}>{account.name}</Select.Option>
                        ))}
                    </Select>
                )
            }
        </>
    );
};

export default AuthorAccountsSelect;