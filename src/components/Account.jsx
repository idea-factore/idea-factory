import React, { useState } from "react";
import { Button, Input, Modal, Form } from "antd";
import Address from "./Address";
import TokenBalance from "./TokenBalance";
import Wallet from "./Wallet";
import { useExternalContractLoader } from "../hooks";
import { parseUnits } from "@ethersproject/units";
import { TOKEN_ABI } from "../constants";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new category"
      okText="Create"
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
export default function Account({
  address,
  userProvider,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  voteToken,
  isMenu
}) {
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
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <Button
          key="logoutbutton"
          style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          onClick={logoutOfWeb3Modal}
        >
          logout
        </Button>,
      );
    } else {
      modalButtons.push(
        <Button
          key="loginbutton"
          style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          /*type={minimized ? "default" : "primary"}     too many people just defaulting to MM and having a bad time*/
          onClick={loadWeb3Modal}
        >
          connect
        </Button>,
      );
    }
  }

  const display = minimized ? (
    ""
  ) : (
    <span>
      {address ? <Address value={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} /> : "Connecting..."}
      <TokenBalance address={address} contract={tokenKovan} />
      <Wallet address={address} provider={userProvider} ensProvider={mainnetProvider} price={price} />
    </span>
  );

  return (
    <div>
      {isMenu && 
      <span>
      <CollectionCreateForm
                visible={visible}
                onCreate={createTokens}
                onCancel={() => {
                setVisible(false);
                }}
      />
      <Button
        key="addVoteButton"
        style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
        shape="round"
        size="large"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add VOTE tokens
      </Button>
      </span>}
      {display}
      {modalButtons}
    </div>
  );
}
