import React, { Component, useState } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createRoot } from 'react-dom/client';
import { useNavigate } from 'react-router-dom';

function CreateRoomPage() {
  const defaultVotes = 2;

  const [state, setState] = useState({
    guestCanPause: true,
    votesToSkip: defaultVotes,
    update: false,
    roomCode: null,
    updateCallback: () => {},
  });

 

  const handleVotesChange = (e) => {
    setState({
      ...state,
      votesToSkip: e.target.value,
    });
  };

  const handleGuestCanPauseChange = (e) => {
    setState({
      ...state,
      guestCanPause: e.target.value === "true", // Compare to "true" string
    });
  };
  

  const navigate = useNavigate();

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        votes_to_skip: state.votesToSkip,
        guest_can_pause: state.guestCanPause,
      }),
    };
    fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => navigate('/room/' + data.code));
  }

  const renderCreateButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>
          Create A Room
        </Button>
      </Grid>
    );
  }
  

  const renderUpdateButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>
          Update Room
        </Button>
      </Grid>
    );
  }
  
  


  const title = state.update ? "Update Room" : "Create a Room";

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            Guest Control of Playback state
          </FormHelperText>
          <RadioGroup
            row
            value={state.guestCanPause ? 'true' : 'false'}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            onChange={handleVotesChange}
            type="number"
            value={state.votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: 'center' },
            }}
          />
          <FormHelperText>
            Votes Required to Skip Song.
          </FormHelperText>
        </FormControl>
      </Grid>
      {state.update ? renderUpdateButton() : renderCreateButton()}
    </Grid>
  );
}

export default CreateRoomPage;