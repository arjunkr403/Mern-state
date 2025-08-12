import React from "react"

export default function About(){
    return (
        <div className=" flex flex-col gap-4 py-20 px-4 max-w-5xl mx-auto ">
            <h1 className=" text-4xl font-bold text-gdark">About <span className="text-[#33a1fd]">Home</span><span className="text-[#4C35FD]"> Heaven</span></h1>
            <p className="text-glight">At HomeHeaven, our mission is simple: “Turning Houses into Homes.” Whether you're looking to lease a cozy apartment or purchase your dream house, we are here to help you every step of the way. Our dedicated team is committed to making your journey as smooth and enjoyable as possible.</p>
            <h2 className="italic text-xl font-semibold text-gdark text-center">Guiding You to Your Ideal Home
                <br />
                For rent, for sale, for you. 
            </h2>
            <p className="text-glight">Your journey to the perfect home starts here. From discovering properties that match your needs to navigating the complexities of the real estate market, we offer expert guidance and support. Whether you're renting or buying, our goal is to ensure that you find a space where you feel truly at home.</p>
            <p className="text-glight">
            At HomeHeaven, we’re more than just a real estate agency—we’re your partners in finding a place where you can create lasting memories. Let us guide you to your ideal home and help you settle in with ease.
            </p>
        </div>
    )
}