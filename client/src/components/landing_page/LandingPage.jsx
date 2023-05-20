import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div className="main">
            <h1>Welcome to my kitchen</h1>
            <Link to="/home">
                <button>Let's go</button>
            </Link>
        </div>
    )
};

export default LandingPage;