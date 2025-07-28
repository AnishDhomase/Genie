import React from "react";
import { Link } from "react-router-dom";

const Start2 = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-[url('https://w0.peakpx.com/wallpaper/58/690/HD-wallpaper-disney-aladdin-genie-thumbnail.jpg')] z-0" />
      {/* <div className="absolute inset-0 bg-cover bg-center bg-[url('https://u-mercari-images.mercdn.net/photos/m76792381621_4.jpg')] z-0" /> */}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full pt-8 flex justify-between flex-col">
        {/* Title at Top */}
        <h1 className="text-[30px] font-medium text-white mx-[25px]">genie</h1>

        {/* White Box at Bottom */}
        <div
          className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%] bg-white rounded-t-2xl px-6 py-8 
               sm:px-10 sm:py-10 md:px-14 md:py-12 shadow-lg 
               mx-auto mb-0 sm:mb-4 md:mb-8 lg:mb-12"
        >
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold mb-6">
            Select an option to start
          </h2>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/user/login"
              className="flex-1 text-center bg-gray-800 text-white text-base sm:text-lg font-medium py-3 rounded-lg"
            >
              Continue as User
            </Link>
            <Link
              to="/genie/login"
              className="flex-1 text-center bg-black text-white text-base sm:text-lg font-medium py-3 rounded-lg"
            >
              Continue as Genie
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start2;
