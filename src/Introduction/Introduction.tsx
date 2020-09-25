import React, { FC } from "react";
import { Card, Col, Typography } from "antd";
import { introductionSectionStrings } from "../Constants";

type IntroductionProps = {

};

export const Introduction: FC<IntroductionProps> = (props) => {
  return (
    <Col style={{width: "100%"}}>
      <Card bordered={false}>
        <Typography.Title style={{fontSize: "96px", marginBottom: "10px"}}>
          {introductionSectionStrings.title}
        </Typography.Title>
        {
          introductionSectionStrings.summary.map((paragraph, idx) => {
            return (
              <Typography.Paragraph key={`intro-para-${idx}`}>
                {paragraph}
              </Typography.Paragraph>
            );
          })
        }
      </Card>
    </Col>
  );
};