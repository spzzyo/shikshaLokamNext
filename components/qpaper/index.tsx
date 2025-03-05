"use client";

import { useState, useEffect } from "react";
import { Document,pdfjs, Page } from "react-pdf";
import { Input, Button } from "@nextui-org/react";
import Image from "next/image";

import { Upload,X } from "lucide-react";






export const Qpaper = () => {
  const [messages, setMessages] = useState<{ text?: string|null; file?: File|null; sender: string|null }[]>([]);
  const [pdfUrl, setPdfUrl] = useState("/hindiqpaper.pdf");
  
  const [file, setFile] = useState<File | null>(null);
  const [input, setInput] = useState("");
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const uploadedFile = event.target.files?.[0]; 
  if (uploadedFile) {
    setFile(uploadedFile);
    console.log("File selected:", uploadedFile.name);
  }
};

const [preview, setPreview] = useState(false);
const [loading, setLoading] = useState(false);

  const handlePreview = () => {
    setLoading(true); // Show loader
    setTimeout(() => {
      setPreview(true); // Show PDF after delay
      setLoading(false); // Hide loader
    }, 2000); // Simulating a delay of 2 seconds
  };

  const removeFile = () => {
    setFile(null);
  };

  const [pdfKey, setPdfKey] = useState(Date.now()); // Unique key to force iframe refresh

  const sendMessage = async () => {
    if (input.trim() === "" && !file) return;
  
    if (input || file) {
      const newMessage = {
        sender: "user",
        text: input,
        file: file,
      };
  
      setMessages([...messages, newMessage]);
      setInput("");
      setFile(null);
    }
  
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("text", input);
      if (file) formData.append("file", file);
  
      const response = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" },
      });
  
      if (!response.ok) throw new Error("Failed to fetch response");
  
      const data = await response.json();
      console.log("Response:", data);
  
      const botMessage = { text: data.response, sender: "assistant" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
  
      // 🔄 Refresh the PDF iframe by updating the key
      if (input.toLowerCase().includes("question paper")) {
        setPdfKey(Date.now());
      }  
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "assistant", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  
 
  

  return (
    <div className="flex h-full  w-full">
     
     <div className="w-1/2 h-9/10 bg-white p-6 flex flex-col">
  <h2 className="text-xl font-semibold text-blue-700">
    Interact with this AI-powered Assistant
  </h2>

   {/* Buttons */}
   <div className="mt-3 mb-3 flex gap-2"> 
    <div  className="border-blue-600 border-2 bg-blue-400 text-sm border-dashed font-semibold px-1  py-1  rounded ">
      Upload Handwritten Papers ✨
    </div>
    <div className="border-blue-600 border-2 text-sm border-dashed bg-blue-400 font-semibold px-1 py-1 rounded">
      Recommend More Questions ✨
    </div>
    <div  className="border-blue-600 border-2 text-sm border-dashed bg-blue-400 font-semibold  px-1 py-1 rounded">
      Generate Formatted Question Paper ✨
    </div>
    <div  className="border-blue-600 border-2 text-sm border-dashed font-semibold bg-blue-400  px-1 py-1 rounded">
      Give feedback as per uploaded syllabus ✨
    </div>
  </div>

  {/* Chat messages container with controlled scrolling */}
  <div className="border rounded bg-white shadow h-[400px] p-4 overflow-y-auto text-black flex flex-col">
  {messages.map((msg, index) => (
        <div key={index} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
          <div
            className={`p-2 my-1 max-w-[60%] rounded-md ${
              msg.sender === "user" ? "bg-blue-100 text-left" : "bg-gray-200 text-left"
            }`}
          >
            <p className="text-sm">{msg.sender === "user" ? "You" : "Assistant"}:</p>
            {msg.text && (
  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
)}
            {msg.file && (
              <div className="mt-1">
                <p className="text-sm text-gray-500">{msg.file.name}</p>
                {msg.file.type.startsWith("image/") ? (
                  <img
                    width={200}
                    height={200}
                    src={URL.createObjectURL(msg.file)}
                    alt={msg.file.name}
                    className="mt-1 max-w-[200px] rounded"
                  />
                ) : msg.file.type === "application/pdf" ? (
                  <iframe
                    src={URL.createObjectURL(msg.file)}
                    className="mt-1 w-[200px] h-[200px] border rounded"
                    title={msg.file.name}
                  />
                ) : (
                  <a href={URL.createObjectURL(msg.file)} download={msg.file.name} className="text-blue-600 underline">
                    Download File
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      
</div>
{/* Input section */}
<div className="w-full bg-white p-4 flex items-center">
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-6 h-6 text-blue-600 mr-2" />
          <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
        </label>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 max-h-20 overflow-y-auto" />

        {/* File preview before sending */}
        {file && (
          <div className="ml-2 flex items-center border rounded p-2 bg-gray-100">
            <p className="text-sm text-gray-700">{file.name}</p>
            <X className="w-4 h-4 ml-2 text-red-500 cursor-pointer" onClick={removeFile} />
          </div>
        )}

        <Button onClick={sendMessage} className="ml-2 bg-blue-600 text-white">
          Send
        </Button>
      </div>
</div>

     

<div className="relative w-1/2 p-6 h-9/10 flex bg-slate-100 flex-col items-center">
      
<iframe
  key={pdfKey} // 🔄 Forces re-render every time sendMessage is called
  src="http://127.0.0.1:8000/pdf"
  width="100%"
  height="600px"
  style={{ border: "none" }}
></iframe>

   
    </div>


    </div>
  );
};
