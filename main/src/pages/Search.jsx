import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
                <label className="whitespace-nowrap font-semibold">Search here: 
                </label>
            <input
                type="text"
                id="searchTerm"
                placeholder="type keywords..."
                className="p-3 w-full border rounded-lg"
                />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
                <div className="flex gap-2">
                    <label className="font-semibold">Type: </label>
                    <input
                    type="checkbox"
                    className="w-5"
                    id="rent&sale"
                    />
                    <span>Rent & Sale</span>
                </div>
                <div className="flex gap-2">
                    <input
                    type="checkbox"
                    className="w-5"
                    id="rent"
                    />
                    <span>Rent</span>
                </div>  
                <div className="flex gap-2">
                    <input
                    type="checkbox"
                    className="w-5"
                    id="sale"
                    />
                    <span>Sale</span>
                </div>
                <div className="flex gap-2">
                    <input
                    type="checkbox"
                    className="w-5"
                    id="offer"
                    />
                    <span>Offer</span>
                </div>  
            </div>
            <div className="flex flex-wrap gap-2 items-center">
                <div className="flex gap-2">
                    <label className="font-semibold">Amenities: </label>
                    <input
                    type="checkbox"
                    className="w-5"
                    id="parking"
                    />
                    <span>Parking</span>
                </div>
                <div className="flex gap-2">
                    <input
                    type="checkbox"
                    className="w-5"
                    id="furnished"
                    />
                    <span>Furnished</span>
                </div>  
            </div>
            <div className="flex items-center gap-2">
                <label className="font-semibold">Sort: </label>
                <select  className="p-3 border rounded-lg" id="sort_order">
                    <option value="">Price low to high</option>    
                    <option value="">Price high to low</option>
                    <option value="">Latest</option>
                    <option value="">Oldest</option>    
                </select>
            </div>
            <button className="border rounded-lg bg-rnd text-txt2 p-3 uppercase hover:opacity-95">Search</button>   
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold text-center p-3 text-gdark mt-5">Listing Results:</h1>
      </div>
    </div>
  );
}
