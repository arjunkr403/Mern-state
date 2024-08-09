import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const nav = useNavigate();
    const [sidebardata,setsidebardata]=useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc',
    });
    const [loading,setLoading]=useState(false);
    const [listings,setListings]=useState([]);
    useEffect(()=>{//by using window.location.search url var store query string from url initialised by '?'
        const url=new URLSearchParams(location.search);
        //below each variable store their respective data from url var
        const searchFromUrl= url.get('searchTerm');
        const typeFromUrl= url.get('type');
        const parkingFromUrl =url.get('parking');
        const furnishedFromUrl =url.get('furnished');
        const offerFromUrl =url.get('offer');
        const sortFromUrl =url.get('sort');
        const orderFromUrl =url.get('order');
        if(
            searchFromUrl || 
            typeFromUrl ||
            offerFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            sortFromUrl ||
            orderFromUrl
            ){
            setsidebardata({
                searchTerm: searchFromUrl || ' ',
                type:typeFromUrl || 'all',
                offer:offerFromUrl ==='true' ?true:false,
                parking:parkingFromUrl ==='true' ?true:false,
                furnished:furnishedFromUrl ==='true' ?true:false,
                sort:sortFromUrl || 'created_at',
                order:orderFromUrl || 'desc',
                });
            }
        const fetchListings  = async ()=>{
            try {
                setLoading(true);
                const searchQuery=url.toString();
                const res = await fetch(`/back/listing/get?${searchQuery}`);
                const data = await res.json();
                setListings(data);
                setLoading(false);
                console.log(data);
                
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchListings();
    },[location.search]);//if there is a change in location.search we change the sidebardata
    
    const handleChange=(e)=>{

        if(e.target.id === 'all'|| e.target.id === 'rent'||e.target.id === 'sale'){
            setsidebardata({
                ...sidebardata,
                type:e.target.id,
            })
        }

        if(e.target.id==='searchTerm'){
            setsidebardata({
                ...sidebardata,
                searchTerm:e.target.value,
            })
        }
        if(e.target.id==='parking'||e.target.id==='furnished'|| e.target.id==='offer'){
            setsidebardata({
                ...sidebardata,
                [e.target.id]:e.target.checked || e.target.checked=== 'true' ? true: false,
            })
        }

        if(e.target.id==='sort_order'){
            const sort = e.target.value.split('_')[0]||'created_at';
            const order = e.target.value.split('_')[1] ||'desc';
            setsidebardata({
                ...sidebardata,
                sort,
                order
            });
        }
    };

    const handleSubmit= (e)=>{
        e.preventDefault();
        const url = new URLSearchParams();//crate new instance of urlsearchparams which can be used in adding new parameters or modifying the existing parameters
        url.set('searchTerm',sidebardata.searchTerm);//set the value of searchterm from url to sidebardata var attr
        url.set('type',sidebardata.type);//set the value of type from url to sidebardata var attr
        url.set('offer',sidebardata.offer);//set the value of offer from url to sidebardata var attr
        url.set('parking',sidebardata.parking);//set the value of parking from url to sidebardata var attr
        url.set('furnished',sidebardata.furnished);//set the value of furnished from url to sidebardata var attr
        url.set('sort',sidebardata.sort);//set the value of sort from url to sidebardata var attr
        url.set('order',sidebardata.order);//set the value of order from url to sidebardata var attr
        const searchQuery =url.toString();
        nav(`/search?${searchQuery}`);

    };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
                <label className="whitespace-nowrap font-semibold">Search here: 
                </label>
            <input
                type="text"
                id="searchTerm"
                placeholder="type keywords..."
                className="p-3 w-full border rounded-lg"
                value={sidebardata.searchTerm}
                onChange={handleChange}/>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
                <div className="flex gap-2">
                <label className="font-semibold">Type: </label>
                    <input 
                    type="checkbox"
                    className="w-5"
                    id="all"
                    checked={sidebardata.type==='all'}
                    onChange={handleChange}
                    />
                    <span>Rent & Sale</span>
                </div>
                <div className="flex gap-2">
                    <input
                    type="checkbox"
                    className="w-5"
                    id="rent"
                    checked={sidebardata.type==='rent'}
                    onChange={handleChange}
                    />
                    <span>Rent</span>
                </div>  
                <div className="flex gap-2">
                    <input
                    type="checkbox"
                    className="w-5"
                    id="sale"
                    checked={sidebardata.type==='sale'}
                    onChange={handleChange}
                    />
                    <span>Sale</span>
                </div>
                <div className="flex gap-2">
                    <input
                    type="checkbox"
                    className="w-5"
                    id="offer"
                    checked={sidebardata.offer}
                    onChange={handleChange}
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
                    checked={sidebardata.parking}
                    onChange={handleChange}
                    />
                    <span>Parking</span>
                </div>
                <div className="flex gap-2">
                    <input
                    type="checkbox"
                    className="w-5"
                    id="furnished"
                    checked={sidebardata.furnished}
                    onChange={handleChange}
                    />
                    <span>Furnished</span>
                </div>  
            </div>
            <div className="flex items-center gap-2">
                <label className="font-semibold">Sort: </label>
                <select  className="p-3 border rounded-lg" id="sort_order"
                defaultValue={'created_at_desc'}
                onChange={handleChange}>
                    <option value="regularPrice_asc">Price low to high</option>    
                    <option value="regularPrice_desc">Price high to low</option>
                    <option value="createdAt_desc">Latest</option>
                    <option value="createdAt_asc">Oldest</option>    
                </select>
            </div>
            <button  className="border rounded-lg bg-rnd text-txt2 p-3 uppercase hover:opacity-95">Search</button>   
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold text-center p-3 text-gdark mt-5">Listing Results:</h1>
      </div>
    </div>
  );
}
