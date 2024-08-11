import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ComplaintPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [role, setRole] = useState('');
    const [Name, setName] = useState('');
    const [city, setCity] = useState('');
    const [remarkText, setRemarkText] = useState('');
    const [editingComplaintId, setEditingComplaintId] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        const userRole = sessionStorage.getItem('role');
        const Name = sessionStorage.getItem('name');
        const city = sessionStorage.getItem('city');
        setRole(userRole);
        setName(Name);
        setCity(city);

        fetchComplaints(userRole, Name, city);
    }, []);

    const fetchComplaints = async (role, Name, city) => {
        try {
            let url = '';
            let params = {};

            if (role === 'official') {
                url = 'http://localhost:10000/complaint/show_complaint2';
                params = { city: city };
            } else {
                url = 'http://localhost:10000/complaint/show_complaint1';
                params = { name: Name };
            }

            const response = await axios.get(url, { params });
            let data = response.data.data;
            setComplaints(data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    const handleRemarkChange = (e) => {
        setRemarkText(e.target.value);
    };

    const handleRemarkSubmit = async (Name) => {
        try {
            const res = await axios.put('http://localhost:10000/complaint/add_remarks', {}, {
                params: { Name, remarkText }
            });
            
            if (res.status === 200) {
                toast.success("Remark added");
                setRemarkText('');
                setEditingComplaintId(null);
                fetchComplaints(role, Name, city);
            }
        } catch (err) {
            console.error("Error submitting remark:", err);
        }
    };

    const handleDeleteComplaintByUser = async (Name) => {
        try {
            const res = await axios.delete(`http://localhost:10000/complaint/delete1`, {
                params: { Name }
            });
            if (res.status === 200) {
                toast.success("Complaint deleted by user");
                fetchComplaints(role, Name, city);
            }
        } catch (err) {
            console.error("Error deleting complaint by user:", err);
        }
    };

    const handleDeleteComplaintByOfficial = async (Name) => {
        try {
            const res = await axios.delete(`http://localhost:10000/complaint/delete2`, {
                params: { Name }
            });
            if (res.status === 200) {
                toast.success("Complaint deleted by official");
                fetchComplaints(role, Name, city);
            }
        } catch (err) {
            console.error("Error deleting complaint by official:", err);
        }
    };

    const handleStatusChange = async (complaintId, status,email) => {
        try {
            const res = await axios.put('http://localhost:10000/complaint/add_status', {}, {
                params: { Name, status,email }
            });
            
            if (res.status === 200) {
                toast.success("Complaint status updated");
                fetchComplaints(role, Name, city);
            }
        } catch (err) {
            console.error("Error updating complaint status:", err);
        }
    };

    return (
        <div className="complaint-page">
            <header className="page-header">
                <h1>Complaints</h1>
                {role === 'user' && (
                    <button className="add-complaint-btn" onClick={() => {
                        navigate('/dashboard/ComplaintPage/add_complaint');
                    }}>
                        Add Complaint
                    </button>
                )}
            </header>
            
            {complaints.length === 0 ? (
                <div className="no-complaints">
                    <p>No complaints available</p>
                </div>
            ) : (
                <div className="complaints-container">
                    {complaints.map((complaint) => (
                        <div key={complaint._id} className="complaint-card">
                            <p><b>NAME:</b> {complaint.Name}</p>
                            <p><b>DATE:</b> {complaint.date}</p>
                            <p><b>COMPLAINT DESCRIPTION:</b> {complaint.complaint}</p>
                            <p><b>COMPLAINT Status:</b> {complaint.status}</p>
                            {complaint.remarks && <p><b>COMPLAINT REMARKS:</b> {complaint.remarks}</p>}
                            {role === 'official' && (
                                <div className="remark-section">
                                    <>
                                        <input 
                                            type="text" 
                                            placeholder="Enter remark" 
                                            className="remark-input"
                                            value={remarkText}
                                            onChange={handleRemarkChange}
                                        />
                                        <button 
                                            className="remark-btn" 
                                            onClick={() => handleRemarkSubmit(complaint.Name)}
                                        >
                                            Submit Remark
                                        </button>
                                    </>
                                    <select
                                        className="status-dropdown"
                                        value={complaint.status}
                                        onChange={(e) => handleStatusChange(complaint.Name, e.target.value,complaint.email)}
                                    >
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            )}
                            {role === 'user' && (
                                <button 
                                    className="delete-complaint-btn-user"
                                    onClick={() => handleDeleteComplaintByUser(complaint.Name)}
                                >
                                    Delete by User
                                </button>
                            )}
                            {role === 'official' && (
                                <button 
                                    className="delete-complaint-btn-official"
                                    onClick={() => handleDeleteComplaintByOfficial(complaint.Name)}
                                >
                                    Delete by Official
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComplaintPage;
