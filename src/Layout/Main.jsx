import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../ShareComponents/Header';

const Main = () => {
    return (
        <div className='min-h-screen relative'>
            <Header />
            <Outlet />
        </div>
    );
};

export default Main;