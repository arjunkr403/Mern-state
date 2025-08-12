/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/back/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username} </span>{" "}
            for <span className="font-semibold">{listing.name}</span>
          </p>
          <textarea
            className="w-full border p-3 rounded-lg mt-2"
            onChange={onChange}
            name="message"
            id="message"
            rows="2"
            placeholder="Enter your message here..."
            value={message}
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${encodeURIComponent('Hello, I am interested in your listing.\n')}${message }`}
            className="bg-rnd text-txt2 uppercase text-center p-3 rounded-lg hover:opacity-95">
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
