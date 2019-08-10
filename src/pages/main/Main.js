import React, {useEffect, useState} from 'react';
import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';
import './Main.css';
import api from '../../services/Api';
import { Link } from 'react-router-dom';

export default function Main({ match }) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            });
            if (response.data.status === 'success') {
                setUsers(response.data.data);
            }
        })();
    }, [
        match.params.id
    ]);

    async function handleLike(userId) {
        const response = await api.post(`/devs/${userId}/like`, null, {
            headers: {
                user: match.params.id
            }
        });
        if (response.data.status === 'success') {
            setUsers(users.filter((user) => user._id !== userId));
        }
    }

    async function handleDislike(userId) {
        const response = await api.post(`/devs/${userId}/dislike`, null, {
            headers: {
                user: match.params.id
            }
        });
        if (response.data.status === 'success') {
            setUsers(users.filter((user) => user._id !== userId));
        }
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="tindev" />
            </Link>
            
                {
                    users.length > 0 ?
                        (
                            <ul>
                                {
                                    users.map((iteratedUser) =>  
                                        (
                                            <li key={iteratedUser._id}>
                                                <img src={iteratedUser.avatar} alt="" />
                                                <footer>
                                                    <strong>{iteratedUser.name}</strong>
                                                    <p>{iteratedUser.bio}</p>
                                                </footer>
                                                <div className="buttons">
                                                    <button type="button">
                                                        <img src={dislike} alt="Dislike" onClick={() => handleDislike(iteratedUser._id)} />
                                                    </button>

                                                    <button type="button">
                                                        <img src={like} alt="Like" onClick={() => handleLike(iteratedUser._id)} />
                                                    </button>
                                                </div>
                                            </li>
                                        )
                                    )
                                }
                            </ul>
                        )
                    : 
                    (
                        <div className="empty">
                            Sorry! acabou... :(
                        </div>
                    )
                }
        </div>
    );
}