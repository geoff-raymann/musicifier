import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";

function Room() {
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    update: false,
  });
  const [updateShowSettings, setUpdateShowSettings] = useState(false);
  const { roomCode } = useParams();
  const navigate = useNavigate();

  const getRoomDetails = () => {
    fetch(`/api/get-room?code=${roomCode}`)
      .then((response) => {
        if (!response.ok) {
          navigate("/");
          return;
        }
        return response.json();
      })
      .then((data) => {
        setRoomDetails({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  };

  useEffect(() => {
    getRoomDetails();
  }, [roomCode]);

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      navigate("/");
    });
  };

  const renderSettings = () => (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <CreateRoomPage
          update={roomDetails.update}
          votesToSkip={roomDetails.votesToSkip}
          guestCanPause={roomDetails.guestCanPause}
          roomCode={roomCode}
          updateCallback={() => {}}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setUpdateShowSettings(false)}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  );

  const renderSettingButton = () => (
    <Grid item xs={12} align="center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setUpdateShowSettings(true)}
      >
        Settings
      </Button>
    </Grid>
  );

  if (updateShowSettings) {
    return renderSettings();
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes: {roomDetails.votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest Can Pause: {roomDetails.guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {roomDetails.isHost.toString()}
        </Typography>
      </Grid>
      {roomDetails.isHost ? renderSettingButton() : null}
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}

export default Room;
