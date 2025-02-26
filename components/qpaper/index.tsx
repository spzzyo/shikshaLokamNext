"use client";

import { useState, useEffect } from "react";
import { Document,pdfjs, Page } from "react-pdf";
import { Input, Button } from "@nextui-org/react";
import Image from "next/image";

import { Upload } from "lucide-react";






export const Qpaper = () => {
  const [messages, setMessages] = useState<{ text?: string; file?: File; sender: string }[]>([]);
  const [pdfUrl, setPdfUrl] = useState("/hindiqpaper.pdf");
  
  const [file, setFile] = useState<File | null>(null);
  const [isDefaultUsed, setIsDefaultUsed] = useState(true);

const placeholdertext= `Generate a hindi paper with this content. केंद्रीय विद्यालय
  वार्षिक परीक्षा 2024
  विषय: हिंदी
  कक्षा: 5
  समय: 2 घंटे | अधिकतम अंक: 100
  
  निर्देश:
  
  सभी प्रश्न अनिवार्य है।
  उत्तर अच्छे से और साफ लिखना।
  जहां जरूरी हो, वहां उदाहरण दे कर समझाए।
  प्रश्न 1: अपठित गद्यांश (10 अंक)
  नीचे दिया गय गद्यांश पढ़े और उत्तर लिखे:
  
  एक समय की बात है, एक गांव में एक बूढ़ा आदमी रहता था। वह बहुत ही ईमानदार और दयालु था। गांव के लोग उनकी बहुत इज्जत करते थे। एक दिन गांव में एक व्यापारी आया और उसने बूढ़े आदमी से कुछ पूछा...
  
  बूढ़े व्यक्ति के गुण क्या थे?
  गांववाले उनको क्यों पसंद करते थे?
  व्यापारी ने क्या पूछा होगा?
  प्रश्न 2: व्याकरण (20 अंक)
  (अ) इन शब्दों के विलोम लिखो: (5 अंक)
  अंधकार, सुख, आग, जीत, कठोर
  
  (ब) संज्ञा के प्रकार बताओ और उदाहरण दो। (5 अंक)
  
  (स) सही शब्द से खाली जगह भरो: (5 अंक)
  
  सूरज _____ से चमक रहा है। (तेज़ी, रोशनी)
  मोहन बहुत _____ बच्चा है। (समझदार, लाल)
  (द) नीचे दिए वाक्य सही करो: (5 अंक)
  
  राम स्कूल जा रहा हैं।
  मेरे पास दो किताबे है।
  प्रश्न 3: निबंध लेखन (20 अंक)
  नीचे दिए गए विषयों में से किसी एक पर 8-10 वाक्य लिखो:
  
  मेरा प्रिय त्योहार
  विज्ञान का महत्त्व
  किताबें हमारे सबसे अच्छे दोस्त
  प्रश्न 4: पत्र लेखन (10 अंक)
  अपने दोस्त को जन्मदिन की शुभकामनाएं देते हुए एक पत्र लिखो।
  
  प्रश्न 5: कविता लेखन (10 अंक)
  चार पंक्तियों की एक छोटी कविता लिखो।
  
  प्रश्न 6: चित्र वर्णन (20 अंक)
  नीचे दिए गए चित्र को देखकर 5-6 वाक्य लिखो।
  (चित्र: बगीचे में खेलते बच्चे)
  
  `;
  
  const [input, setInput] = useState("Generate a well formatted Question paper with this image.");
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const uploadedFile = event.target.files?.[0]; 
  if (uploadedFile) {
    setFile(uploadedFile);
    setMessages((prev) => [...prev, {  text: "", sender: "user",file: uploadedFile }]);
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPdfUrl(`/hindiqpaper.pdf?timestamp=${new Date().getTime()}`);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

  };

    // const [preview, setPreview] = useState(false);
    const handleButtonClick = (text:string) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text },
      ]);
    };
  

  return (
    <div className="flex h-90% w-full">
      {/* Chat Interface */}
      <div className="w-1/2 bg-blue-50 p-6 flex flex-col">
  <h2 className="text-xl font-semibold text-blue-700">
    Interact with this AI-powered Assistant
  </h2>

  {/* Chat Window */}
  <div className="flex-1 overflow-y-auto border p-4 rounded bg-white shadow h-full max-h-screen flex flex-col">
  {/* Example Messages */}
  <div className="flex flex-col items-end">
    <div className="p-2 my-1 max-w-[60%] rounded-md bg-blue-100 text-left overflow-y-auto  max-h-36">
      <p className="text-sm">You:</p>
      {/* <p>
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
</p> */}

<p> {placeholdertext}</p>

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
    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
  >
    <div
      className={`p-2 my-1 max-w-[60%] rounded-md ${
        msg.sender === "user" ? "bg-blue-100 text-left" : "bg-gray-200 text-left"
      }`}
    >
      <p className="text-sm">{msg.sender === "user" ? "You" : "Assistant"}:</p>

      {/* Render text message if available */}
      {msg.text && <p>{msg.text}</p>}

      {/* Render file message if available */}
      {msg.file && (
        <div className="mt-1">
          <p className="text-sm text-gray-500">{msg.file.name}</p>
          {msg.file.type.startsWith("image/") ? (
            <Image
            width={200}
            height={200}
              src={URL.createObjectURL(msg.file)}
              alt={msg.file.name}
              className="mt-1 max-w-[200px] rounded"
            />
          ) : (
            <a
              href={URL.createObjectURL(msg.file)}
              download={msg.file.name}
              className="text-blue-600 underline"
            >
              Download File
            </a>
          )}
        </div>
      )}
    </div>
  </div>
))}

</div>


<div className="mt-3   flex gap-2">
<button 
    onClick={() => handleButtonClick("Upload Handwritten Papers ")} 
    className="border-blue-600 border-2 text-sm border-dashed font-semibold hover:bg-blue-300 px-1 py-1 rounded"
  >
    Upload Handwritten Papers ✨
  </button>
  <button 
    onClick={() => handleButtonClick("Recommend More Questions ")} 
    className="border-blue-600 border-2 text-sm border-dashed font-semibold hover:bg-blue-300 px-1 py-1 rounded"
  >
    Recommend More Questions ✨
  </button>

  <button 
    onClick={() => handleButtonClick("Generate Formatted Question Paper ")} 
    className="border-blue-600 border-2 text-sm border-dashed font-semibold hover:bg-blue-300 px-1 py-1 rounded"
  >
    Generate Formatted Question Paper ✨
  </button>

  <button 
    onClick={() => handleButtonClick("Give feedback as per uploaded syllabus ")} 
    className="border-blue-600 border-2 text-sm border-dashed font-semibold hover:bg-blue-300 px-1 py-1 rounded"
  >
    Give feedback as per uploaded syllabus ✨
  </button>


</div>


  {/* Input Field & Send Button */}
  <div className="mt-4 flex">
  <label htmlFor="file-upload" className="cursor-pointer">
    <Upload className="w-6 h-6 text-blue-600 mr-2" />
    <input
      id="file-upload"
      type="file"
      className="hidden"
      onChange={handleFileUpload}
    />
  </label>
    <Input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type a message..."
      className="flex-1 max-h-20 overflow-y-auto"
    />
    <Button onClick={sendMessage} className="ml-2 bg-blue-600 text-white">
      Send
    </Button>
  </div>
</div>

      {/* PDF Viewer */}
      {/* <div className="relative w-1/2 p-6 bg-white max-h-screen flex flex-col items-center">
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
          <iframe  src={pdfUrl} width="100%" height="500px"></iframe>
        </div>
      </div>
    </div> */}

<div className="relative w-1/2 p-6 bg-white max-h-screen flex flex-col items-center">
      {/* Show Preview Button */}
      {!preview && !loading && (
        <button
          onClick={handlePreview}
          className="absolute top-1/2 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-700 text-white px-4 py-2 rounded shadow-lg"
        >
          Preview PDF
        </button>
      )}

      {/* Show Loader while loading */}
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
        </div>
      )}

      {/* PDF Viewer */}
      <div className={`w-full h-full ${!preview ? "blur-3xl overflow-hidden" : ""}`}>
        <h2 className="text-xl font-semibold text-blue-700 mb-4">PDF Preview</h2>
        <div className="border shadow-lg p-4 w-full h-[90%]">
          {preview && <iframe src={pdfUrl} width="100%" height="500px"></iframe>}
        </div>
      </div>
    </div>


    </div>
  );
};
