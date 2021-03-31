import React, { useState, useEffect } from "react";
import { Button, List, Card, Layout, PageHeader, Form, Statistic, InputNumber } from "antd";
import { BigNumber } from "@ethersproject/bignumber";
import { useParams } from "react-router-dom";
//Move these contract calls to effector and make it a Effect or an Event
export default function Ideas({userProvider, poolCoordinator, ideaFactory, userAddress }) {
    const { address } = useParams();
    const { Header, Content, Footer, Sider } = Layout;
    const [ideas, setIdea] = useState([]);
    const [event, setEvent] = useState({});

    const listener= (event) => {
        console.log("Event happened: ", event)
        setEvent(event);
      }
      poolCoordinator.on("stakedToIdea", listener);

    //const createdChildPool = useEventListener(readContracts, "PoolCoordinator", "createdChildPool", localProvider, 1);
    useEffect(() => {
        //TODO this is inefficient, we should only fetch the ideas here
        const data = poolCoordinator.getChildPoolData(address).then(data =>{ return {...data}});
          Promise.resolve(data).then((result) => {
            //setIdea(result.ideas);
            const ideas = result.ideas.map(id => {
                const values = [id, ideaFactory.getName(id), ideaFactory.getVotes(id)];
                return Promise.allSettled(values).then(value => {
                    console.log(value)
                    return {
                        id: value[0],
                        name: value[1],
                        votes: value[2]
                    }
                });
            });
            Promise.allSettled(ideas).then((res) => {
                console.log("Got result ", res);
                setIdea(res)
            })
        });
      }, [event]);
      const voteOnIdea = (values) => {
          console.log("Voting on idea: ", values);
          console.log(values.id);
        poolCoordinator.connect(userProvider.getSigner()).stakeToIdea(address, BigNumber.from(values.votes), userAddress, values.id);
    }
    const form = (id) => {
    return (<Form
      name="basic"
      onFinish={(values) => {voteOnIdea(values)}}
      onFinishFailed={() => {}}
    >
      <Form.Item
        name="id"
        hidden={true}
        initialValue={id}
      />
      <Form.Item
        label="Votes"
        name="votes"
      >
        <InputNumber min={0.1} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Vote
        </Button>
      </Form.Item>
    </Form>)};
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
                      title={item.value.name.value}
                      actions={[
                          form(item.value.id.value.toNumber())
                      ]}
                    >
                        <Statistic title="Total Votes" value={item.value.votes.value.toNumber()} />
                    </Card>
                </List.Item>
            )}
            />
      </Content>
    </Layout>
    )
}