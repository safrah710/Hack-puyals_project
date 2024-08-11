import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Array of Tamil Nadu districts
const tamilNaduDistricts = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
    "Dharmapuri", "Dindigul", "Kallakurichi", "Kanchipuram", "Kanyakumari",
    "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal",
    "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet",
    "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni",
    "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur",
    "Tiruvannamalai", "Vellore", "Viluppuram", "Virudhunagar"
];

const AddIdeaPage = () => {
    const [formData, setFormData] = useState({
        Name: '',
        email: '',
        date: '',
        idea: '',
        district: '',
        city: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.Name) formErrors.Name = 'Name is required';
        if (!formData.email) formErrors.email = 'Email is required';
        if (!formData.date) formErrors.date = 'Date is required';
        if (!formData.idea) formErrors.idea = 'Idea description is required';
        if (!formData.district) formErrors.district = 'District is required';
        if (!formData.city) formErrors.city = 'City is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const res = await axios.post('http://localhost:10000/idea/add_idea', formData);

            if (res.status === 200) {
                toast.success('Idea added successfully');
                setFormData({
                    Name: '',
                    email: '',
                    date: '',
                    idea: '',
                    district: '',
                    city: ''
                });
                setErrors({});
            }
        } catch (err) {
            console.error('Error adding idea:', err);
            toast.error('Error adding idea');
        }
    };

    return (
        <div className="add-idea-page" style={{
            maxWidth: '600px',
            margin: 'auto',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>
            <h2>Add New Idea</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="Name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
                    <input 
                        type="text" 
                        id="Name" 
                        name="Name" 
                        value={formData.Name} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                    {errors.Name && <p style={{ color: 'red', marginTop: '5px' }}>{errors.Name}</p>}
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                    {errors.email && <p style={{ color: 'red', marginTop: '5px' }}>{errors.email}</p>}
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="date" style={{ display: 'block', marginBottom: '5px' }}>Date:</label>
                    <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                    {errors.date && <p style={{ color: 'red', marginTop: '5px' }}>{errors.date}</p>}
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="idea" style={{ display: 'block', marginBottom: '5px' }}>Idea Description:</label>
                    <textarea 
                        id="idea" 
                        name="idea" 
                        value={formData.idea} 
                        onChange={handleChange}
                        rows="4"
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                    {errors.idea && <p style={{ color: 'red', marginTop: '5px' }}>{errors.idea}</p>}
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="district" style={{ display: 'block', marginBottom: '5px' }}>District:</label>
                    <select 
                        id="district" 
                        name="district" 
                        value={formData.district} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    >
                        <option value="">Select a district</option>
                        {tamilNaduDistricts.map((district, index) => (
                            <option key={index} value={district}>{district}</option>
                        ))}
                    </select>
                    {errors.district && <p style={{ color: 'red', marginTop: '5px' }}>{errors.district}</p>}
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="city" style={{ display: 'block', marginBottom: '5px' }}>City:</label>
                    <input 
                        type="text" 
                        id="city" 
                        name="city" 
                        value={formData.city} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                    {errors.city && <p style={{ color: 'red', marginTop: '5px' }}>{errors.city}</p>}
                </div>
                <button 
                    type="submit" 
                    style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddIdeaPage;
