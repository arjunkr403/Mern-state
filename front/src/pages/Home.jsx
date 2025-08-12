import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination,EffectFade} from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation,Autoplay,Pagination,EffectFade ]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/back/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/back/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/back/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/*main*/}
      <div className="flex flex-col gap-4 p-14 md:p-28 max-w-6xl mx-auto">
        <h1 className=" text-gdark font-bold text-3xl lg:text-6xl">
          Turning <span className="text-[#60B7FD] ">Houses </span>
          into
          <span className="text-[#33a1fd]"> Homes</span>
        </h1>
        <h1 className=" text-gdark font-bold text-2xl lg:text-5xl">
          For rent, for sale, for you
        </h1>
        <div className="text-glight text-xs sm:text-sm">
          From your first viewing to the moment you move in, we’re with you
          every step of the way.
          <br />
          Experience personalized service that transforms properties into the
          place you’ll love to call home
        </div>
        <Link
          to={"/search"}
          className="hover:underline text-[#1d24ca] text-xs sm:text-sm font-bold "
        >
          <span>Let&apos;s Start now...</span>
        </Link>
      </div>
      {/*sliding images*/}
      <Swiper
        navigation
        pagination={{clickable:true}}
        autoplay={{delay:3000,disableOnInteraction:false}}
        speed={2000}
        slidesPerView={1}
        spaceBetween={30}
        effect="fade"
        fadeEffect={{crossFade:true}}
        >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/*Listing results for offer , sale and rent*/}
      <div className="max-w-8xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
            offerListings && offerListings.length>0 &&(
                <div className="mx-auto max-w-[98%] ">
                    <div className="my-3">
                        <h2 className="text-2xl font-semibold text-glight">Recent Offers</h2>
                        <Link className="text-sm text-[#1d24ca] text-semibold hover:underline" to={'/search?offer=true'}>Show more offers</Link>
                    </div>
                    <div className="flex flex-wrap gap-4 ">
                        {
                            offerListings.map((listing)=>(
                                <ListingItem listing={listing} key={listing._id}/>
                            ))
                        }
                    </div>
                </div>
            )
        }
        {
            rentListings && rentListings.length>0 &&(
                <div className="mx-auto max-w-[98%] ">
                    <div className="my-3">
                        <h2 className="text-2xl font-semibold text-glight">Recent places for rent</h2>
                        <Link className="text-sm text-[#1d24ca] text-semibold hover:underline" to={'/search?type=rent'}>Show more places for rent</Link>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {
                            rentListings.map((listing)=>(
                                <ListingItem listing={listing} key={listing._id}/>
                            ))
                        }
                    </div>
                </div>
            )
        }
        {
            saleListings && saleListings.length>0 &&(
                <div className="mx-auto max-w-[98%] ">
                    <div className="my-3">
                        <h2 className="text-2xl font-semibold text-glight">Recent places for sale</h2>
                        <Link className="text-sm text-[#1d24ca] text-semibold hover:underline" to={'/search?type=sale'}>Show more places for sale</Link>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {
                                saleListings.map((listing)=>(
                                <ListingItem listing={listing} key={listing._id}/>
                            ))
                        }
                    </div>
                </div>
            )
        }
      </div>
    </div>
  );
}
