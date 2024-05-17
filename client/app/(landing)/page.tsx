import React from "react";

import { ArrowRight } from "lucide-react";

export default function page() {
  return (
    <div className="bg-[#1E1919] mt-[44px] pb-44">
      <div className="container mx-auto lg:px-44 text-center pt-32">
        <h1 className="text-white text-5xl lg:w-[70%] mx-auto">
          Securely collaborate on your content anywhere, anytime
        </h1>
        <p className="text-xl text-white capitalize pt-8">
          With Dropbox, you get a full suite of tools designed to help you
          create, share, manage, and track content more efficiently. Plus,
          proven cloud storage you can trust.
        </p>
        <div className="flex justify-center items center">
          <button className="bg-blue-700 px-9 py-5 text-white mt-12 gap-x-4 flex">
            Get Start Now <ArrowRight />
          </button>
        </div>
      </div>
      <div className="h-auto flex flex-col items-center justify-center w-auto pt-20 overflow-hidden">
        <video src="/marketing.mp4" className="" autoPlay muted loop></video>
      </div>
    </div>
  );
}
