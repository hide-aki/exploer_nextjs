import React, { useState } from "react";
import Router from "next/router";
import Panel from "../../src/components/Panel";
import {
  FusionTab,
  FusionTabs,
  FusionTabPanel
} from "../../src/components/FusionTabs";
import FusionTabPanels from "../../src/components/FusionTabs/FusionTabPanels";
import BlockOverview from "../../src/components/BlockOverview";
import PageHeading from "../../src/components/PageHeading";
import fetch from "../../src/libs/fetch";

const tabMap = {
  overview: 0,
  tx: 1
};

export default function BlockPage(props) {
  const { block = {}, tab = "overview", height } = props;
  const [state, setState] = useState({
    tab: tabMap[tab] || 0
  });

  const handleTabChange = (e, newValue) => {
    setState({
      ...state,
      tab: newValue
    });
  };
  
  if (block.height == undefined) {
    return (
      <>
        <PageHeading title={"Block"} suffix={`#${height}`} />
        <Panel title="Bad Request">
          <p>This block does not exist!</p>
        </Panel>
      </>
    );
  }
  return (
    <>
      <PageHeading title={"Block"} suffix={`#${block.height}`} />
      <Panel>
        <FusionTabs value={state.tab} onChange={handleTabChange}>
          <FusionTab label="overview" />
        </FusionTabs>
        <FusionTabPanels>
          <FusionTabPanel value={state.tab} index={0}>
            <BlockOverview block={block} />
          </FusionTabPanel>
        </FusionTabPanels>
      </Panel>
    </>
  );
}

BlockPage.getInitialProps = async ({ query, res }) => {
  const height = Math.abs(Number(query.height));
  if (isNaN(height)) {
    if (res) {
      res.writeHead(302, {
        Location: "/blocks"
      });
      res.end();
    } else {
      Router.push("/blocks");
    }
  } else {
    const block = await fetch(`/block/${height}`)
      .then(res => res.json())
      .then(res => res.data)
      .catch(e => {
        return {}
      });
    return {
      block,
      ...query
    };
  }
};
