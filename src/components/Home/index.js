//dependencies
import React from "react";
import logo from './logo.svg';

//components
import Grid from '../Grid'
import JQuery from '../TEST_USING_JQUERY'

const {app} = window.require('electron').remote;

function Home() {
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>React + Electron = <span role="img" aria-label="love">😍</span></h2>
            </div>
            <p className="App-intro">
                <b> Release 0.2.7 </b>
                Version: {app.getVersion()}
            </p>
            <Grid />
            <JQuery />
        </div>
    )
}

export default Home;