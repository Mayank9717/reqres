"use client";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Userview from "./components/Userview";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRender, setIsRender] = useState(false);
  useEffect(() => {
    const storedUserData = localStorage.getItem("userDataStorage");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    setIsRender(true);
  }, [loading]);
  const handleSubmit = (data) => {
    setLoading(true);
    localStorage.setItem("userDataStorage", JSON.stringify(data));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      {userData !== null && !loading ? (
        <Userview />
      ) : (
        isRender && <Login onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default Home;
