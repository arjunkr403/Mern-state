import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import OAuth from "../components/OAuth";

export default function Signup() {
    const [formData,setFormData]=useState({});
    const [error,setError]=useState(null);
    const [loading,setLoading]= useState(false);
    const nav=useNavigate();
    const hchange = (e)=>{
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }
    const hsubmit = async (e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/back/auth/signup',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            if (!res.ok) { // Check for HTTP errors
                setError(data.message || "An error occurred");
                setLoading(false);
                return;
              }
        
            if(data.success===false){
                setError(data.message);
                setLoading(false);
                return;
            }
            setLoading(false);
            setError(null);
            nav('/sign-in');
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };
    // console.log(formData);

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-rnd text-center font-semibold my-7">Sign Up</h1>
            <form onSubmit={hsubmit} className="flex flex-col gap-4 ">
                <input type="text" placeholder="username" className="border p-3 rounded-lg" id="username" onChange={hchange}/>
                <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" onChange={hchange}/>
                <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" onChange={hchange}/>
                <button disabled={loading} className="bg-rnd my-2 rounded-lg text-txt2 p-3 uppercase hover:opacity-95 disabled:opacity-80">{loading ?'Loading...': 'Sign Up'}</button>
                <OAuth/>
            </form>
            <div className="flex gap-2 mt-5 ml-1">
                <p>Have an account?</p>
                <Link to={'/sign-in'}>
                    <span className="text-blue-700 font-semibold">Sign in</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
    )
}