import React from "react";

export default function Banner() {
  return (
    <div className="mx-6 my-3">
      <div className="p-2 rounded-2xl overflow-hidden shadow-lg bg-white/5 dark:bg-black/20">
        <img
          src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/CurationAssets/Gachiakuta/SEASON%201/MARKETING%20BANNER/Gachiakuta-S1C1-KV1-(Character)-Banner-2100x700-EN.png"
          alt="Banner"
          className="w-full h-auto rounded-xl object-cover"
        />
      </div>
    </div>
  );
}
