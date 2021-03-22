import React from "react";
import { PageHeader, Tag } from "antd";
/**
 * TODO:
 *   1. change twitter link to button maybe? Or something else more nonobtrusive
 *   2. Grab version from github tags
 */
export default function Header() {
  return (
      <PageHeader
        title="Idea Factory"
        subTitle="Decentralized Funding Pools for Ideas"
        avatar={{src: "/3e15bceff0d3d48cda0040168ad997e6.png"}}
        tags={<Tag color="blue">v0.01</Tag>}
        style={{ cursor: "pointer" }}
      />
  );
}
