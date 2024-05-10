import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const Userview = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://reqres.in/api/users?page=${currentPage}`
        );
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = async () => {
    if (searchQuery !== "") {
      try {
        const response = await axios.get(
          `https://reqres.in/api/users/${searchQuery}`
        );
        setUsers([response.data.data]);
        setTotalPages(1);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    } else {
      try {
        const response = await axios.get(
          `https://reqres.in/api/users?page=${currentPage}`
        );
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <section id="testimonies" className="py-10 min-h-screen bg-slate-900">
      <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
        <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
          <div className="mb-8 space-y-5 md:mb-8 md:text-center">
            <h1 className="mb-5 text-2xl font-semibold text-white md:text-center md:text-3xl">
              Hello ReqRes Users!
            </h1>
            <div className="md:flex justify-between items-center block">
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Search by ID"
                  value={searchQuery}
                  onChange={(e) => {
                    const sanitizedValue = e.target.value.replace(/\D/g, "");
                    setSearchQuery(sanitizedValue);
                  }}
                  onKeyPress={(e) => {
                    if (isNaN(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  className="w-64 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
                <button
                  className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>

              <div className=" flex justify-center md-mt-0 mt-6">
                <button
                  className="mx-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="mx-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {users &&
            users.map((user) => (
              <li className="text-sm leading-6" key={user.id}>
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>

                  <div className="cursor-pointer relative p-4 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                    <div className="flex items-center justify-center space-x-4">
                      {" "}
                      <div>
                        <h3 className="text-lg font-semibold text-white text-center">
                          {`${user?.first_name} ${user?.last_name}`}
                        </h3>
                        <p className="text-gray-500 text-md">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      <Image
                        src={user?.avatar}
                        className="w-28 h-28 bg-center bg-cover border rounded-full"
                        alt={user?.first_name}
                        width={150}
                        height={150}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Userview;
