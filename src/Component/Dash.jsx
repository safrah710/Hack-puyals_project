import React, { useEffect } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
//import "@fortawesome/fontawesome-free/css/all.min.css";
//import "boxicons/css/boxicons.min.css";
import useLogout from '../hook/Uselogout';
import {Link } from 'react-router-dom';
import App1 from "./Chatbot";
import { useNavigate } from "react-router-dom";
const  Dash = () => {
    let navigate=useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector(".custom-nav");
      if (window.scrollY > 50) {
        nav.classList.remove("custom-nav-small");
        nav.classList.add("custom-nav-large");
      } else {
        nav.classList.remove("custom-nav-large");
        nav.classList.add("custom-nav-small");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  let logout=useLogout();
  return (
    <div>
      <header className="header" id="header">
        <nav className="custom-nav custom-nav-small navbar navbar-expand-lg navbar-light bg-white" id="nav">
          <a className="navbar-brand" href="home.html">
            <img
              src="../public/hacklogo.png"
              alt=""
              className="img-fluid"
              style={{ filter: "drop-shadow(black 0rem 0rem 1px)", width: "3.5rem" }}
            />
          </a>

          <div className="nav-menu collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li>
              <Link to ='ComplaintPage'><b>Complaints</b></Link>
              </li>
              <li>
              <Link to ='idea'><b>Idea Submission</b></Link>
              </li>
              <li>
              <Link to ='feedback'><b>Feedback</b></Link>
              </li>
              <li className="active" aria-current="page">
                <b><a href="/about.html">About</a></b>
              </li>
              <li>
                <a className="btn crew-btn mx-2 py-2 mt-1 btn-danger text-white" target="_blank" onClick={()=>{
                    logout();
                }} >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div>
        <img src="../public/building.png" style={{ width: "100%", filter: "blur(5px)", height: "25rem", marginBottom: "40px"}} alt="Building" />
      </div>
      <marquee
        name="mar"
        id="mar"
        behavior="scroll"
        direction="left"
        style={{ padding: "20px", fontSize: "13.6px" }}
        onMouseMove={() => (document.getElementById("mar").stop())}
        onMouseOut={() => (document.getElementById("mar").start())}
      >
        <h2 className="style2" style={{ fontSize: "14px" }}>
          <span style={{ color: "orange", fontWeight: "bold", padding: "20px", fontSize: "14px" }}>
            AI-Powered Citizen Engagement Platform for Smart Governance By Hack Puyals
          </span>
        </h2>
      </marquee>
      <div className="stats" style={{ textAlign: "center" }}>
        <div className="stat">
          <Link to='ComplaintPage'>
          <i className="fa-solid fa-rectangle-list"></i>
            <h3>Complaints</h3>
            <p><b>Click here </b>to file an issue</p>
            </Link>
            
         
        </div>
        <div className="stat">
        <Link to='idea'>
            <i className="fa-solid fa-lightbulb"></i>
            <h3>Idea Submission</h3>
            <p><b>Click here </b>to share an idea</p>
            </Link>
        </div>
        <div className="stat">
          <a href="/feedback.html">
            <i className="fa-solid fa-comments"></i>
            <h3>Feedback &amp; Polls</h3>
            <p><b>Click here </b>to participate in polls and submit feedback</p>
          </a>
        </div>
        <div className="stat">
          <a href="/about.html">
            <i className="fas fa-users"></i>
            <h3>About The Devs</h3>
            <p><b>Click here </b>to learn about the brains behind this website!</p>
          </a>
        </div>
      </div>
      <button className="chatbotbutton" onClick={()=>{
        navigate('/dashboard/chat')

      }}><i class="fa-regular fa-comments"></i></button>

      

      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top hack">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            <svg className="bi" width="30" height="24">
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">© 2024 Hack Puyals 🌪️. All rights reserved.</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex px-5">
          <li className="ms-3">
            <a className="text-body-secondary px-1" href="https://www.instagram.com/rotaractrec/">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.275-1.486a2.5 2.5 0 0 1 .6-.92 2.5 2.5 0 0 1 .92-.599c.281-.109.704-.24 1.485-.275.843-.039 1.096-.047 3.232-.047zM8 3.888a4.112 4.112 0 1 0 0 8.224 4.112 4.112 0 0 0 0-8.224zm0 6.787a2.675 2.675 0 1 1 0-5.351 2.675 2.675 0 0 1 0 5.35zm5.211-6.929a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z" />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary px-1" href="https://twitter.com/rotaractrec">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.009-.423A6.683 6.683 0 0 0 16 3.542a6.557 6.557 0 0 1-1.889.518 3.293 3.293 0 0 0 1.443-1.816 6.533 6.533 0 0 1-2.084.797 3.286 3.286 0 0 0-5.596 2.994A9.325 9.325 0 0 1 1.11 2.1 3.284 3.284 0 0 0 2.13 6.437a3.27 3.27 0 0 1-1.487-.41v.041a3.284 3.284 0 0 0 2.636 3.218 3.29 3.29 0 0 1-1.482.056 3.283 3.283 0 0 0 3.067 2.281A6.588 6.588 0 0 1 .78 13.58a9.29 9.29 0 0 0 5.025 1.472" />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary px-1" href="https://www.linkedin.com/company/rotaractrec/">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.324 0 .725 0h14.55c.401 0 .725.513.725 1.146v13.708c0 .633-.324 1.146-.725 1.146H.725A.723.723 0 0 1 0 14.854V1.146zm4.943 12.248V5.919H3.02v7.475h1.922zm.021-8.708c0-.69-.547-1.25-1.242-1.25-.692 0-1.25.56-1.25 1.25 0 .687.558 1.248 1.25 1.248.695 0 1.242-.561 1.242-1.248zM14.38 8.303c0-1.709-1.113-2.506-2.597-2.506-1.106 0-1.594.615-1.872 1.054v-1.03H8.02v7.475h1.922v-3.726c0-.979.185-1.927 1.394-1.927 1.183 0 1.197 1.106 1.197 1.983v3.67h1.922v-3.973z" />
              </svg>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Dash;
