import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContex";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [lucky, setLucky] = useState();

  const { currUser } = useContext(UserContext);
  const navigate = useNavigate();

  const token = currUser?.token;

  const getRandomNumber = () => {
    const min = 1;
    const max = users.length;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fecthUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/users`
        );
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fecthUsers();
  }, []);

  const pickOne = async () => {
    const random = getRandomNumber();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/users/${random}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const user = await response.data;
      setLucky(user[0])
    } catch (err) {
      console.log(err);
    }
  };
  console.log(lucky)



  return (
    <div className="grid place-content-center h-screen">
      {!lucky && (
        <div>
          <h1 className="mb-2 font-bold grid place-content-center ">
            Total Participates : {users.length}
          </h1>
          {users.length > 0 ? (
            <div className="details p-4 border border-gray-300 rounded-md overflow-auto max-h-96 w-64  mb-4">
              {users.map((user) => (
                <div key={user._id} className=" flex justify-between mb-4">
                  <h1 className="font-semibold ">{user.username} </h1>
                  <h1>{user.number}</h1>
                </div>
              ))}
            </div>
          ) : (
            <h2>No Participates</h2>
          )}
          <button
            onClick={pickOne}
            className="mb-4 py-2 px-3 rounded-md font-bold bg-purple-900 w-full"
          >
            pick one
          </button>
        </div>
      )}

      {lucky && (
        <div>
          <h1 className="text-3xl mb-24 grid place-content-center font-semibold">
            Hurray
          </h1>{" "}
          <div className="">
            <div className="flex p-3 justify-between">
              <h1 className="text-4xl mb-3 grid place-content-center font-semibold">
                insta_id : &nbsp; 
              </h1>
              <h1 className="text-4xl mb-3 grid place-content-center font-semibold">
                 {lucky.username}
              </h1>
            </div>
            <h1 className=" text-4xl grid place-content-center font-semibold">
              token : {lucky.number}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
