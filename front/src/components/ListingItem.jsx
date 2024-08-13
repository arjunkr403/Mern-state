import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-[#EEEEEE] shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-md w-full sm:max-w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          className="object-cover w-full h-[320px] sm:h-[220px] hover:scale-105 transition-scale duration-300"
          src={
            listing.imageUrls[0] ||
            "https://imgs.search.brave.com/sftZRwCU0JOFWDHclMVp8tqa7crZG9DZjoMwnZ-LIyU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcy/MzAxMDIxL3Bob3Rv/L2hvbWUtZm9yLXNh/bGUuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUNSSVY4SW0y/RUR6ZmtMNDBFdDlj/SWZrZXhKQjV2Vm42/S0IwbU5JSXFfNDA9"
          }
          alt="listing cover"
        />
        <div className="p-3 flex-col gap-2 w-full">
          <p className="truncate text-lg font-bold text-rnd">{listing.name}</p>
          <div className="flex gap-1 items-center">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="truncate text-sm font-semibold text-gdark w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-glight line-clamp-2">
            {listing.description}
          </p>
          <p className="text-[#5bc6cc] mt-2 text-xl hover:text-green-500 transition-colors duration-300 font-semibold">
            //(listing.discountPrice ||listing.regularPrice / 10000000) % 1 === 0 :- checks if both are integer or not ,if they are then show without any decimals
            //If not, it displays the number with two decimal places but removes .00 if it exists using .replace(/\.00$/, "") and toFixed is used to print upto 2 decimal places
            // (/\.00$/, "")- is a regular expression '\.' matches '.' in the price /\.00$ find pattern in price as .00 with $ represents the end of string
            ₹
            {listing.offer
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
          <div className="text-rnd flex gap-4 pt-2">
            <div className="font-bold text-xs">
              {listing.beds > 1
                ? `${listing.beds} beds`
                : `${listing.beds} bed`}
            </div>
            <div className="font-bold text-xs">
              {listing.baths > 1
                ? `${listing.baths} baths`
                : `${listing.baths} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
