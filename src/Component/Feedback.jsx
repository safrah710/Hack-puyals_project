import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FeedbackPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [role, setRole] = useState('');
    const [remarkText, setRemarkText] = useState('');
    const [newFeedback, setNewFeedback] = useState('');
    const [showFeedbackInput, setShowFeedbackInput] = useState(false);
    const [city, setCity] = useState('');
    const [sentiments, setSentiments] = useState({});

    useEffect(() => {
        const userRole = sessionStorage.getItem('role');
        const userCity = sessionStorage.getItem('city');
        setRole(userRole);
        setCity(userCity);

        fetchFeedbacks(userRole, userCity);
    }, []);

    const fetchFeedbacks = async (role, city) => {
        try {
            const response = await axios.get('http://localhost:10000/feedback/get_feedback', {
                params: { city }
            });
            const data = Array.isArray(response.data.data) ? response.data.data : [];
            setFeedbacks(data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const fetchSentiment = async (feedback, feedbackId) => {
        try {
            const res = await axios.post('http://localhost:5000/sentiment', {
                feedback
            });
            if (res.status === 200) {
                setSentiments(prevSentiments => ({
                    ...prevSentiments,
                    [feedbackId]: res.data.sentiment
                }));
            }
        } catch (err) {
            console.error("Error fetching sentiment:", err);
        }
    };

    const handleRemarkChange = (e) => {
        setRemarkText(e.target.value);
    };

    const handleRemarkSubmit = async (feedback) => {
        try {
            const res = await axios.put('http://localhost:10000/feedback/add_remarks', {}, {
                params: { remarkText, city, feedback }
            });
            
            if (res.status === 200) {
                toast.success("Remark added");
                setRemarkText('');
                fetchFeedbacks(role, city);
            }
        } catch (err) {
            console.error("Error submitting remark:", err);
        }
    };

    const handleFeedbackChange = (e) => {
        setNewFeedback(e.target.value);
    };

    const handleFeedbackSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:10000/feedback/add_feedback', {
                feedback: newFeedback,
                city
            });
            
            if (res.status === 200) {
                toast.success("Feedback added");
                setNewFeedback('');
                setShowFeedbackInput(false);
                fetchFeedbacks(role, city);
            }
        } catch (err) {
            console.error("Error adding feedback:", err);
        }
    };

    return (
        <div className="feedback-page">
            <header className="page-header">
                <h1>Feedbacks</h1>
                {role === 'official' && (
                    <button 
                        className="add-feedback-btn" 
                        onClick={() => setShowFeedbackInput(!showFeedbackInput)}
                    >
                        {showFeedbackInput ? 'Cancel' : 'Add Feedback'}
                    </button>
                )}
            </header>
            
            {showFeedbackInput && role === 'official' && (
                <div className="feedback-input-container">
                    <textarea 
                        placeholder="Enter feedback"
                        className="feedback-input"
                        value={newFeedback}
                        onChange={handleFeedbackChange}
                    />
                    <button 
                        className="submit-feedback-btn" 
                        onClick={handleFeedbackSubmit}
                    >
                        Submit
                    </button>
                </div>
            )}

            {feedbacks.length === 0 ? (
                <div className="no-feedbacks">
                    <p>No feedbacks available</p>
                </div>
            ) : (
                <div className="feedbacks-container">
                    {feedbacks.map((feedback) => (
                        <div key={feedback._id} className="feedback-card">
                            <p><b>FEEDBACK:</b> {feedback.feedback}</p>
                            <p><b>CITY:</b> {feedback.city}</p>
                            {feedback.remarks && <p><b>REMARKS:</b> {feedback.remarks}</p>}
                            
                            {role === 'official' && (
                                <>
                                    <button 
                                        className="submit-feedback-btn"
                                        onClick={() => fetchSentiment(feedback.feedback, feedback._id)}
                                    >
                                        Show Sentiment
                                    </button>
                                    {sentiments[feedback._id] && (
                                        <p><b>SENTIMENT:</b> {sentiments[feedback._id]}</p>
                                    )}
                                </>
                            )}

                            {role === 'user' && (
                                <div className="remark-section">
                                    <input 
                                        type="text" 
                                        placeholder="Enter remark" 
                                        className="remark-input"
                                        value={remarkText}
                                        onChange={handleRemarkChange}
                                    />
                                    <button 
                                        className="remark-btn" 
                                        onClick={() => handleRemarkSubmit(feedback.feedback)}
                                    >
                                        Submit Remark
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeedbackPage;
