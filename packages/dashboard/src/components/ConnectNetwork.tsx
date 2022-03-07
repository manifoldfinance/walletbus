import { useWeb3React } from "@web3-react/core";
import { providers } from "ethers";
import Card from "./common/Card";
import Button from "./common/Button";
import { InjectedConnector } from "@web3-react/injected-connector";
import NetworkIndicator from "./common/NetworkIndicator";

interface Props {
  confirm: () => void;
}

function ConnectNetwork({ confirm }: Props) {
  const { chainId, activate } = useWeb3React<providers.Web3Provider>();
  const injectedConnector = new InjectedConnector({});

  const connectBody =
    "Please connect your wallet to use the Truffle Dashboard Provider.";

  const connectButton = (
    <Button text="Connect Wallet" onClick={() => activate(injectedConnector)} />
  );

  const confirmBody = chainId && (
    <div className="flex flex-col gap-2">
      <div>
        Please confirm you're connected to the right network (or switch to the
        right one) before continuing.
      </div>
      <div className="flex justify-center">
        <NetworkIndicator chainId={chainId} />
      </div>
    </div>
  );

  const confirmButton = <Button text="Confirm" onClick={confirm} />;

  return (
    <div className="flex justify-center items-center py-20">
      <div className="mx-3 w-3/4 max-w-4xl h-2/3 text-center">
        {chainId === undefined ? (
          <Card
            header="Connect Wallet"
            body={connectBody}
            footer={connectButton}
          />
        ) : (
          <Card
            header="Connect Wallet"
            body={confirmBody}
            footer={confirmButton}
          />
        )}
      </div>
    </div>
  );
}

export default ConnectNetwork;
