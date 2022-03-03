import { Loading, Select } from '@geist-ui/core';
import { FC, useEffect, useState } from 'react';
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
    onChange?: () => void;
    type?: string;
}

const AuthorAccountsSelect: FC<AuthorAccountsSelectProps> = (props, { accountId, onChange, type }) => {
    const accounts = useSelector(getAccounts);
    const selectedAccount = useSelector(getSelectedAccount);

    const [accountsLoad, setAccountsLoad] = useState<boolean>(false);

    const dispatch = useDispatch();

    const handleSetAccount = (accountId: string | string[]) => {
        if (typeof accountId === "string") {
            const account = accounts.find(account => account.id === accountId);
            account && dispatch(setSelectedAccount(account))
            onChange && onChange();
        }
    }

    useEffect(() => {
        (async () => {
            setAccountsLoad(true);
            const accounts = await AuthorRequests.getAccounts();
            dispatch(setAccounts(accounts));
            setAccountsLoad(false);
        })()

        return () => {
            dispatch(setSelectedAccount({} as IAccount));
        }
    }, [])

    return (
        <>
            {accountsLoad
                ? <Loading />
                : (
                    <Select
                        {...props}
                        type={type}
                        width={'100%'}
                        onChange={handleSetAccount}
                        placeholder="Выберите аккаунт для привязки"
                        value={selectedAccount ? selectedAccount.id : accountId}
                    >
                        {accounts && accounts.map(account => (
                            <Select.Option key={account.id} value={account.id}>{account.name}</Select.Option>
                        ))}
                    </Select>
                )
            }
        </>
    );
};

export default AuthorAccountsSelect;