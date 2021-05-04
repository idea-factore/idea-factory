import React, { useState } from "react";
import { Button, Input, Modal, Form } from "antd";
import Address from "./Address";
import TokenBalance from "./TokenBalance";
import { useExternalContractLoader } from "../hooks";
import { parseUnits } from "@ethersproject/units";
import { TOKEN_ABI } from "../constants";

//rework this completely most likely.
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Add Tokens"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="collateral"
          label="Collateral"
        >
          <Input />
        </Form.Item>
        <Form.Item name="tokens" label="Tokens">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
//should just have wallet connect buttons that show current balance of VOTE
export default function Account({
  address,
  userProvider,
  localProvider,
  mainnetProvider,
  wallet,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  voteToken,
  isMenu
}) {
  const blockNumber = wallet.getBlockNumber()
  const [visible, setVisible] = useState(false);
  const modalButtons = [];
  const tokenKovan = useExternalContractLoader(localProvider, "0xF792BcAa0c7cfFac6BDcBC5C647Ffe91758283FA", TOKEN_ABI);
  const createTokens = (values) => {
    console.log("Got values", values);
    const data = {
      collateral: [ `${parseUnits(values.collateral, "gwei")}`],
      tokens: [ `${parseUnits(values.tokens, "ether")}`]
    };
    console.log("Data: ", data);
    voteToken.connect(userProvider.getSigner()).create(data.collateral, data.tokens);
  }
  const display = minimized ? (
    ""
  ) : (
    <span>
      <TokenBalance address={address} contract={tokenKovan} />
      {wallet.status === 'connected' ? (
        <div>
          <div>Account: {wallet.account}</div>
          <div>Balance: {wallet.balance}</div>
          <button onClick={() => wallet.reset()}>disconnect</button>
        </div>
      ) : (
        <div>
          Connect:
          <button onClick={() => wallet.connect()}>MetaMask</button>
          {
          /**
          <button onClick={() => wallet.connect('frame')}>Frame</button>
          <button onClick={() => wallet.connect('portis')}>Portis</button>
          */
          }
        </div>
      )}
    </span>
  );

  return (
    <div>
      {display}
    </div>
  );
}
