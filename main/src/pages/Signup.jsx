import React from "react";
import { Link } from "react-router-dom";

export default function Signup(){
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-rnd text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-4 ">
                <input type="text" placeholder="username" className="border p-3 rounded-lg" id="username" />
                <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" />
                <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" />
                <button className="bg-rnd rounded-lg text-txt2 p-3 uppercase hover:opacity-95 disabled:opacity-80">Sign up</button>
            </form>
            <div className="flex gap-2 mt-5 ml-1">
                <p>Have an account?</p>
                <Link to={'/sign-in'}>
                    <span className="text-blue-700 font-semibold">Sign in</span>
                </Link>
            </div>
        </div>
    )
}