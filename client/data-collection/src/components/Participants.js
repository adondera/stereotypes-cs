import React, { useEffect, useState } from "react";
import { Button, Grid, FormControlLabel, Checkbox } from "@material-ui/core";

const Participants = ({ fetchParticipants, participants, accessToken }) => {
  const [activeParticipants, setactiveParticipants] = useState({});

  useEffect(() => {
    const newParticipants = {};
    for (let i = 0; i < participants.length; i++) {
      if (!activeParticipants[participants[i].name]) {
        newParticipants[participants[i].name] = {
          checked: false,
          finished: participants[i].finished,
        };
      } else {
        newParticipants[participants[i].name] = {
          ...activeParticipants[participants[i].name],
        };
      }
    }
    setactiveParticipants(newParticipants);
  }, [participants]);

  const refreshParticipants = () => {
    fetchParticipants(accessToken);
  }
  
  const updateChild = (name) => {
      var newActiveParticipants = {...activeParticipants}
      newActiveParticipants[name] = {...activeParticipants[name], checked: !activeParticipants[name].checked}
      setactiveParticipants(newActiveParticipants)
  }
  return (
    <React.Fragment>
      <Grid container style={{flexGrow: 1}}>
        {Object.keys(activeParticipants).map((name) => (
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={activeParticipants[name].checked}
                  onChange={() => updateChild(name)}
                />
              }
              label={name}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
        <Button onClick={() => refreshParticipants()}>REFRESH</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Participants;
