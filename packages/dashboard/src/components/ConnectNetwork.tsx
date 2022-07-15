import Card from './common/Card';
import Button from './common/Button';
import NetworkIndicator from './common/NetworkIndicator';
import { useConnect, useNetwork } from 'wagmi';

interface Props {
  confirm: () => void;
}

function ConnectNetwork({ confirm }: Props) {
  const [{ data: connectData }, connect] = useConnect();
  const [{ data: networkData }] = useNetwork();

  const chainId = networkData.chain?.id;
  const connectBody =
    'Please connect your wallet to use the Walletbus Dashboard Provider.';

  const connectButton = (
    <div>
      {connectData.connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => connect(connector)}
          text={connector.name}
        />
      ))}
    </div>
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
