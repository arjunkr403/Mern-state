import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading]=useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length+formData.imageUrls.length< 7) {
      const promises = [];
      setUploading(true);
      setImageUploadError(false);
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        //...formdata= keep previous info such as name,description,etc and imageurls will store the new urls into previous urls  using concat method
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
      }).catch((err)=>{
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
  return (
    <main className="mx-auto p-3 max-w-4xl ">
      <h1 className="font-semibold text-3xl text-center my-7 ">
        Create a Listing
      </h1>
      <form className=" flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            maxLength={70}
            minLength={10}
            required
          />
          <textarea
            id="description"
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
          />
          <input
            id="address"
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
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
                required
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
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                className="border-glight border p-3 rounded-lg"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">(₹ per month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                className="border-glight border p-3 rounded-lg"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">(₹ per month)</span>
              </div>
            </div>
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
          <button className="border bg-rnd text-txt2 rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 my-7">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
