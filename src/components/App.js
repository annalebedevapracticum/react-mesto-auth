import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute';
import CardList from './CardList.js';
import Header from './Header.js';
import InfoTooltip from './InfoTooltip.js';
import { apiInstance } from '../utils/Api.js';

const App = () => {
    const [userData, setUserData] = useState({ _id: '', email: '' });
    const [loggedIn, setLoggedIn] = useState(false);
    const [infoTooltipData, setInfoTooltipData] = useState({ visibility: false, isError: false });

    const cbLogin = async ({ email, password }) => {
        try {
            const { token } = await apiInstance.authorize({ email, password });
            localStorage.setItem('token', token);
            setLoggedIn(true);
            return Promise.resolve();
        } catch {
            setInfoTooltipData({ visibility: true, isError: true });
        }
    };

    const cbRegister = async ({ email, password }) => {
        try {
            await apiInstance.register({ email, password });
            setInfoTooltipData({ visibility: true, isError: false });
        } catch {
            setInfoTooltipData({ visibility: true, isError: true });
            throw new Error('registrtion error');
        }
    };

    const cbLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    const cbTokenCheck = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('no token');
        }
        const { data } = await apiInstance.checkMe(token);
        if (data.email) {
            setLoggedIn(true);
            setUserData(data);
        }
    };

    const handleInfoClose = () => {
        setInfoTooltipData({ isError: false, visibility: false });
    }

    useEffect(() => {
        cbTokenCheck();
    }, [loggedIn]);

    return (
        <div className="wrapper">
            <div className="page">
                <BrowserRouter>
                    {loggedIn && window.location.pathname !== '/' && <Navigate to='/' />}
                    <div className="content">
                        <Routes>
                            <Route path="/sign-in" element={<>
                                <Header
                                    onLogOut={cbLogout}
                                    email={userData.email}
                                />
                                <Login isLoggedId={loggedIn} onLogin={cbLogin} />
                            </>} />
                            <Route path="/sign-up" element={<>
                                <Header
                                    isSignUp
                                    onLogOut={cbLogout}
                                    email={userData.email}
                                />
                                <Register onRegister={cbRegister} />
                            </>} />
                            <Route path="/" element={
                                <ProtectedRoute loggedIn={loggedIn}>
                                    <Header
                                        isLogged
                                        onLogOut={cbLogout}
                                        email={userData.email}
                                    />
                                    <CardList />
                                </ProtectedRoute>
                            } />
                        </Routes>
                        {infoTooltipData.visibility && <InfoTooltip isError={infoTooltipData.isError} isOpen={infoTooltipData.visibility} onClose={handleInfoClose} />}
                    </div>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App;