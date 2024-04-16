import {FaSearch} from  'react-icons/fa'; 
import { Link } from 'react-router-dom';

export default function Header() {
  return (

    <header className='bg-back shadow-md'>
        <div className='flex justify-between items-center max-w-7.5xl mx-auto p-2'>
         <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex-wrap'>
            <span className='text-txt1'>Good</span>
            <span className='text-txt2'>Homes</span>
        </h1>
         </Link>   
        <form className='bg-txt2 rounded-lg flex items-center p-3'>
            <input type="text-rnd" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <FaSearch className='text-rnd'/>
        </form>
        <ul className='flex gap-4'>
            <Link to='/'>
            <li className='hidden sm:inline text-txt2 hover:underline'>Home</li>
            </Link>
            <Link to='about'>
            <li className='hidden sm:inline text-txt2 hover:underline'>About</li>
            </Link>
            <Link to='sign-in'>
            <li className='hidden sm:inline text-txt2 hover:underline'>Sign in</li>
            </Link>
        </ul>
        </div>
    </header>
  )
}
