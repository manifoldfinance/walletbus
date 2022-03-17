import { getLibrary } from './utils/utils';
import { Web3ReactProvider } from '@web3-react/core';
import Dashboard from './Dashboard';
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import "@fontsource/inter";

function App() {
const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
 <ChakraProvider>
      <Layout>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </Layout>
      <Dashboard />
      </ChakraProvider>
    </Web3ReactProvider>
  );
}

export default App;
