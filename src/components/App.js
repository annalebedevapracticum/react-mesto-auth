import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute';
import CardList from './CardList.js';
import Header from './Header.js';
import InfoTooltip from './InfoTooltip.js';
import { apiInstance } from '../utils/Api.js';

const App = () => {
    const [userData, setUserData] = useState({
        _id: '', email: ''
    })
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState(window.location.pathname);
    const [loading, setLoading] = useState(false);
    const [infoTooltipData, setInfoTooltipData] = useState({ visibility: false, isError: false });

    const cbLogin = useCallback(async ({ email, password }) => {
        setLoading(true);
        try {
            const { token } = await apiInstance.authorize({ email, password });
            localStorage.setItem('token', token);
            setLoggedIn(true);
            return Promise.resolve();
        } catch {
            setInfoTooltipData({ visibility: true, isError: true });
        } finally {
            setLoading(false);
        }
    }, []);

    const cbRegister = useCallback(async ({ email, password }) => {
        setLoading(true);
        try {
            await apiInstance.register({ email, password });
            setInfoTooltipData({ visibility: true, isError: false });
        } catch {
            setInfoTooltipData({ visibility: true, isError: true });
        } finally {
            setLoading(false);
        }
    }, []);

    const cbLogout = useCallback(() => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    }, []);

    const cbTokenCheck = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('no token');
            }
            const { data } = await apiInstance.checkMe(token);
            if (data.email) {
                setLoggedIn(true);
                setUserData(data);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const handleLoginClick = () => {
        setCurrentPage('/sign-in');
    }
    const handleRegistrationClick = () => {
        setCurrentPage('/sign-up');
    }

    const handleInfoClose = () => {
        setInfoTooltipData({ isError: false, visibility: false });
    }

    useEffect(() => {
        cbTokenCheck();
    }, [loggedIn]);

    // if (loading) {
    //     return '...Loading';
    // }

    return (
        <div className="wrapper">
            <div className="page">
                <BrowserRouter>
                    {loggedIn && <Navigate to='/' />}
                    <Header
                        isLogged={loggedIn}
                        currentPage={currentPage}
                        handleLoginClick={handleLoginClick}
                        handleRegistrationClick={handleRegistrationClick}
                        onLogOut={cbLogout}
                        email={userData.email}
                    />
                    <div className="content">
                        <Routes>
                            <Route path="/sign-in" element={<Login isLoggedId={loggedIn} onLogin={cbLogin} />} />
                            <Route path="/sign-up" element={<Register onRegister={cbRegister} handleLoginClick={handleLoginClick} />} />
                            <Route path="/" element={
                                <ProtectedRoute loggedIn={loggedIn}>
                                    <CardList />
                                </ProtectedRoute>
                            } />
                        </Routes>
                        <InfoTooltip isError={infoTooltipData.isError} isOpen={infoTooltipData.visibility} onClose={handleInfoClose} />
                    </div>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App;