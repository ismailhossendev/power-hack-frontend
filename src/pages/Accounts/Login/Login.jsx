import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { mainContext } from '../../../Contexts/MainContext';

const Login = () => {
    const { reFresh, setReFresh } = React.useContext(mainContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        reg(e.target.email.value, e.target.password.value);
    };

    const reg = (email, password) => {
        const url = 'https://power-hack-one.vercel.app/api/login';
        const data = {
            email,
            password,
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                if (!data.token) {
                    toast.error(data.message);
                    return;
                }
                toast.success(data.message);
                localStorage.setItem("powerToken", data.token);
                setReFresh(!reFresh);
                navigate('/billing');
                window.location.href = '/billing';
            });
    };


    return (
        <div className='flex justify-center items-center'>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100" bis_skin_checked="1">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm" bis_skin_checked="1">
                        <label for="email" className="block dark:text-gray-400">Email</label>
                        <input type="text" name="email" id="email" placeholder="email" className="w-full input" />
                    </div>
                    <div className="space-y-1 text-sm" bis_skin_checked="1">
                        <label for="password" className="block dark:text-gray-400">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" className="w-full input" fdprocessedid="x4918f" />
                        <div className="flex justify-end text-xs dark:text-gray-400" bis_skin_checked="1">
                        </div>
                    </div>
                    <button className="block w-full p-3 text-center rounded-sm dark:text-gray-900 dark:bg-violet-400">Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default Login;