import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const Home = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState("");
  const [user,setUser] = useState('')
  const [msg,setMsg] = useState('')
  const [total,setTotal] = useState(0)

  const [isLoading,setIsLoading] = useState(false);

  const changeinpuhandler = (e) => {
    setName(e.target.value);
    setError('')
  };

  const participate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users`,
        {name}
      );
      if(response.status === 201){
        setUser(response.data);
        setMsg("success")
      }
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  useEffect(()=>{
    const getUsers = async() => {
      setIsLoading(true);
      try {
        const resposne = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/users`
        );
        const users = resposne.data;
        setTotal(users.length)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    }
    getUsers();
  },[])



  return (
    <div className="grid place-content-center h-screen">
      {isLoading && <Loader />}
      {!msg && (
        <h3 className="mb-20 grid place-content-center font-semibold text-2xl">
          Total Participants: {total}
        </h3>
      )}
      {error && (
        <p className="grid place-content-center font-semibold text-xl mb-4">
          {error}
        </p>
      )}
      {msg ? (
        <p className="grid place-content-center font-semibold text-2xl mb-4">
          {msg}
        </p>
      ) : (
        <form onSubmit={participate}>
          <input
            type="text"
            placeholder="insta_id"
            value={name}
            onChange={changeinpuhandler}
            className="p-1 mb-3 rounded-md text-black w-full font-semibold"
          />
          <button
            type="submit"
            className="block w-full  mb-4 py-2 px-3 rounded-md font-bold bg-purple-900 text-xl"
          >
            Participate
          </button>
        </form>
      )}

      {user && (
        <div>
          <h1 className=" mb-3 grid place-content-center font-semibold text-xl">
            insta_id &nbsp; : &nbsp; {user.username}
          </h1>
          <h1 className="grid place-content-center font-semibold text-xl">
            token &nbsp; : &nbsp; {user.number}
          </h1>

          <small className="block mt-5 grid place-content-center"></small>
        </div>
      )}
    </div>
  );
};

export default Home;
