import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

function RoomJoinPage() {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
    setError(""); // Clear the error when the user types in the input field
  }

  const roomButtonPressed = () => {
    if (roomCode === "") {
      setError("Please enter a room code.");
    } else {
      // Perform your room joining logic here, e.g., send a request to the server
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: roomCode })
      };

      fetch('/api/join-room', requestOptions)
        .then((response) => {
          if (response.ok) {
            navigate(`/room/${roomCode}`);
          } else {
            setError("Room not found."); // Set the error state accordingly
          }
        })
        .catch((error) => {
          setError("An error occurred. Please try again."); // Set an error message for network errors
          console.log(error);
        });
    }
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={!!error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={roomButtonPressed}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

export default RoomJoinPage;













// import React, { useState } from "react";
// import { TextField, Button, Grid, Typography } from "@material-ui/core";
// import { Link, useNavigate } from "react-router-dom";

// function RoomJoinPage() {
//     const [roomCode, setRoomCode] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleTextFieldChange = (e) => {
//         setRoomCode(e.target.value);
//         setError(""); // Clear the error when the user types in the input field
//     }

//     const roomButtonPressed = () => {
//         if (roomCode === "") {
//             setError("Please enter a room code.");
//         } else {
//             // Perform your room joining logic here, e.g., send a request to the server
//             const requestOptions = {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ code: roomCode }) // Use roomCode, not state.roomCode
//             };

//             fetch('/api/join-room', requestOptions)
//                 .then((response) => {
//                     if (response.ok) {
//                         navigate(`/room/${roomCode}`);
//                     } else {
//                         setError("Room not found."); // Set the error state accordingly
//                     }
//                 })
//                 .catch((error) => {
//                     setError("An error occurred. Please try again."); // Set an error message for network errors
//                     console.log(error);
//                 });
//         }
//     }

//     return (
//         <Grid container spacing={1}>
//             <Grid item xs={12} align="center">
//                 <Typography variant="h4" component="h4">
//                     Join a Room
//                 </Typography>
//             </Grid>
//             <Grid item xs={12} align="center">
//                 <TextField
//                     error={!!error}
//                     label="Code"
//                     placeholder="Enter a Room Code"
//                     value={roomCode}
//                     helperText={error}
//                     variant="outlined"
//                     onChange={handleTextFieldChange}
//                 />
//             </Grid>
//             <Grid item xs={12} align="center">
//                 <Button variant="contained" color="primary" onClick={roomButtonPressed}>
//                     Enter Room
//                 </Button>
//             </Grid>
//             <Grid item xs={12} align="center">
//                 <Button variant="contained" color="secondary" to="/" component={Link}>
//                     Back
//                 </Button>
//             </Grid>
//         </Grid>
//     );
// }

// export default RoomJoinPage;
