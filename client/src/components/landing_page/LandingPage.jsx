import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div className="main">
            <h1>Cooking Together.</h1>
            <h3>From My Cutting Board, To Your Dinner Table. Let's Start Cooking Together.</h3>
            <Link to="/home">
                <button className="cta-btn">let's go</button>
            </Link>
        </div>
    )
};

export default LandingPage;