import { Card, Typography } from "antd";
import React, { FC } from "react";
import styled from "styled-components";

const StyledBottomDiv = styled.div`
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

type FooterProps = {
  strings: {
    siteUrl: string,
    text: string,
  }
};

export const Footer: FC<FooterProps> = (props) => {
  return (
    <StyledBottomDiv>
      <Card
        bordered={false}
        bodyStyle={{ padding: "15px" }}
        style={{
          background: "rgba(20, 20, 20, 0.8)",
          borderTop: "solid 1px rgb(23, 125, 220)",
        }}
      >
        <Typography.Text
          style={{ color: "rgb(23, 125, 220)", padding: "10px" }}
        >
          {'Copyright © '}
          <a
            href={props.strings.siteUrl}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {props.strings.text}
          </a>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography.Text>
      </Card>
    </StyledBottomDiv>
  );
}