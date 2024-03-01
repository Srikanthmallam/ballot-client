import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../context/userContex";


const Header = () => {

  const {currUser} = useContext(UserContext);
  return (
    <>
      {currUser ? (
        <div className=" fixed p-6 font-bold text-xl">
          <Link to="/logout">Logout</Link>
        </div>
      ) : (
        <div className=" fixed p-6 font-bold text-xl">
          <Link to="/login">Ajith</Link>
        </div>
      )}
    </>
  );
}

export default Header
