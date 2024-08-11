import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import service from '../Utils/service';
import toast from 'react-hot-toast';

export default function SignUpPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Name: '',
        email: '',
        Password: '',
        con_password: '',
        District: '',
        City: '',
        Age: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.Password !== formData.con_password) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            let res = await service.post('http://localhost:10000/login/create_user', formData);
            if (res.status === 201) {
                toast.success('Account successfully created');
                setFormData({
                    Name: '',
                    email: '',
                    Password: '',
                    con_password: '',
                    District: '',
                    City: '',
                    Age: '',
                });
                navigate('/sign_in');
            } else if (res.status === 400) {
                toast.error(res.data.message || 'Bad Request');
            } else if (res.status === 500) {
                toast.error(res.data.message || 'Server Error');
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred');
        }
    };

    return (
        <div className="container text-center m-5-auto">
            <h2>Sign up with us</h2>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <p>
                    <label>Name</label><br />
                    <input
                        type="text"
                        name="Name"
                        required
                        value={formData.Name}
                        onChange={handleChange}
                    />
                </p>
                <p>
                    <label>Email address</label><br />
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </p>
                <p>
                    <label>Password</label><br />
                    <input
                        type="password"
                        name="Password"
                        required
                        value={formData.Password}
                        onChange={handleChange}
                    />
                </p>
                <p>
                    <label>Confirm Password</label><br />
                    <input
                        type="password"
                        name="con_password"
                        required
                        value={formData.con_password}
                        onChange={handleChange}
                    />
                </p>
                <p>
                    <label>District</label><br />
                    <input
                        type="text"
                        name="District"
                        required
                        value={formData.District}
                        onChange={handleChange}
                    />
                </p>
                <p>
                    <label>City</label><br />
                    <input
                        type="text"
                        name="City"
                        required
                        value={formData.City}
                        onChange={handleChange}
                    />
                </p>
                <p>
                    <label>Age</label><br />
                    <input
                        type="number"
                        name="Age"
                        required
                        value={formData.Age}
                        onChange={handleChange}
                    />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Sign Up</button>
                </p>
                <footer className="form-footer">
                    <p><Link to="/sign_in">Already have an account? Sign in</Link></p>
                    <p><Link to="/">Back to Homepage</Link></p>
                </footer>
            </form>
        </div>
    );
}
