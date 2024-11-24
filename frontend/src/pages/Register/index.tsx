import './styles.scss'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import Button from '../../components/Button'
import Input from '../../components/Input'

export const Register = () => {
    const { register, setIsAuthenticated } = useAuth()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()

    const handleRegister = async () => {
        fetch('http://localhost:5001/logins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail: email,
                password: password
            })
        }).then(response => response.json())
            .then(() => { navigate('/login') })
            .catch(error => {
                console.error('Error:', error)
                alert("Error: " + error)
            })
    };

    return (
        <div className='register-card'>
            <div className='register-header'>
                <h1>Register</h1>
            </div>
            <div className='register-content'>
                <Input
                    label='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    name='Email'
                />
                <Input
                    label='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    name='Password'
                />
                <Button onClick={handleRegister} label='Register' className='register-button' />
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    )
}
