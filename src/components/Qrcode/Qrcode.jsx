/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import { font14, font18 } from "@/constant";
import qr from "@/public/images/qr-code.svg";
import { Share1Icon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import QRCode from "qrcode.react";
import { useRef, useState } from "react";
import { RiDownload2Line } from "react-icons/ri";
import IconImage from "../IconImage/IconImage";

const QRCodeComponent = () => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const qrRef = useRef();

  const handleChange = () => {
    setOpen(!open);
  };

  const downloadQRCode = () => {
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="border flex  flex-col justify-center items-center rounded-lg py-[10px] mb-10">
        <div
          className="flex items-center gap-6 cursor-pointer"
          onClick={handleChange}
        >
          <IconImage src={qr} size={35} alt="notification icon" />
          <span className={`${font18} text-primary_color`}>
            Profile Qr Code
          </span>
        </div>

        {open && (
          <div className="border-t space-y-4 " ref={qrRef}>
            <QRCode
              size={150}
              value={`https://aidroo.com${pathname}`}
              fgColor="#000000"
              bgColor="#ffffff"
              level="H"
              includeMargin={true}
              renderAs="svg"
              imageSettings={{
                src: "https://i.ibb.co/my89KDg/qrstar.png",

                height: 30, // Height of the center image
                width: 30, // Width of the center image
              }}
            />
            <div className="flex items-center gap-6  px-3  py-2 h-18 cursor-pointer border rounded-md   ">
              <Share1Icon className="text-primary_color" />
              {/* <IconImage src={qr} size={35} alt="notification icon" /> */}
              <span className={`${font14} text-gray-500`}>Share Qr code</span>
            </div>

            <div className="flex items-center gap-6 px-3  py-2 h-18 cursor-pointer border rounded-md    ">
              <RiDownload2Line className="text-primary_color text-xl" />
              {/* <IconImage src={qr} size={35} alt="notification icon" /> */}
              <span
                className={`${font14} text-gray-600`}
                onClick={downloadQRCode}
              >
                Save to gallery
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeComponent;
