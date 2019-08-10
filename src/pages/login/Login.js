import React, { useState } from 'react';
import logo from '../../assets/logo.svg';
import api from '../../services/Api';
import './Login.css';

export default function Login({history}) {
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.post('/devs', {
            username
        });
        console.log('response => ', response);

        const {_id} = response.data.data;

        history.push(`/dev/${_id}`);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="tindev" />
                <input 
                    placeholder="Digite seu usuário no github" 
                    value={username}
                    onChange={e => setUsername(e.target.value) }
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
        
    );
}