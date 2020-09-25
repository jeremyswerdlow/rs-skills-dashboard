import React, { FC } from "react";
import { Card, Empty, List, Progress, Typography } from "antd";
import { pct, skillListStrings, skillMap } from "../Constants";

type EmptySkillList = {
  image?: React.ReactNode,
  description: string,
};

const EmptySkillList: FC<EmptySkillList> = (props) => {
  return (
    <Empty
      image={props.image}
      imageStyle={{height: 100}}
      description={props.description}
    />
  );
}

type SkillProgressBreakdownProps = {
  skills: skillMap[],
};

export const SkillProgressBreakdown: FC<SkillProgressBreakdownProps> = (props) => {
  const { Title } = Typography;

  return (
    <>
      <Title level={3} style={{paddingTop: "20px"}}>
        {skillListStrings.header}
      </Title>
      <List
        grid={{xs: 1, sm: 2, md: 3, lg: 4, xl: 6, gutter: 15}}
        dataSource={props.skills.slice(1)}
        locale={{emptyText: <EmptySkillList description={skillListStrings.empty}/>}}
        renderItem={
          skill => (
            <List.Item>
              <Card
                cover={
                  <Progress
                    type={"circle"}
                    percent={pct(skill.exp, skill.goalExp)}
                    strokeColor={skill.color}
                    style={{padding: "15px 15px 0px 15px"}}
                  />
                }
              >
                <Card.Meta title={skill.name} description={`${skill.exp} xp`} />
              </Card>
            </List.Item>
          )
        }
      />
    </>
  );
}