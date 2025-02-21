"use client";

import { useState, useEffect } from "react";
import { Document,pdfjs, Page } from "react-pdf";
import { Input, Button } from "@nextui-org/react";








export const Qpaper = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");
  const [pdfUrl, setPdfUrl] = useState("/qpaper.pdf");

  useEffect(() => {
    const interval = setInterval(() => {
      setPdfUrl(`/qpaper.pdf?timestamp=${new Date().getTime()}`);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

    const [preview, setPreview] = useState(false);
  

  return (
    <div className="flex h-90% w-full">
      {/* Chat Interface */}
      <div className="w-1/2 bg-blue-50 p-6 flex flex-col">
  <h2 className="text-xl font-semibold text-blue-700">
    Interact with this AI-powered Assistant
  </h2>

  {/* Chat Window */}
  <div className="flex-1 overflow-y-auto border p-4 rounded bg-white shadow overflow-y-auto flex flex-col">
  {/* Example Messages */}
  <div className="flex flex-col items-end">
    <div className="p-2 my-1 max-w-[60%] rounded-md bg-blue-100 text-left overflow-y-auto  max-h-36">
      <p className="text-sm">You:</p>
      <p>
Generate a well formatted question paper with the below content. <br/><br/>

abc Public school  <br/>

Mid term Examination 2024  <br/>

Subject Science   <br/>

student name____  Date____ <br/> 

Total marks:50  <br/>

instrucshuns  
<br/>all questions are compulsory  
<br/>write neat and clear answers  
<br/>marks are indicated on the right side  


<br/>1 fill in the Blanks  
<br/>a.The process by which plants prepare their food is called_____. (2 Marks)  
<br/>b) The gas used by humans for breathing is_____. (2 Marks)  

<br/>2 Answer the following Questions  
<br/>a) What is the function of the digestive system? (5 Marks)  
<br/>b) Explain Newtons Third Law of Motion with an example. (5 Marks)  

<br/>3 Solve the Following  
<br/>a) A car moves at a speed of 60 km/h. How much distance will it cover in 3 hours? (3 Marks)  
<br/>b) If the density of an object is 5 g/cm³ and its volume is 10 cm³, find its mass. (3 Marks)  

<br/>4 Identify the Picture and Answer  
<br/>[img: leaf sunlight]  
<br/>a) What process is happening in the leaf shown in the image? (5 Marks)
</p>

    </div>
  </div>

  <div className="flex flex-col items-start">
    <div className="p-2 my-1 max-w-[60%] rounded-md bg-gray-200 text-left">
      <p className="text-sm">Assistant:</p>
      <p>There you go. What else can I help you with?</p>
    </div>
  </div>

  {/* Dynamic Messages */}
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`flex flex-col ${
        msg.sender === "user" ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`p-2 my-1 max-w-[60%] rounded-md ${
          msg.sender === "user" ? "bg-blue-100 text-left" : "bg-gray-200 text-left"
        }`}
      >
        <p className="text-sm">{msg.sender === "user" ? "You" : "Assistant"}:</p>
        <p>{msg.text}</p>
      </div>
    </div>
  ))}
</div>


  {/* Suggestion Buttons */}
  <div className="mt-3 flex gap-2">
    <button className="border-blue-600 border-2 border-dashed font-semibold hover:bg-blue-300 px-3 py-2 rounded">Recommend More Questions 
    ✨ </button>
    <button className="border-blue-600 border-2 border-dashed font-semibold hover:bg-blue-300 px-3 py-2 rounded">Generate Formatted Question Paper 
    ✨</button>
    <button className="border-blue-600 border-2 border-dashed font-semibold hover:bg-blue-300 px-3 py-2 rounded">Give feedback as per uploaded syllabus 
    ✨ </button>
  </div>

  {/* Input Field & Send Button */}
  <div className="mt-4 flex">
    <Input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type a message..."
      className="flex-1"
    />
    <Button onClick={sendMessage} className="ml-2 bg-blue-600 text-white">
      Send
    </Button>
  </div>
</div>

      {/* PDF Viewer */}
      <div className="relative w-1/2 p-6 bg-white flex flex-col items-center">
      {!preview && (
        <button
          onClick={() => setPreview(true)}
          className="absolute top-1/2 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-700 text-white px-4 py-2 rounded shadow-lg"
          >
          Preview PDF
        </button>
      )}

      <div className={`w-full h-full ${!preview ? "blur-3xl overflow-hidden" : ""}`}>
        <h2 className="text-xl font-semibold text-blue-700 mb-4">PDF Preview</h2>
        <div className="border shadow-lg p-4 w-full h-[90%]">
          <iframe  src="/qpaper.pdf" width="100%" height="500px"></iframe>
        </div>
      </div>
    </div>


    </div>
  );
};
