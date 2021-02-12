import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, List, Input, Card, Layout, Menu, PageHeader, Modal, Form, notification } from "antd";
import { parseBytes32String, formatBytes32String} from "@ethersproject/strings";
import Meta from "antd/lib/card/Meta";

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
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState({});

    const listener= (event) => {
      setEvent(event);
    }
    poolCoordinator.on("createdPool", listener);
    const getPools = () => {poolCoordinator.getPools().then(res => {
        const data = res.map(pool => {
            return poolCoordinator.getPoolData(pool.pool).then(data =>{ return {...data}});
        });
        Promise.allSettled(data).then((result) => {
            console.log("Got result ", result);
            setPools(result);
        });
    })};
    useEffect(() => {
        console.log(userProvider.getSigner());
        getPools();
        setLoading(false);
    }, [event]);
    const createPool = (values) => {
        console.log('Received values of form: ', values);
        setVisible(false);
        console.log(userProvider.getSigner());
        try { 
        poolCoordinator.connect(userProvider.getSigner()).createPool(formatBytes32String(values.name), formatBytes32String(values.description));
        notification.success({
          message: "Success!",
          description: `The category, ${formatBytes32String(values.name)} was created successfully`
        });
        } catch(e) {
          console.log("oh noes! something broke :(");
          notification.error({
            message: 'Error: Something broke',
            description: `Something went wrong while trying to create the category ${formatBytes32String(values.name)}`
          })
        }
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
                    onBack={() => window.history.back()}
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
                        <Card 
                          loading={loading}
                          actions={[
                            <Link to={`/childpools/${item.value.pool}`} key="view">
                              <Button>View Children</Button>
                            </Link>
                          ]}
                        >
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
