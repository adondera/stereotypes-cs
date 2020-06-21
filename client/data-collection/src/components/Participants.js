import React, { useEffect, useState } from "react";
import { Button, Grid, FormControlLabel, Checkbox, Typography } from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/RefreshOutlined'

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
    // eslint-disable-next-line
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
      <Grid container style={{flexGrow: 1, margin: 'auto', textAlign: 'center', marginTop: 100}}>
      <Grid style={{margin: 'auto', marginBottom: 50}}>
          <Typography variant='h4' > Active participants (Diploma)</Typography>
        </Grid>
        {Object.keys(activeParticipants).map((name) => (
          <Grid item xs={12} key={name}>
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
        <Grid item xs={12} style={{marginTop: 50}}>
            <Button onClick={() => refreshParticipants()}> <RefreshIcon/></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Participants;
