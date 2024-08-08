import {FaSearch} from  'react-icons/fa'; 
import { Link,useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const {currentUser} = useSelector((state) => state.user);
  const [searchTerm,setSearchTerm]=useState('');
  const nav=useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault(); //prevent refresh on submit
    const url = new URLSearchParams(window.location.search);
    url.set('searchTerm',searchTerm); //change the given search term in url from the searchterm we are submitting inside search box without changing the rest of the url query
    const searchQuery =url.toString();//change the updated url back into string
    nav(`/search?${searchQuery}`);
  };

  useEffect(()=>{
    //create instance of URLsearchparams from location.search property
    const url = new URLSearchParams(location.search);
    //using get method it store value of searchTerm in searchFromUrl
    const searchFromUrl=url.get('searchTerm');
    //if searchFromUrl is not null then change the searchTerm variable using setSearchTerm component state
    if(searchFromUrl){
      setSearchTerm(searchFromUrl);
    }
  },[])


  return (

    <header className='bg-back shadow-md'>
        <div className='flex justify-between items-center max-w-7.5xl mx-auto p-2'>
         <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex-wrap'>
            <span className='text-txt1'>Good</span>
            <span className='text-txt2'>Homes</span>
        </h1>
         </Link>   
        <form onSubmit={handleSubmit} className='bg-txt2 rounded-lg flex items-center p-3 '>
            <input type="text-rnd" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm} 
            onChange={(e)=>setSearchTerm(e.target.value)}/>
            <button>
            <FaSearch className='text-rnd'/>
            </button>
        </form>
        <ul className='flex gap-4'>
            <Link to='/'>
            <li className='hidden sm:inline text-txt2 hover:underline'>Home</li>
            </Link>
            <Link to='about'>
            <li className='hidden sm:inline text-txt2 hover:underline'>About</li>
            </Link>
            <Link to='/profile'>
            {currentUser?(
              <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile" />
            ):(
              <li className='hidden sm:inline text-txt2 hover:underline'>Sign in</li>
            )}
            </Link>
        </ul>
        </div>
    </header>
  )
}
