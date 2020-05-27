import React from 'react';
import './App.css';
import Clipboard from 'react-clipboard.js';

// FIXME: We should refactor this UI to have the copy button within the input box
const AuthToken = ({ token }) => {
    return <div className="token">
        <span>X-Auth-Token: {" "}</span>

        <input id="token" value={token || ""} readOnly />

        <Clipboard data-clipboard-text={token}>
            <img src="https://clipboardjs.com/assets/images/clippy.svg" alt="Copy To Clipboard"/>
        </Clipboard>
    </div>;
}

export default AuthToken;
