import React from 'react'
import {Button, ButtonProps} from '@chakra-ui/react'

interface IProps extends ButtonProps {}
const ConnectWallet = ({...props}: IProps) => {
    return <Button variant="primary" {...props}>Connect Wallet</Button>
}

export default ConnectWallet