import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import {
    BrowserRouter as Router, Route, Link, Redirect, Routes, Outlet 
} from "react-router-dom";

function HomePage() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" Component={Home} />
                <Route path="/join" Component={RoomJoinPage} />
                <Route path="/create" Component={CreateRoomPage} />
            </Routes>
        </Router>
    );
}

function Home() {
    return <div>This is Home page</div>;
  }


export default HomePage