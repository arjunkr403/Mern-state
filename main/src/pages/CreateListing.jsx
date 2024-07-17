import React from "react";

export default function CreateListing() {
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
        <div className="flex flex-col flex-1">
            <p className="font-semibold">Images:
            <span className="text-xs font-normal text-gdark ml-2">The first image will be the cover (max 6)</span>
            </p>
            <div className="flex gap-4">
                <input className='p-3 border border-rnd rounded w-full ' type="file" id='images' accept="image/*" multiple/>
                <button className="border border-green-700 rounded-lg p-3 text-green-700 uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
            </div>
        <button className="border bg-rnd text-txt2 rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 my-7">Create Listing</button>
        </div>
      </form>
    </main>
  );
}
