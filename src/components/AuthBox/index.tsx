import {useMetaMask} from "metamask-react";
import {Button} from "@geist-ui/core";

const AuthBox = () => {
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>

    if (status === "unavailable") return <div>MetaMask not available :(</div>

    if (status === "notConnected") return <Button onClick={connect}>Connect to MetaMask</Button>

    if (status === "connecting") return <div>Connecting...</div>

    if (status === "connected") return <div>{account}</div>

    return null;
};

export default AuthBox;