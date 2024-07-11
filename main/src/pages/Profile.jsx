import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const [formData,setformData]=useState({});// empty object

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]); // if there is a file i.e [file] call this function

  const handleFileUpload = (file) => {
    const storage = getStorage(app); // app from firebase.js to recognise which storage to use
    const fileName = new Date().getTime() + file.name; //always unique name
    const storageRef = ref(storage, fileName); //reference created for the file to be stored
    const uploadTask = uploadBytesResumable(storageRef, file); //uploading the file to the storage

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    },
      (error)=>{
        setFileUploadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL)=>{
          setformData({...formData,avatar:downloadURL})
      });
    },
  );
  };
  return (
    <div className="p-3 max-w-lg m-auto">
      <h1 className="text-3xl text-rnd font-semibold text-center my-7">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover self-center mt-4 cursor-pointer"
          src={formData.avatar||currentUser.avatar} //change to uploaded image
          alt="Profile"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (<span className="text-red-700">Error Image Upload(image must be less than 2MB)
          </span>):
          filePerc > 0 && filePerc< 100 ?(<span className="text-rnd">
            {`Uploading ${filePerc}%`}
          </span> ) :
          filePerc === 100 ? (<span className="text-green-700">Image Upload Complete</span>) : ('')
          }
        </p>
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
        <button className="rounded-lg p-3 uppercase bg-rnd my-2 text-txt2 hover:opacity-95 disabled:opacity-80">
          Update
        </button>
        {/* <button className="rounded-lg p-3 uppercase bg-rnd my-2 text-txt2 hover:opacity-95 ">Create listing</button> */}
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
