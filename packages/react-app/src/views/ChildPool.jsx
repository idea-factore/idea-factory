import React, { useState, useEffect } from "react";
import { Button, List, Divider, Input, Card, Layout, Menu, PageHeader, Modal, Form, Tag } from "antd";
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

export default function ChildPools({purpose, events, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts, poolCoordinator}) {
    const { address } = useParams();
    const { Header, Content, Footer, Sider } = Layout;
    const [visible, setVisible] = useState(false);
    const [childPools, setChildPool] = useState([]);
    const [category, setCategory] = useState({});

    const createdChildPool = useEventListener(readContracts, "PoolCoordinator", "createdChildPool", localProvider, 1);
    useEffect(() => {
      const data = poolCoordinator.getPoolData(address).then(data =>{ return {...data}});
      Promise.resolve(data).then(result => {
        console.log("Got data ", result)
        setCategory(result);
      })
    }, [])
    useEffect(() => {
        poolCoordinator.getChildPools(address).then(res => {
          const data = res.map(pool => {
            return poolCoordinator.getChildPoolData(pool.child).then(data =>{ return {...data}});
          });
          Promise.allSettled(data).then((result) => {
            console.log("Got result ", result);
            setChildPool(result);
        });
        })
      }, [createdChildPool]);
    const createChildPool = (values) => {
        poolCoordinator.connect(userProvider.getSigner()).createChildPool(values.name, values.description, address); 
        setVisible(false);
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
                onBack={() => window.history.back()}
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
                tags={ category.name !== undefined && 
                      
                    <Tag color="blue">Category: {parseBytes32String(category.name)}</Tag>
                }
            />
            <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={childPools}
            renderItem={item => (
                <List.Item>
                    <Card >
                      <Card.Meta
                        title={item.value.name}
                        description={item.value.description}
                      />
                       <p>{`${item.value.name} has ${item.value.ideas.length} ideas`}</p>
                    </Card>
                </List.Item>
            )}
            />
      </Content>
    </Layout>
  </Layout>
    )
}