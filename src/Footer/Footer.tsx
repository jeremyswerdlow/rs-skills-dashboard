import { Card, Typography } from "antd";
import React, { FC } from "react";
import styled from "styled-components";

const StyledBottomDiv = styled.div`
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

type FooterLinkProps = {
  link: string,
}

const FooterLink: FC<FooterLinkProps> = (props) => {
  return(
    <a href={props.link}>{props.children}</a>
  );
}

type FooterProps = {
  strings: {
    siteUrl: string,
    codeUrl: string,
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
        <Typography.Text style={{ color: "rgb(23, 125, 220)", padding: "10px" }}>
          {'Copyright © '}
          <FooterLink link={props.strings.siteUrl}>{props.strings.text}</FooterLink>
          {' '} {new Date().getFullYear()} {'. See the '}
          <FooterLink link={props.strings.codeUrl}>{'source code here.'}</FooterLink>
        </Typography.Text>
      </Card>
    </StyledBottomDiv>
  );
}