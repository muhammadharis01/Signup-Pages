import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let fail = validateUsername(formData.username)
        fail += validatePassword(formData.password)
        fail += validateEmail(formData.email)

        if   (fail === "") {
            axios.post('http://localhost/login-pages/create_user.php', formData)
            .then(response => {
                console.log("Response from backend:", response);
                if (response.data && response.data.message) {
                    alert(response.data.message); // Handle the response
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }
        else { 
            alert(fail)
            return false
        }
    }

    function validateUsername(field) {
        if (field === "") return "No Username was entered.\n"
        else if (field.length < 5)
            return "Usernames must be at least 5 characters.\n"
        else if (/[^a-zA-Z0-9_-]/.test(field))
            return "Only a-z, A-Z, 0-9, - and _ allowed in Usernames.\n"
        return ""
    }

    function validatePassword(field) {
        if (field === "") return "No Password was entered.\n"
        else if (field.length < 6)
            return "Passwords must be at least 6 characters.\n"
        else if (!/[a-z]/.test(field) || ! /[A-Z]/.test(field) ||
            !/[0-9]/.test(field))
            return "Passwords require one each of a-z, A-Z and 0-9.\n"
        return ""
    }

    function validateEmail(field) {
        if (field === "") return "No Email was entered.\n"
        else if (!((field.indexOf(".") > 0) &&
            (field.indexOf("@") > 0)) ||
            /[^a-zA-Z0-9.@_-]/.test(field))
            return "The Email address is invalid.\n"
        return ""
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Signup Form</h1>
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
