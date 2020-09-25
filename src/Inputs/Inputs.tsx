import React, { FC } from "react";
import { Card, Col, Input, Select, Typography } from "antd";
import { inputSectionStrings, serverMaps } from "../Constants";

type InputsProps = {
  loading: boolean,
  updateName: (name: string) => void,
  updateServer: (newServer: string) => void,
};

export const Inputs: FC<InputsProps> = (props) => {
  return(
    <Col style={{width: "100%", display: "block"}}>
      <Card bordered={false}>
        <Typography.Title>{inputSectionStrings.serverHeader}</Typography.Title>
        <Card bordered={false}>
          <Select
            onChange={props.updateServer}
            placeholder="Select a Source"
            style={{width: "100%", marginBottom: "15px"}}>
            {
              serverMaps.map((server) => {
                return (
                  <Select.Option key={server.name} value={server.name}>
                    {server.name}
                  </Select.Option>
                );
              })
            }
          </Select>

          <Input.Search
            enterButton
            loading={props.loading}
            onSearch={props.updateName}
            placeholder="Enter a Username"
          />

        </Card>
      </Card>
    </Col>
  );
};