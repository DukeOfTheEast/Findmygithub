"use client";
import Link from "next/link";
import { useState } from "react";
import Repo from "./repos/repo/page";

const Myrepos = () => {
  const [apiData, setApiData] = useState([]);
  const [user, setUser] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleApiCall = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${inputValue}/reposj`
      );
      console.log(response);
      if (!response.ok) {
        setApiData([]);
        setError("Something went wrong");
        return;
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      setApiData(data);
    } catch (error) {
      console.error("Error:", error);
      setApiData([]);
      setError(error.message || "Something went wrong");
    }
  };
  if (error) {
    return (
      <div className="bg-gray-600 h-screen bg-gradient-to-r grid place-content-center from-slate-800 to-slate-400">
        <p className="text-red-500 text-xl font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-600 h-full bg-gradient-to-r from-slate-800 to-slate-400">
      <div className="md:mx-96 flex justify-center items-center">
        <form className="border rounded-3xl my-20 bg-white">
          <input
            type="text"
            placeholder="Github Username"
            className="border-2 focus:outline-none p-3 border-none rounded-3xl w-96 rounded-r-none"
            onChange={handleChange}
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
