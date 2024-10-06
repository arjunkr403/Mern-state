import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchlisting = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/back/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchlisting();
  }, [params.listingId]);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}

      {listing && !loading && !error && (
        <div>
          <Swiper navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={2000}
            slidesPerView={1}
            spaceBetween={30}
            effect="fade"
            fadeEffect={{ crossFade: true }}>
            {listing.imageUrls.map((url) => (
              //swipeslide is used for slidling b/w images
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-txt2 cursor-pointer">
            <FaShare
              className="text-glight"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-txt2 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ₹ {listing.offer
                ? listing.discountPrice >= 10000000
                  ? (listing.discountPrice / 10000000) % 1 === 0
                    ? listing.discountPrice / 10000000 + " Cr."
                    : (listing.discountPrice / 10000000)
                      .toFixed(2)
                      .replace(/\.00$/, "") + " Cr."
                  : listing.discountPrice >= 100000
                    ? (listing.discountPrice / 100000) % 1 === 0
                      ? listing.discountPrice / 100000 + " L."
                      : (listing.discountPrice / 100000)
                        .toFixed(2)
                        .replace(/\.00$/, "") + " L."
                    : listing.discountPrice.toLocaleString("en-IN")
                : listing.regularPrice >= 10000000
                  ? (listing.regularPrice / 10000000) % 1 === 0
                    ? listing.regularPrice / 10000000 + " Cr."
                    : (listing.regularPrice / 10000000)
                      .toFixed(2)
                      .replace(/\.00$/, "") + " Cr."
                  : listing.regularPrice >= 100000
                    ? (listing.regularPrice / 100000) % 1 === 0
                      ? listing.regularPrice / 100000 + " L."
                      : (listing.regularPrice / 100000)
                        .toFixed(2)
                        .replace(/\.00$/, "") + " L."
                    : listing.regularPrice.toLocaleString("en-IN")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-gdark  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-700 w-full max-w-[200px] text-txt2 text-center p-1 rounded-md hover:opacity-95">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-700 w-full max-w-[200px] text-txt2 text-center p-1 rounded-md hover:opacity-95">
                  {/* listing.discountPrice ||listing.regularPrice / 10000000 % 1 === 0 :- checks if both are integer or not ,if they are then show without any decimals
            If not, it displays the number with two decimal places but removes .00 if it exists using .replace(/\.00$/, "") and toFixed is used to print upto 2 decimal places
             (/\.00$/, "")- is a regular expression '\.' matches '.' in the price /\.00$ find pattern in price as .00 with $ represents the end of string  */}
                  ₹
                  {(+listing.regularPrice - +listing.discountPrice) >= 10000000
                    ? ((+listing.regularPrice - +listing.discountPrice) / 10000000) % 1 === 0
                      ? (+listing.regularPrice - +listing.discountPrice) / 10000000 + " Cr. OFF" //format for integer
                      : ((+listing.regularPrice - +listing.discountPrice) / 10000000).toFixed(2).replace(/\.00$/, "") + " Cr. OFF"//format for float
                    : (+listing.regularPrice - +listing.discountPrice) >= 100000
                      ? ((+listing.regularPrice - +listing.discountPrice) / 100000) % 1 === 0
                        ? (+listing.regularPrice - +listing.discountPrice) / 100000 + " L. OFF"
                        : ((+listing.regularPrice - +listing.discountPrice) / 100000).toFixed(2).replace(/\.00$/, "") + " L. OFF"
                      : (+listing.regularPrice - +listing.discountPrice).toLocaleString("en-IN") + " OFF"}
                </p>
              )}

            </div>
            <p className="text-glight">
              <span className="font-semibold text-black">Description- </span>
              {listing.description}{" "}
            </p>
            <ul className=" text-green-700 font-semibold text-sm flex items-center flex-wrap gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg " />
                {listing.beds > 1
                  ? `${listing.beds} beds`
                  : `${listing.beds} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg " />
                {listing.beds > 1
                  ? `${listing.beds} baths`
                  : `${listing.beds} bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg " />
                {listing.parking
                  ? 'Parking Spot'
                  : 'No Parking'}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg " />
                {listing.furnished
                  ? 'Furnished'
                  : 'Unfurnished'}
              </li>
            </ul>
            {//condition for checking whether the creater of listing is not equal to visiter
              //it defines that if the visitor or user is not the creater or landlord of that listing , show the contact landlord btn otherwise hide the btn 
              currentUser && listing.userRef !== currentUser._id && !contact
              && (
                <button onClick={() => setContact(true)} className="bg-rnd text-txt2 p-3 rounded-md hover:opacity-95 uppercase">Contact Landlord</button>
              )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
