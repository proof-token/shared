import Chain from './Chain';
import ChainOptions from './ChainOptions';
import Group from './Group';
import Max from './Max';
import Token from './Token';
import Uri from './Uri';
declare type Contract = {
    id?: string;
    name: string;
    symbol: string;
    userId: string;
    uriId: Uri['id'];
    groupId: Group['id'];
    tokenIds?: Set<Token['id']>;
    max: Max;
    chains: {
        [Chain.ETHEREUM_MAINNET]?: ChainOptions;
        [Chain.ETHEREUM_RINKBY]?: ChainOptions;
        [Chain.ETHEREUM_GOERLI]?: ChainOptions;
        [Chain.ETHEREUM_SEPOLIA]?: ChainOptions;
    };
    archived?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};
export default Contract;
