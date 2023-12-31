export type AddressType = {
    97: string;
    56: string;
}

export enum CHAIN_ID {
    TESTNET = 97,
    MAINNET = 56
}

export default function getChainIdFromEnv(): number {
    const env = process.env.NEXT_PUBLIC_CHAIN_ID
    if(!env) {return 97}
    return parseInt(env)
}

export const getRPC = () => {
    if(getChainIdFromEnv() === CHAIN_ID.MAINNET)
        return process.env.NEXT_PUBLIC_RPC_MAINNET
    return process.env.NEXT_PUBLIC_RPC_TESTNET
}

export const SMART_ADDRESS = {
    CROWD_SALE: {97: '0xdF0EeEAee663DB46a4AECbde79A4273EFd66B4C9', 56: ''},
    USDT: {97: '0x897F38F7168a5EfB76b912913c0634F9664838Bb', 56: ''}
}