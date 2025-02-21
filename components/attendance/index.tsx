// "use client";
// import { Button, Input } from "@nextui-org/react";
// import Link from "next/link";
// import React, { useState } from "react";
// import { ExportIcon } from "@/components/icons/accounts/export-icon";
// import { useDropzone } from "react-dropzone";

// export const Attendance = () => {
//   const [image, setImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
  
//   const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

//   const onDrop = async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (file) {
//       setImage(file);
//       await uploadImage(file);
//     }
//   };

//   const uploadImage = async (file) => {
//     setUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("https://chief-formerly-civet.ngrok-free.app/recognize", {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) {
//         throw new Error("Upload failed");
//       }
//       alert("Image uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       alert("Failed to upload image");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/*" });

//   return (
//     <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
//       <h3 className="text-xl font-semibold">Attendance Tracking</h3>
//       <div className="flex justify-between flex-wrap gap-4 items-center">
//         <div className="flex flex-row gap-3.5 flex-wrap">
//           <Button color="primary" startContent={<ExportIcon />}>Export to CSV</Button>
//         </div>
//       </div>
      
//       {/* Drag & Drop Section */}
//       <div {...getRootProps()} className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer">
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p>Drop the file here...</p>
//         ) : (
//           <p>Upload Attendance Pic for {today}</p>
//         )}
//         {image && <p className="mt-2 text-sm">Selected file: {image.name}</p>}
//         {uploading && <p className="mt-2 text-sm text-blue-500">Uploading...</p>}
//       </div>
//     </div>
//   );
// };



"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { ImageIcon } from "../icons/image-icon";
import { WhatsAppIcon } from "../icons/whatsapp";
import { ExportIcon } from "../icons/accounts/export-icon";




export const Attendance = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    if (uploadedImage) {
      fetchResults();
    }
  }, [uploadedImage]); // Trigger API call when uploadedImage is set

  const fetchResults = async () => {
    try {
      const response = await fetch("https://chief-formerly-civet.ngrok-free.app/attendance_stat", {method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),}); 
      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }


      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };  
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      await uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("https://chief-formerly-civet.ngrok-free.app/recognize", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setUploadedImage(imageUrl);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/*" });

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Attendance Tracking</h3>
      {/* <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex flex-row gap-3.5 flex-wrap">
          <Button color="primary" startContent={<ExportIcon />}>Export to CSV</Button>
        </div>
      </div> */}

<div className="bg-green-600 text-white text-center p-4 rounded-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <WhatsAppIcon className="w-6 h-6 text-white" />
          <p className="text-lg font-medium">
            Now track attendance effortlessly with just a few clicks via WhatsApp!
          </p>
          </div>
        <Button
          className="bg-white text-green-600 font-semibold px-4 py-2 rounded-md"
          onClick={() => setModalOpen(true)}
        >
          See How
        </Button>
      </div>

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg text-center relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            <p className="text-lg font-semibold mb-4">How it Works</p>
            <Image height={1000} width={1000} src="/feature_1.gif" alt="WhatsApp Attendance Tracking" className="w-full rounded-lg" />
          </div>
        </div>
      )}
      
      
      {/* Drag & Drop Section */}
      <div className="grid grid-cols-[30%_70%]">
      <div {...getRootProps()} className="border-4 border-blue-800 mx-5 border-dashed p-6 rounded-lg text-center text-blue-950 cursor-pointer bg-blue-300 hover:bg-blue-100 transition-colors">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Upload Classroom Attendance Picture for {today}</p>
        )}
        <ImageIcon className="mt-4 mx-auto text-white" />
        {image && <p className="mt-2 text-sm">Selected file: {image.name}</p>}
        {uploading && <p className="mt-2 text-sm text-white">Uploading...</p>}

        {uploadedImage && <Image src={uploadedImage} alt="Uploaded Attendance" width={500} height={400} className="mt-4 max-w-full rounded-lg mx-auto " />}

      </div>

      <div className="bg-slate-100 rounded-lg mx-5">

        {!uploadedImage &&  <h2 className="text-blue-950 text-lg font-semibold text-center mx-auto my-auto ">Tabular Attendance Displayed Here.</h2>}

      {uploadedImage && (
        <>
           <h2 className="text-blue-950 text-lg font-semibold text-center mx-auto ">Results</h2>
  <div className="max-h-60 overflow-y-auto">
    <table className="min-w-full  rounded-lg">
      <thead className="bg-blue-300 text-sm uppercase">
        <tr>
          <th className="py-2 px-4 text-left">Name</th>
          <th className="py-2 px-4 text-left">Status</th>
          <th className="py-2 px-4 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        {apiData?.attendance?.map((record, index) => (
          <tr key={index} className="border-b ">
            <td className="py-2 px-4">{record.name}</td>
            <td 
              className={`py-2 px-4 rounded-md text-center font-semibold ${
                record.status === "Present" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
              }`}
            >
              {record.status}
            </td>
            <td className="py-2 px-4">{record.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
   

  </div>
  <div className="flex flex-row gap-3.5 flex-wrap m-4">
  <Button color="primary" startContent={<ExportIcon />}>Add with Previous Records</Button>
  </div>
        </>
      )}
      </div>
      
      </div>
      <div>
        todo - add defaulty kids highlight,  add some other pretty attendance related features 
      </div>
    </div>
  );
};
