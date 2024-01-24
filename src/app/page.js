"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import Repo from "./repos/repo/page";

const Myrepos = () => {
  const [apiData, setApiData] = useState([]);
  const [user, setUser] = useState("");

  const userRef = useRef();

  const getUser = () => {
    setUser(userRef.current.value);
  };

  const handleApiCall = () => {
    fetch(`https://api.github.com/users/${user}/repos`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    userRef.current.value = "";
  };

  return (
    <div className="bg-gray-600 h-full bg-gradient-to-r from-slate-800 to-slate-400">
      <div className="md:mx-96 flex justify-center items-center">
        <form className="border rounded-3xl my-20 bg-white">
          <input
            ref={userRef}
            type="text"
            placeholder="Github Username"
            className="border-2 focus:outline-none p-3 border-none rounded-3xl w-96 rounded-r-none"
            onChange={getUser}
          />

          <button
            onClick={handleApiCall}
            className="cursor-pointer bg-slate-700 p-3 px-8 rounded-3xl text-white"
          >
            <Link href="/">Submit</Link>
          </button>
        </form>
      </div>
      <div className="m-16">
        <ul className="flex flex-wrap items-center justify-center gap-4 pb-20">
          {apiData?.map((repo) => (
            <li
              key={repo.id}
              className="shadow-2xl bg-white p-5 rounded-md w-40 "
            >
              {/* <Link href={"/repos/repo"}> */}
              <Link href={`https://github.com/${user}/${repo.name}`}>
                <h2 className="text-lg">{repo.name}</h2>
                <h3>Size: {repo.size}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Myrepos;
