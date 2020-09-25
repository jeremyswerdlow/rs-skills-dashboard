import React, { FC } from "react";
import { Card, Col, Typography } from "antd";
import { skillHeaderSectionStrings, skillMap } from "../Constants";
import { SkillProgressBreakdown, SkillProgressOverall } from ".";

type SkillProgressProps = {
  skills: skillMap[],
}

export const SkillProgress: FC<SkillProgressProps> = (props) => {
  const { skills } = props;

  return(
    <Col style={{ width: "100%" }}>
      <Card bordered={false}>
        {(skills.length > 0) &&
          <>
            <Typography.Title>{skillHeaderSectionStrings.header}</Typography.Title>
            <Card bordered={false}>
              <SkillProgressOverall skills={skills} />
              <SkillProgressBreakdown skills={skills} />
            </Card>
          </>
        }
      </Card>
    </Col>
  );
};