declare var window: any;
import React from 'react'
import { Flex, Heading, SimpleGrid, Spacer, useDisclosure } from '@chakra-ui/react'
import { ConnectWallet, SuccessModal, WalletInfo } from '../../components'
import { IPackage, IRate, IWalletInfo, TOKEN } from '../../_types_'
import { ethers } from 'ethers';
import { packages } from '../../constants';
import InvestCard from './components/InvestCard';
import CrowSaleContract from '../../contracts/CrowdSaleContract';
import UsdtContract from '../../contracts/UsdtContract';

const InvestView = () => {
    const [wallet, setWallet] = React.useState<IWalletInfo>()
    const [rate, setRate] = React.useState<IRate>({ bnbRate: 0, usdtRate: 0 });
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    const [pak, setPak] = React.useState<IPackage>();
    const [txHash, setTxHash] = React.useState<string>();
    const { isOpen, onClose, onOpen } = useDisclosure();
    //tao hook de luu tru provider hien tai
    const [web3Provider, setWeb3Provider] = React.useState<ethers.providers.Web3Provider>();
    const getRate = React.useCallback(async () => {
        const crowdContract = new CrowSaleContract()
        const bnbRate = await crowdContract.getBnbRate()
        const usdtRate = await crowdContract.getUsdtRate()
        setRate({ bnbRate, usdtRate })
    }, [])
    React.useEffect(() => {
        getRate()
    }, [getRate])
    const onConnectMetamask = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, undefined)
            //đợi usẻ connect wallet và lấy thôing tin ví
            await provider.send("eth_requestAccounts", [])
            //lấy ra ví mà user đã sign để cọnnect wallet với UI
            const signer = provider.getSigner()
            const address = await signer.getAddress();
            const bigBalance = await signer.getBalance();
            const bnbBalance = Number.parseFloat(
                ethers.utils.formatEther(bigBalance)
            );
            setWallet({ address, bnb: bnbBalance });
            setWeb3Provider(provider);
        }
    }
    const handleBuyIco = async (pk: IPackage) => {
        if (!web3Provider) return;
        setPak(pk);
        setIsProcessing(true);
        let hash = '';
        const crowdContract = new CrowSaleContract(web3Provider);
        if (pk.token === TOKEN.USDT) {
            const usdtContract = new UsdtContract(web3Provider);
            await usdtContract.approve(crowdContract._contractAddress, pk.amount / rate.bnbRate);
            hash = await crowdContract.buyTokenByUSDT(pk.amount);
        } else {
            hash = await crowdContract.buyTokenByBNB(pk.amount);
        }
        setTxHash(hash);
        onOpen();
        try {

        } catch (er: any) {

        }
        setPak(undefined);
        setIsProcessing(false);
    }
    return (
        <Flex
            w={{ base: "full", lg: "70%" }}
            flexDirection="column"
            margin="50px auto"

        >
            <Flex>
                <Heading size="lg" fontWeight="bold">
                    Blockchain trainew
                </Heading>
                <Spacer />
                {!wallet && <ConnectWallet onClick={onConnectMetamask} />}
                {wallet && <WalletInfo
                    address={wallet?.address}
                    amount={wallet?.bnb || 0}
                />}
            </Flex>
            <SimpleGrid columns={{ base: 1, lg: 3 }} mt="50px" spacingY="30px">
                {packages.map((pk, index) => (
                    <InvestCard
                        pak={pk}
                        key={String(index)}
                        isBuying={isProcessing && pak?.key === pk.key}
                        rate={pk.token === TOKEN.BNB ? rate.bnbRate : rate.usdtRate}
                        walletInfo={wallet}
                        onBuy={() => handleBuyIco(pk)}
                    />
                ))}
            </SimpleGrid>

            <SuccessModal
                isOpen={isOpen}
                onClose={onClose}
                hash={txHash}
                title="BUY ICO"
            />
        </Flex>
    )
}

export default InvestView