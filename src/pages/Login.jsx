import React, { useState,useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

import {UserContext} from '../context/userContex.jsx'

const Login = () => {
  const [userData,setUserData] = useState({
    email:"",
    password:"",
  });

  const [error,setError] = useState('');

  const navigate = useNavigate();

  const { setCurrUser } = useContext(UserContext);

  const changeInputHandler = (e) =>{
    setUserData((prevState) => {
      return {...prevState,[e.target.name]:e.target.value}
    });
  };

  const loginUser = async(e) =>{
    e.preventDefault();
    setError('');
    try{
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/login`,userData);
      const user = response.data;
      setCurrUser(user);
      navigate('/admin')
    }catch(err){
      setError(err.response?.data?.message)
    }
  };

  return (
    <div className=" grid place-content-center h-screen">
      {error && <p className='w-64 px-2 py-1 mb-3 bg-red-500 rounded-md'>{error}</p>}
      <form onSubmit={loginUser}>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={userData.email}
          onChange={changeInputHandler}
          autoFocus
          className="block p-1 mb-3 rounded-md text-black w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={userData.password}
          onChange={changeInputHandler}
          autoFocus
          className="block p-1 mb-3 rounded-md text-black w-full"
        />
        <button type='submit' className="mb-4 py-2 px-3 rounded-md font-bold bg-purple-900 w-full">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login
