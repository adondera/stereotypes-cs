import React, { useState } from "react";
import { JsonTable } from "react-json-to-html";
import { getStats } from "../utils/requests/getStats";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Button, Typography } from "@material-ui/core";

const Stats = (props) => {
  const [data, setdata] = useState({});

  const onRefresh = () => {
    getStats(props.accessToken, (res) => setdata(res.data));
  };

  return (
    <React.Fragment>
        <div>
      <Typography variant="h3" style={{ paddingTop: "60px" }}>
        Live stats
      </Typography>
      </div>
      <div style={{ marginLeft: "35%", marginTop: "1%", textAlign: "center" }}>
        <JsonTable json={data} />
      </div>
      <div style={{ marginTop: "1%" }}>
        <Button onClick={onRefresh}>
          <RefreshIcon />
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Stats;
