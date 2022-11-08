import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute';
import CardList from './CardList.js';

const App = () => {
    const [userData, setUserData] = useState({
        username: '', email: ''
    })
    const [loggedIn, setLoggedIn] = useState(true);
    const [loading, setLoading] = useState(false);

    const cbLogin = useCallback(async ({ username, password }) => {


    }, []);

    const cbRegister = useCallback(async ({ username, password, email }) => {

    }, []);

    const cbLogout = useCallback(() => {

    }, []);

    const cbTokenCheck = useCallback(async () => {

    }, []);

    // useEffect(cbTokenCheck, [cbTokenCheck]);

    if (loading) {
        return '...Loading';
    }

    return (<BrowserRouter>
        <Routes>
            <Route path="/sign-in" element={<Login isLoggedId={loggedIn} onLogin={cbLogin} />} />
            <Route path="/sign-up" element={<Register onRegister={cbRegister} />} />
            <Route element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
            <Route path="/" element={
                <ProtectedRoute loggedIn={loggedIn}>
                    <CardList />
                </ProtectedRoute>
            } />


        </Routes>
    </BrowserRouter>)
}

export default App;