import React from 'react';
import {Link } from 'react-router-dom';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import useLogout from '../hook/Uselogout';
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
    let role=sessionStorage.getItem('role');
    let logout=useLogout();
    const pieData = {
        labels: ['Total Order', 'Customer Growth', 'Total Revenue'],
        datasets: [
            {
                label: 'Percentage',
                data: [81, 22, 62],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
        ]
    };

    const barData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Customer Growth',
                data: [20, 30, 50, 40, 60, 80, 70],
                backgroundColor: '#36A2EB'
            }
        ]
    };

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="logo">AI GOVERNANCE</div>
                <nav>
                    <ul>
                        <Link to='ComplaintPage'>HOME</Link>
                        <Link to='ComplaintPage'>Complaints</Link>
                        <Link to='idea'>Idea</Link>
                        <li><a href="#">FEEDBACK</a></li>
                    </ul>
                </nav>
                <div className="settings-logout">
                    <button onClick={()=>{
                        logout();
                    }}>LOGOUT</button>
                </div>
            </aside>
            <main className="main-content">
                <header className="header">
                    <input type="text" placeholder="Search here" />
                    <div className="user-info">
                        <span>HELLO USER</span>
                        <div className="filter">
                            <button>Filter Period</button>
                        </div>
                    </div>
                </header>
                <section className="content">
                    <div className="dashboard-banner">
                        <img src="public\im1.jpg" alt="Dashboard Banner" />
                    </div>
                    <div className="widgets">
                        <div className="widget pie-chart">
                            <h3>Pie Chart</h3>
                            <Pie data={pieData} />
                        </div>
                        <div className="widget customer-map">
                            <h3>Customer Map</h3>
                            <Bar data={barData} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
