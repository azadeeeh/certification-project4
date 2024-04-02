import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false); // State to track login success

    const handleSubmit = async (e) => {
        e.preventDefault();
        //setError(''); //reset error msg when there is new sunmission
        try {
            //console.log('Submitting login form');
            const response = await axios.post('/api/login', { name: username, password });
            //console.log('Login request response:', response);
            //Handle successful login
            console.log('Login successful:', response.data);
            setLoginSuccess(true);
            setError(''); //reset with new submission
        } catch (error) {
            //Handle error
            console.error('Login error:', error);
            setLoginSuccess(false);
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {/* Display success message */}
            {loginSuccess && <p style={{ color: 'green' }}>Login successful!</p>}
            {/* Display error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}


            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="name" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
