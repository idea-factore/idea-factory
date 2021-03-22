import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, List, Input, Card, Layout, Menu, PageHeader, Modal, Form, Tag, Dropdown, InputNumber } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import { parseBytes32String } from "@ethersproject/strings";
import { useParams } from "react-router-dom";
//TODO: Move this into component
const PoolCreateForm = ({ visible, onCreate, onCancel }) => {
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
  const IdeaCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Create a new Idea"
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
                message: 'Please add a name for the idea',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input type="textarea" />
          </Form.Item>
          <Form.Item 
            name="stake" 
            label="VOTE tokens"
            rules={[
              {
                required: true,
                message: 'You must submit vote tokens in order to create an idea'
              }
            ]}
          >
            <InputNumber min={0.001} />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

export default function ChildPools({purpose, events, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts, poolCoordinator, ideaFactory }) {
    const { address } = useParams();
    const { Header, Content, Footer, Sider } = Layout;
    const [visible, setVisible] = useState(false);
    const [visibleIdea, setVisibleIdea] = useState(false);
    const [childPools, setChildPool] = useState([]);
    const [category, setCategory] = useState({});
    const [event, setEvent]=useState({});
    const [currentPool, setCurrentPool] = useState()


    const menu = (child) => {
      return (<Menu>
        <Menu.Item key="1">
          <Link to={`/ideas/${child}`} key="view">
            <Button>View Ideas</Button>                   
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Button onClick={() => {setVisibleIdea(true); setCurrentPool(child);}}>Add Idea</Button>
        </Menu.Item>
      </Menu>
    )};
    const listener= (event) => {
      console.log("Event happened: ", event)
      setEvent(event);
    }
    poolCoordinator.on("createdChildPool", listener);
    poolCoordinator.on("addedIdeaToChild", listener);
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
      }, [event]);
    const createChildPool = (values) => {
        poolCoordinator.connect(userProvider.getSigner()).createChildPool(values.name, values.description, address); 
        setVisible(false);
    }

    const createdIdea = (values) => {
      console.log("Created idea with ", values);
      const result = ideaFactory.connect(userProvider.getSigner()).mintIdea(values.name, values.description, values.stake).then(res => {
        res.wait(1).then(res2 => {
          ideaFactory.queryFilter("mintedIdea", res2.blockHash).then(idea => {
            console.log("Got idea ", idea[0].args.id.toNumber());
            poolCoordinator.connect(userProvider.getSigner()).addIdeaToChild(currentPool, idea[0].args.id.toNumber());
          })
        })
      });
      //call PoolCoordinator to mint idea and pass in the amount of vote tokens
      //this will deposit vote tokens to pool coordinator from the current user
      //this will mint a new idea, and add that amount of votes to the idea
      //this will set the inital value of an idea. For now, we will just pretend that 1 VOTE==1 dollar
      setVisibleIdea(false);
    }

    //todo Change popover to dropdown and add notifications on success or failure
    //implement idea view page and idea add
    return (
        <Layout>
        <PoolCreateForm
            visible={visible}
            onCreate={createChildPool}
            onCancel={() => {
            setVisible(false);
            }}
        />
        <IdeaCreateForm
            visible={visibleIdea}
            onCreate={createdIdea}
            onCancel={() => {
            setVisibleIdea(false);
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
                    <Card
                      extra={
                        <Dropdown.Button icon={<EllipsisOutlined />} overlay={menu(item.value.child)} trigger={["click"]}/>
                      }
                      title={item.value.name}
                    >
                      <Card.Meta
                        title={item.value.description}
                        description={`${item.value.name} has ${item.value.ideas.length} ideas`}
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