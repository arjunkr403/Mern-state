import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import {useSelector} from 'react-redux';
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const {currentUser}=useSelector(state=>state.user);
  const [uploading, setUploading]=useState(false);
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false); 
  const nav=useNavigate();
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    baths: 1,
    beds: 1,
    offer: false,
    regularPrice: 4000,
    discountPrice: 0,
    offer:false,
    parking:false,
    furnished:false,
  });

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length+formData.imageUrls.length< 7) {
      const promises = [];
      setUploading(true);
      setImageUploadError(false);
      // Create an array of Promises, each representing an image upload
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      // Wait for all Promises to resolve
      Promise.all(promises).then((urls) => {
        //...formdata= keep previous info such as name,description,etc and imageurls will store the new urls into previous urls  using concat method
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
      }).catch((err)=>{
        // Handle any errors that occur during the upload process
        setImageUploadError('Image upload failed(2 MB max per image');
        setUploading(false);
      });
    }
    else{
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };


  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app); // app from firebase.js to recognise which storage to use
      const fileName = new Date().getTime() + file.name; //always unique name
      const storageRef = ref(storage, fileName); //reference created for the file to be stored
      const uploadTask = uploadBytesResumable(storageRef, file); //uploading the file to the storage
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          // if there is no error get the url
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL); // return the url
          });
        }
      );
    });
  };


  const handleRemoveImage=(index)=>{
    setFormData({
      ...formData,imageUrls:formData.imageUrls.filter((_,i) => i!== index),
    });
  };

  const handleChangeList =(e)=>{
    if(e.target.id==='sale'|| e.target.id==='rent'){
      setFormData({
        ...formData,//keep previous information
        type:e.target.id //change the ''type''(which is attribute of formdata) to sale if selected or rent if rent is selected
      })
    }
    if(e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='offer'){
      setFormData({ //change the formData with following data
        ...formData,//keep previous information
        [e.target.id]: e.target.checked//add data to the selected id to true or false
      })
    }//using square bracket to get the variable instead of value
    if(e.target.type==='number'|| e.target.type==='text'|| e.target.type==='textarea'){
      setFormData({ //change the formData with following data 
        ...formData,//keep previous information
        [e.target.id]: e.target.value//add the value to the respective id such as any text written in 'name' input to formdata's 'name' attr
      })
    } 
  };


  const handleSubmit = async (e)  =>{
    e.preventDefault();//prevent refreshing the page

    try {// as the condition for number and text taken together the value of number type may save as string , so to avoid that error we use '+' for the number attributes such that they dont change their type to string or etc.
      if(formData.imageUrls.length<1) return setError('You must upload at least one image')
      if(+formData.regularPrice< +formData.discountPrice) return setError ("Discount price must be lower than Regular price")
      setLoading(true);
      setError(false);
      const res =await fetch('/back/listing/create',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef:currentUser._id,
        }),
      });
      const data =await res.json();
      setLoading(false);

      if(data.success===false){
        setError(data.message);
        setLoading(false);
      }
      nav(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="mx-auto p-3 max-w-4xl ">
      <h1 className="font-semibold text-3xl text-center my-7 ">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className=" flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            maxLength={70}
            minLength={10}
            required
            onChange={(e)=>handleChangeList(e)}
            value={formData.name}
          />
          <textarea
            id="description"
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
            onChange={handleChangeList}
            value={formData.description}
          />
          <input
            id="address"
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            required
            onChange={handleChangeList}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" onChange={handleChangeList} checked={formData.type==='sale'}/>
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" onChange={handleChangeList} checked={formData.type==='rent'}/>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" onChange={handleChangeList} checked={formData.parking}/>
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" onChange={handleChangeList} checked={formData.furnished}/>
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" onChange={handleChangeList} checked={formData.offer}/>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="beds"
                min="1"
                max="10"
                className=" border-glight border p-3 rounded-lg"
                required onChange={handleChangeList} value={formData.beds}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="baths"
                className="border-glight border p-3 rounded-lg"
                min="1"
                max="10"
                required onChange={handleChangeList} value={formData.baths}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                className="border-glight border p-3 rounded-lg"
                min="4000"
                max="1000000"
                required onChange={handleChangeList} value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">(₹ per month)</span>
              </div>
            </div>
            {formData.offer&& (
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                className="border-glight border p-3 rounded-lg"
                min="0"
                max="1000000"
                required onChange={handleChangeList} value={formData.discountPrice}
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">(₹ per month)</span>
              </div>
            </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="text-xs font-normal text-gdark ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-rnd rounded w-full "
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="border border-green-700 rounded-lg p-3 text-green-700 uppercase hover:shadow-lg disabled:opacity-80"
            >
            {uploading?'uploading...':'Upload'}
            </button>
          </div>
        <p className="text-red-700 text-sm ">{imageUploadError && imageUploadError}</p>
        {
          formData.imageUrls.length>0 && formData.imageUrls.map((url, index)=>(
            <div key={url} className="flex justify-between items-center p-3 border rounded-lg">
              <img className="w-20 h-20 object-contain rounded-lg" src={url} alt="lisitng image"/>
              <button type="button" onClick={()=>handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
            </div>
          ))
        }
          <button disabled={loading || uploading} className="border bg-rnd text-txt2 rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 my-7">
            {loading?'Creating...' :'Create Listing'}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p> }
        </div>
      </form>
    </main>
  );
}
