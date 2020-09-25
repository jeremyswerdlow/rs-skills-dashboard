import React, { FC } from "react";
import { Card, Progress } from "antd";
import { pct } from "../Constants";

type SkillProgressOverallProps = {
  skills: {
    name: string;
    color: string;
    exp: number;
    goalExp: number;
  }[],
};

export const SkillProgressOverall: FC<SkillProgressOverallProps> = (props) => {
  const overall = props.skills[0];

  return (<>
    <Card>
      <Progress
        percent={pct(overall.exp, overall.goalExp)}
        strokeColor={{from: "#8ee3ef", to: "#49aa19"}}
        style={{paddingBottom: "15px"}}
      />
      <Card.Meta title={overall.name} description={`${overall.exp} xp`} />
    </Card>
  </>);
}