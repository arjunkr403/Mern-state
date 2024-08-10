import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function OAuth() {
    const dispatch=useDispatch();
    const nav=useNavigate();
    const handlegoogle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const res = await fetch('/back/auth/google', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({ 
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
        });
        const data=await res.json()
        dispatch(signInSuccess(data));
        nav("/");
         
        }catch (error) {
            console.log("Couldn't sign in with google", error);
    }
}
return (
    <button onClick={handlegoogle} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
        Continue with google
    </button>
)
}
