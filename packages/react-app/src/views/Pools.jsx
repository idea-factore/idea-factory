import React, { useState, useEffect } from "react";
import { Button, List, Divider, Input, Card, DatePicker, Slider, Switch, Progress, Spin } from "antd";
import { SyncOutlined } from '@ant-design/icons';
import { Address, Balance } from "../components";
import { parseEther, formatEther } from "@ethersproject/units";

export default function Pools({purpose, factoryEvents, address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) {
    const [pools, setPools] = useState([]);
    abiDecoder.addABI(PoolCoordinator);
    useEffect(() => {
        readContracts.PoolCoordinator.getPools().then(res => {
            console.log(res);
            setPools(res);
        });
    });

    const getPoolData = (address) => {
        readContracts.PoolCoordinator.getPoolData(address).then(res => {
            console.log(res);
    
        })
    }
    //TODO call get pool data in listd
    //Add button to add pool
    //Show amount of child pools and amount staked in pool
    return(
        <span>
        <div>Pools</div>
        <List
         dataSource={pools}
         renderItem={item => (
             <List.Item>
                 <List.Item.Meta
                 title={item.pool}
                 description={item.exists}
                 />
                 <Button
                 onClick={() => {
                     getPoolData(item.pool);
                 }}
                 >
                     Get Data
                 </Button>
             </List.Item>
         )}
        />
        </span>

    )

}
