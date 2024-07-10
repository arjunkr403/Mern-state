import React from "react";
import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg m-auto">
      <h1 className="text-3xl text-rnd font-semibold text-center my-7">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <img
          className="rounded-full h-24 w-24 object-cover self-center mt-4 cursor-pointer"
          src={currentUser.avatar}
          alt="Profile"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="rounded-lg p-3 uppercase bg-rnd my-2 text-txt2 hover:opacity-95 disabled:opacity-80">Update</button>
        {/* <button className="rounded-lg p-3 uppercase bg-rnd my-2 text-txt2 hover:opacity-95 ">Create listing</button> */}
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
