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
        tags={<Tag color="blue">v0.01</Tag>}
        style={{ cursor: "pointer" }}
      />
  );
}
