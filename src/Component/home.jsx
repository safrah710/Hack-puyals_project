import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from '../../public/home.jpg';

export default function LandingPage() {
    return (
        <header style={HeaderStyle}>
            <div style={contentStyle}>
                <h1 className="main-title text-center">Smart Governance</h1>
                <p className="main-para text-center">AI-Powered Citizen Engagement Platform</p>
                <div className="buttons text-center">
                    <Link to="/sign_in">
                        <button className="primary-button" id="reg_btn"><span>Citizen log in</span></button>
                    </Link>
                    <Link to="/admin_signin">
                        <button className="primary-button" id="reg_btn"><span>Admin Login</span></button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage}) no-repeat center center`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
};

const contentStyle = {
    textAlign: "center",
    color: "#f1f1f1",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "2rem",
    borderRadius: "10px",
};
