"use client";
import Link from "next/link";
import { useState, useRef } from "react";

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
        // setApiResponse(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div>
      <input
        ref={userRef}
        type="text"
        placeholder="Github Username"
        className="border-solid border-2 border-indigo-600"
        onChange={getUser}
      />

      <button onClick={handleApiCall} className="cursor-pointer bg-orange-700">
        <Link href="/">Submit</Link>
      </button>

      <ul>
        {apiData?.map((repo) => (
          <li key={repo.id}>
            <h3 className="text-blue-600">{repo.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Myrepos;
