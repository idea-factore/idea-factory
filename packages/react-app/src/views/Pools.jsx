import React, { useState, useEffect } from "react";
import { Button, List, Divider, Input, Card, Layout, Menu, PageHeader, Modal, Form } from "antd";
import { SyncOutlined } from '@ant-design/icons';
import { Address, Balance } from "../components";
import { parseEther, formatEther } from "@ethersproject/units";
import { parseBytes32String, formatBytes32String} from "@ethersproject/strings";

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
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please add a name for the category',
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
export default function Pools({purpose, events, address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts, poolCoordinator }) {
    const { Header, Content, Footer, Sider } = Layout;
    const [pools, setPools] = useState([]); 
    const [visible, setVisible] = useState(false);

    const getPools = () => {readContracts.PoolCoordinator.getPools().then(res => {
        const data = res.map(pool => {
            return readContracts.PoolCoordinator.getPoolData(pool.pool).then(data =>{ return {...data}});
        });
        Promise.allSettled(data).then((result) => {
            console.log("Got result ", result);
            setPools(result);
            console.log("set pools");
            console.log(pools);
        });
    })};
    useEffect(() => {
        getPools();
    }, [events]);
    const createPool = (values) => {
        console.log('Received values of form: ', values);
        setVisible(false);
        readContracts.PoolCoordinator.createPool(formatBytes32String(values.name), formatBytes32String(values.description));
    }
    //Add card for pool showing the amount of VOTE staked in the pool. When a Card is clicked take them to child pool page
    return(
        <Layout>
            <CollectionCreateForm
                visible={visible}
                onCreate={createPool}
                onCancel={() => {
                setVisible(false);
                }}
            />
        <Layout>
          <Content>
                <PageHeader
                    onBack={() => null}
                    title="Categories"
                    subTitle={
                        <Button 
                            type="primary"
                            onClick={() => {
                                setVisible(true); 
                            }}
                        >
                          New Category
                        </Button>
                    }
                />
                <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={pools}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={parseBytes32String(item.value.name)}
                        description={parseBytes32String(item.value.description)}
                        />
                    </List.Item>
                )}
                />
          </Content>
        </Layout>
      </Layout>

    )

}
