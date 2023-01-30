import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { mainContext } from '../Contexts/MainContext';

const Header = () => {
    const { user, setReFresh, reFresh, total, } = useContext(mainContext)


    const handleLogOut = () => {
        localStorage.removeItem('powerToken')
        setReFresh(!reFresh)
    }

    return (
        <div className="navbar bg-base-100 container mx-auto p-2">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">

                        <Link to='/login' className='btn btn-accent'>Login</Link>
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Power-Hack</Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {user ?
                        <>
                            <h1 className='text-xl font-semibold flex items-center px-3 text-white border rounded mr-5'>Paid Total: {total}</h1>
                            <button
                                onClick={handleLogOut}
                                className='btn btn-error'>Logout</button>
                        </> :
                        <>
                            <Link to='/register' className='btn btn-accent mr-2'>Register</Link>
                            <Link to='/login' className='btn btn-accent'>Login</Link>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Header;