import React, { useState } from "react";
import { Alert, Layout, Row } from "antd";
import format from "string-format";

import { emptySkillMapList, footerStrings, ReplaceAll, serverMaps, warningMessage } from "./Constants";
import { Inputs } from "./Inputs";
import { Introduction } from "./Introduction";
import { SkillProgress } from "./SkillProgress";
import { Footer } from "./Footer";

const App = () => {

  // states for the App
  const [ loading, setLoading ] = useState(false);
  const [ skills, setSkills ] = useState(emptySkillMapList);
  const [ server, setServer ] = useState("Vitality");
  const [ warningVisible, setWarningVisible ] = useState(false);

  const showWarning = () => {
    setWarningVisible(true)
  };

  const updateName = (name: string) => {
    if ( name && server ) {

      const updateSkills = async ( url: string, resolve: () => void ) => {

        const serverInfo = serverMaps.find( serverMap => serverMap.name === server );
        // TODO: move this to a variable, check if valid, and throw a warning if not
        const updatedSkills = await serverInfo!.scraper(url);

        if (updatedSkills.length === 0) {
          showWarning();
        }

        setSkills(updatedSkills);
        resolve();

      }

      const serverInfo = serverMaps.find(serverMap => serverMap.name === server);
      const url = format(serverInfo!.url, ReplaceAll(name, " ", serverInfo!.separator))
      new Promise((resolve) => {

        setLoading(true);
        updateSkills(url, resolve);

      }).then( () => setLoading(false) );
    }
  };

  return (
    <Layout
      style={{ background: "rgb(20, 20, 20)", fontFamily: "Roboto", height: "100%" }}
    >
      <Row><Introduction /></Row>
      <Row>
        <Inputs loading={loading} updateName={updateName} updateServer={setServer} />
        {warningVisible &&
          <Alert
            message={warningMessage}
            type="warning"
            closable
            afterClose={ () => setWarningVisible(false) }
            showIcon
            style={{ margin: "auto" }}
          />
        }
      </Row>
      <Row>
        <SkillProgress skills={skills} />
      </Row>
      <Row>
        <div style={{ background: "rgb(20, 20, 20)", padding: "5px", width: "100%" }}/>
        <Footer strings={footerStrings} />
      </Row>
    </Layout>
  );
}

export default App;
