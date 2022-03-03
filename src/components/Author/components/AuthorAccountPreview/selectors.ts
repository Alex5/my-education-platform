import {selectorFamily} from "recoil";
import {PublicRequests} from "../../../../api/publicRequests";

interface authorAccountQueryParams {
    name: string
}

export const authorAccountQuery = selectorFamily({
    key: 'authorAccountQuery',
    get: (params: string) => async () => {
        const [ownerId, accountId] = params.split("&");
        return await PublicRequests.getAuthorAccount(ownerId, accountId);
    }
})