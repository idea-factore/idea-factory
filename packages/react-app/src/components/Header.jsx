import React from "react";
import { PageHeader } from "antd";

export default function Header() {
  return (
    <a href="https://twitter.com/Ideafactoryidea" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title="Idea Factory"
        subTitle="Decentralized Funding Pools for Ideas"
        avatar={{src: "/3e15bceff0d3d48cda0040168ad997e6.png"}}
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
