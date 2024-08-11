import React from 'react';
import { Link } from 'react-router-dom';

export default function ForgetPasswordPage() {
    return (
        <div className="container text-center m-5-auto">
            <h2>Reset your password</h2>
            <h5>Enter your registered email address to reset password</h5>
            <form className="reset-password-form">
                <p>
                    <label id="reset_pass_lbl">Email address</label><br/>
                    <input type="email" name="email" required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Send password reset email</button>
                </p>
                <footer className="form-footer">
                    <p><Link to="/">Back to Homepage</Link></p>
                </footer>
            </form>
        </div>
    );
}
