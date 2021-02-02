import React, { useState, useEffect } from "react";
import { Button, List, Divider, Input, Card, Layout, Menu, PageHeader, Modal, Form } from "antd";
import { SyncOutlined } from '@ant-design/icons';
import { Address, Balance } from "../components";
import { parseEther, formatEther } from "@ethersproject/units";
import { parseBytes32String, formatBytes32String} from "@ethersproject/strings";
import { useParams } from "react-router-dom";
import { useEventListener } from "../hooks";
//TODO: Move this into component
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Create a new child pool"
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
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please add a name for the pool',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input type="textarea" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

export default function ChildPools({purpose, events, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts, poolCoordinator }) {
    const { address } = useParams();
    const { Header, Content, Footer, Sider } = Layout;
    const [visible, setVisible] = useState(false);
    const [childPools, setChildPool] = useState([]);

    const createdChildPool = useEventListener(readContracts, "PoolCoordinator", "createdChildPool", localProvider, 1);
    useEffect(() => {
        readContracts.PoolCoordinator.getChildPools(address).then(res => {
            console.log("Got child pools: ", res);
        })
    }, [createdChildPool]);
    const createChildPool = (values) => {
        readContracts.PoolCoordinator.createChildPool(values.name, values.description, address); 
    }
    return (
        <Layout>
        <CollectionCreateForm
            visible={visible}
            onCreate={createChildPool}
            onCancel={() => {
            setVisible(false);
            }}
        />
    <Layout>
      <Content>
            <PageHeader
                onBack={() => null}
                title="Child Pools"
                subTitle={
                    <Button 
                        type="primary"
                        onClick={() => {
                            setVisible(true); 
                        }}
                    >
                      New Child Pool
                    </Button>
                }
            />
            <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={childPools}
            renderItem={item => (
                <List.Item>
                    <Card >
                      <Meta
                        title={parseBytes32String(item.value.name)}
                        description={parseBytes32String(item.value.description)}
                      />
                    </Card>
                </List.Item>
            )}
            />
      </Content>
    </Layout>
  </Layout>
    )
}