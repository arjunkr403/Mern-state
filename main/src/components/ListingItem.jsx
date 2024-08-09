import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-[#EEEEEE] shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-md w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          className="object-cover w-full h-[320px] sm:h-[220px] hover:scale-105 transition-scale duration-300"
          src={listing.imageUrls[0] || 'https://imgs.search.brave.com/sftZRwCU0JOFWDHclMVp8tqa7crZG9DZjoMwnZ-LIyU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcy/MzAxMDIxL3Bob3Rv/L2hvbWUtZm9yLXNh/bGUuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUNSSVY4SW0y/RUR6ZmtMNDBFdDlj/SWZrZXhKQjV2Vm42/S0IwbU5JSXFfNDA9' }
          alt="listing cover"
        />
        <div className="p-3 flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-rnd">
            {listing.name}
          </p>
          <div className="flex gap-1 items-center">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="truncate text-sm text-gdark w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-glight line-clamp-2">
            {listing.description}
          </p>
          <p className="text-[#5bc6cc] mt-2 text-xl hover:text-green-500 transition-colors duration-300 font-semibold">
            ₹
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-IN")
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
