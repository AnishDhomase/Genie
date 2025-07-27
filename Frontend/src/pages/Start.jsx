import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-[url('https://w0.peakpx.com/wallpaper/58/690/HD-wallpaper-disney-aladdin-genie-thumbnail.jpg')] z-0" />
      {/* <div className="absolute inset-0 bg-cover bg-center bg-[url('https://u-mercari-images.mercdn.net/photos/m76792381621_4.jpg')] z-0" /> */}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full pt-8 flex justify-between flex-col">
        <h1 className="text-[40px] font-medium text-white mx-[30px]">genie</h1>
        <div className="bg-white pb-8 py-4 px-4">
          <h2 className="text-[30px] font-semibold">Get Started with Genie</h2>
          <Link
            to="/user-roles"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
