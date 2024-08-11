import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const IdeaSubmissionPage = () => {
    const [ideas, setIdeas] = useState([]);
    const [role, setRole] = useState('');
    const [Name, setName] = useState('');
    const [city, setCity] = useState('');
    const [remarkText, setRemarkText] = useState('');
    const [editingIdeaId, setEditingIdeaId] = useState(null);
    const [summaries, setSummaries] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        const userRole = sessionStorage.getItem('role');
        const Name = sessionStorage.getItem('name');
        const city = sessionStorage.getItem('city');
        setRole(userRole);
        setName(Name);
        setCity(city);

        fetchIdeas(userRole, Name, city);
    }, []);

    const fetchIdeas = async (role, Name, city) => {
        try {
            let url = '';
            let params = {};

            if (role === 'official') {
                url = 'http://localhost:10000/idea/show_idea2';
                params = { city: city };
            } else {
                url = 'http://localhost:10000/idea/show_idea1';
                params = { name: Name };
            }

            const response = await axios.get(url, { params });
            let data = await response.data.data;
            setIdeas(data);
        } catch (error) {
            console.error('Error fetching ideas:', error);
        }
    };

    const handleRemarkChange = (e) => {
        setRemarkText(e.target.value);
    };

    const handleRemarkSubmit = async (Name) => {
        try {
            const res = await axios.put('http://localhost:10000/idea/add_remarks_idea', {}, {
                params: { Name, remarkText }
            });
            
            if (res.status === 200) {
                toast.success("Remark added");
                setRemarkText(''); 
                setEditingIdeaId(null); 
                fetchIdeas(role, Name, city); 
            }
        } catch (err) {
            console.error("Error submitting remark:", err);
        }
    };

    const handleDeleteIdeaByUser = async (Name) => {
        try {
            const res = await axios.delete(`http://localhost:10000/idea/delete_user`, {
                params: { Name }
            });
            if (res.status === 200) {
                toast.success("Idea deleted by user");
                fetchIdeas(role, Name, city);
            }
        } catch (err) {
            console.error("Error deleting idea by user:", err);
        }
    };

    const handleDeleteIdeaByOfficial = async (city) => {
        try {
            const res = await axios.delete(`http://localhost:10000/idea/delete_offl`, {
                params: { city }
            });
            if (res.status === 200) {
                toast.success("Idea deleted by official");
                fetchIdeas(role, Name, city);
            }
        } catch (err) {
            console.error("Error deleting idea by official:", err);
        }
    };

    const summarizeIdea = async (idea) => {
        try {
            const res = await axios.post('http://localhost:5000/summarize', { text: idea.idea });
            if (res.status === 200) {
                setSummaries(prevSummaries => ({
                    ...prevSummaries,
                    [idea._id]: res.data.summary
                }));
            }
        } catch (err) {
            console.error("Error summarizing idea:", err);
        }
    };

    return (
        <div className="idea-submission-page">
            <header className="page-header">
                <h1>Ideas</h1>
                {role === 'user' && (
                    <button className="add-idea-btn" onClick={() => navigate('/dashboard/idea/add')}>
                        Add Idea
                    </button>
                )}
            </header>
            
            {ideas.length === 0 ? (
                <div className="no-ideas">
                    <p>No ideas available</p>
                </div>
            ) : (
                <div className="ideas-container">
                    {ideas.map((idea) => (
                        <div key={idea._id} className="idea-card">
                            <p><b>NAME:</b> {idea.Name}</p>
                            <p><b>DATE:</b> {idea.date}</p>
                            <p><b>IDEA DESCRIPTION:</b> {idea.idea}</p>
                            {idea.remarks && <p><b>IDEA REMARKS:</b> {idea.remarks}</p>}
                            {role === 'official' && idea.remarks === "" && (
                                <div className="remark-section">
                                    {editingIdeaId === idea._id ? (
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
                                                onClick={() => handleRemarkSubmit(idea.Name)}
                                            >
                                                Submit Remark
                                            </button>
                                        </>
                                    ) : (
                                        <button 
                                            className="add-remark-btn"
                                            onClick={() => setEditingIdeaId(idea._id)}
                                        >
                                            Add Remark
                                        </button>
                                    )}
                                </div>
                            )}
                            {role === 'user' && (
                                <button 
                                    className="delete-idea-btn-user"
                                    onClick={() => handleDeleteIdeaByUser(idea.Name)}
                                >
                                    Delete by User
                                </button>
                            )}
                            {role === 'official' && (
                                <>
                                    <button 
                                        className="delete-idea-btn-official"
                                        onClick={() => handleDeleteIdeaByOfficial(idea.city)}
                                    >
                                        Delete by Official
                                    </button>
                                    <button 
                                        className="summarize-idea-btn"
                                        className="add-idea-btn"
                                        onClick={() => summarizeIdea(idea)}
                                    >
                                        Summarize
                                    </button>
                                    {summaries[idea._id] && (
                                        <div className="summary-section">
                                            <p><b>Summary:</b> {summaries[idea._id]}</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IdeaSubmissionPage;
