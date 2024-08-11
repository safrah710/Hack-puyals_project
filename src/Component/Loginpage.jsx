import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiRoutes from '../Utils/Apirouter';
import service from '../Utils/service';
import toast from 'react-hot-toast';

export default function SignInPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await service.post('http://localhost:10000/login/user', { email, Password });
            if (res.status === 200) {
                toast.success('Successfully Logged in');
                sessionStorage.setItem('Token',res.data.token);
                sessionStorage.setItem('role',res.data.role);
                sessionStorage.setItem('name',res.data.Name);
                sessionStorage.setItem('city',res.data.city);
                setEmail('');
                setPassword(''); 
                navigate('/dashboard')
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
            <h2>Sign in to us</h2>
            <form className="sign-in-form" onSubmit={handleSubmit}>
                <p>
                    <label>Email address</label><br />
                    <input
                        type="text"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </p>
                <p>
                    <label>Password</label><br />
                    <input
                        type="password"
                        name="password"
                        required
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
                <footer className="form-footer">
                    <p><Link to="/sign_up">Sign_up</Link></p>
                    <p><Link to="/forgot_pswd">Forgot password?</Link></p>
                    <p><Link to="/">Back to Homepage</Link></p>
                </footer>
            </form>
        </div>
    );
}
