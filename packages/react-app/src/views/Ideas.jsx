import React, { useState, useEffect } from "react";
import { Button, List, Divider, Input, Card, Layout, Menu, PageHeader, Modal, Form, Tag, Dropdown } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import { Address, Balance } from "../components";
import { parseEther, formatEther } from "@ethersproject/units";
import { parseBytes32String, formatBytes32String} from "@ethersproject/strings";
import { useParams } from "react-router-dom";
import { useEventListener } from "../hooks";

export default function Ideas({purpose, events, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts, poolCoordinator, ideaFactory}) {
    const { address } = useParams();
    const { Header, Content, Footer, Sider } = Layout;
    const [ideas, setIdea] = useState([]);
    const [category, setCategory] = useState({});

    //const createdChildPool = useEventListener(readContracts, "PoolCoordinator", "createdChildPool", localProvider, 1);
    useEffect(() => {
        //TODO this is inefficient, we should only fetch the ideas here
        const data = poolCoordinator.getChildPoolData(address).then(data =>{ return {...data}});
          Promise.resolve(data).then((result) => {
            console.log("Got result ", result.ideas);
            //setIdea(result.ideas);
        });
      }, []);

    //add input to vote on an idea
    //voting on an idea will deposit VOTE to PoolCoordinator and mint x amount of IDEAn tokens, based on the current value of the IDEA and the amount of vote you staked
    //For example, if the worth of an idea is 2 dollars, if you stake 2 vote, you will get 2 IDEAn tokens, and the worth of idea will increase to 4.
    // But really, we should say If you stake 2 vote, you get 0.5 IDEAn because the new worth is now 4.
    return (
    <Layout>
      <Content>
            <PageHeader
                onBack={() => window.history.back()}
                title="Ideas"
            />
            <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={ideas}
            renderItem={item => (
                <List.Item>
                    <Card
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
    )
}