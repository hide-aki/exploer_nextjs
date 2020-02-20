import React from "react";
import Transactions from "../src/components/Transactions";
import Panel from "../src/components/Panel";
import PageHeading from "../src/components/PageHeading";
import FusionAddressLink from "../src/components/FusionAddressLink";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    hint: {
      display: "flex",
      flexWrap: "wrap",
      wordBreak: "break-all",
      paddingLeft: ".75rem"
    },
    span: {
      margin: "0 4px",
      display: "inline-block"
    },
    strong: {
      margin: " 0 .25rem"
    }
  })
);

export default function TxListPage({ params }) {
  let type = params.type
    ? `#${params.type.replace("Ext", "").replace("Func", "")}`
    : "";
  const { from, to } = params;
  const hasAddressFilter = from || to;
  const classes = useStyles();
  return (
    <>
      <PageHeading title="Transactions" suffix={type} />
      <Panel style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
        {hasAddressFilter ? (
          <p className={classes.hint}>
            <strong className={classes.strong}>Notice: </strong>We only provide
            latest at most <prev className={classes.prev}></prev>
            <strong className={classes.strong}>10k non-ticket txs </strong>{" "}
            <prev className={classes.prev}></prev>for an address.
          </p>
        ) : null}
        {from ? (
          <p className={classes.hint}>
            <strong className={classes.strong}>Outgoing </strong>
            <span className={classes.span}>txs for</span>{" "}
            <FusionAddressLink address={from} />
          </p>
        ) : null}
        {to ? (
          <p className={classes.hint}>
            <strong className={classes.strong}>Incoming </strong>
            <span className={classes.span}>txs for</span>{" "}
            <FusionAddressLink address={to} />
          </p>
        ) : null}
        <Transactions params={params} />
      </Panel>
    </>
  );
}

TxListPage.getInitialProps = async ({ query }) => {
  return {
    params: query
  };
};
