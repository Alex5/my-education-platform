import {Card, Loading, Select, Spacer, User} from '@geist-ui/core';
import React, {useEffect, useState} from 'react';
import {IAccount} from "../../../../redux/slices/authorSlice/author.types";
import {useDispatch, useSelector} from "react-redux";
import {
    setAccounts,
    setSelectedAccount,
    getAccounts,
    getSelectedAccount
} from '../../../../redux/slices/authorSlice/author.slice';
import {AuthorRequests} from "../../../../api/authorRequests";

const AuthorAccountsSelect = () => {
    const accounts = useSelector(getAccounts);
    const selectedAccount = useSelector(getSelectedAccount);

    const [accountsLoad, setAccountsLoad] = useState<boolean>(false);

    const dispatch = useDispatch();

    const handleSetAccount = (account: string | string[]) => {
        if (typeof account === "string") {
            const parsedAccount: IAccount = JSON.parse(account);
            dispatch(setSelectedAccount(parsedAccount));
        }
    }

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
            <Select placeholder="Выберите аккаунт для привязки"
                    onChange={handleSetAccount}>
                {accountsLoad
                    ? <Loading/>
                    : accounts && accounts.map(account => (
                    <Select.Option value={JSON.stringify(account)}>{account.name}</Select.Option>
                ))}
            </Select>
            {Object.keys(selectedAccount).length > 0 && (
                <>
                    <Spacer/>
                    <Card>
                        <Card.Content padding={0.5}>
                            <User src={selectedAccount.photoLink} name={selectedAccount.name}>
                                {selectedAccount.knowledge}
                            </User>
                        </Card.Content>
                    </Card>
                </>
            )}

        </>

    );
};

export default AuthorAccountsSelect;