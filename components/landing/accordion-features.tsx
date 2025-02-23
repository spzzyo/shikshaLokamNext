"use client";
import React, { useState } from "react";
// import TestimonialSingle from "./testimonial-single";
import feature1 from "../../public/feature_1.gif";
import feature2 from "../../public/feature_2.gif";
import feature3 from "../../public/feature_3.gif";
import feature4 from "../../public/feature_4.gif";
import feature5 from "../../public/feature_5.gif";
import feature6 from "../../public/feature_6.png";


import Image from "next/image";
import { image } from "@nextui-org/react";

const features = [
 
  {
    id: 1,
    title: "Effortless Attendance Tracking",
    description:
      "Simply upload a classroom image to get highly accurate student attendance recorded in seconds.",
    additionalInfo: [
      "Works even in low-resolution images using Face Recognition",
      "Available via WhatsApp for quick access",
      "No manual marking required",
    ],
    image: feature1,
  },
  {
    id: 2,
    title: "OCR-Backed Paper Formatter",
    description:
      "Less tech-savvy teachers struggle with typing out papers. Our OCR-powered tool transforms handwritten notes into well-structured question papers in your preferred template and language.",
    additionalInfo: [
      "AI-powered formatting",
      "Multi-language support",
      "Quick & hassle-free",
    ],
    image: feature3
  },
  {
    id: 3,
    title: "Shiksha Voice Assistant",
    description:
      "A multilingual voice assistant designed for teachers—execute tasks, set reminders, and organize lessons with just a few voice commands.",
    additionalInfo: [
      "Works with multiple languages",
      "Hands-free assistance",
      "Smart classroom management",
    ],
    image: feature2
  },
  
  {
    id: 4,
    title: "Student Profiling",
    description:
      "Provides personalized insights into students’ strengths, weaknesses, and progress for data-driven teaching decisions.",
    additionalInfo: [
      "Identify learning gaps",
      "Personalized student insights",
      "Data-driven teaching",
    ],
    image: feature4
  },
  {
    id: 5,
    title: "AI-Powered Lesson Creation",
    description:
      "Say goodbye to hours of planning! Our AI generates engaging lesson plans in minutes, allowing teachers to focus on what matters most—students.",
    additionalInfo: [
      "Save hours of prep time",
      "Get fresh, creative ideas",
      "Customize to your needs",
    ],
    image: feature5

    
  },
  {
    id: 6,
    title: "Limited Internet Accessibility",
    description:
      "Ensure seamless functionality even with low or no internet, allowing teachers to access key tools like attendance tracking and lesson planning offline.",
    additionalInfo: [
      "No connectivity? No problem!",
      "Essential tools remain accessible",
      "Reliable in rural areas",
    ],
    image: feature6
  },


  

];




export default function AccordionFeatures() {
  const [activeFeature, setActiveFeature] = useState(1);

  return (
    <section
      className="bg-base-100 mx-auto max-w-5xl space-y-24 py-24 md:space-y-32"
      id="features"
    >
      <div className="px-8">
        <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-slate-800 md:mb-24 lg:text-5xl">
          AI-powered lesson preparation <br />
          <span className="relative mt-2 inline-block">
            <span className="absolute inset-0 -rotate-1 transform bg-blue-600"></span>
            <span className="relative z-10 px-2 py-2 text-white">
              made easy
            </span>
          </span>
        </h2>
        <div className="flex flex-col gap-4 md:flex-row md:gap-24">
          <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-[30%_70%] lg:gap-24 ">
            <ul className="">
              {features.map((feature) => (
                <li
                  key={feature.id}
                  className={feature.id !== features.length ? "border-b" : ""}
                >
                  <button
                    className="relative flex w-full items-center gap-2 py-4 text-left text-base font-medium md:text-lg"
                    aria-expanded={activeFeature === feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    <span
                      className={`duration-100 ${
                        activeFeature === feature.id
                          ? "font-bold text-blue-600"
                          : ""
                      }`}
                    >
                      {feature.id}.{" "}
                    </span>
                    <span
                      className={`flex-1 text-slate-700 ${
                        activeFeature === feature.id
                          ? "font-bold text-blue-600"
                          : ""
                      }`}
                    >
                      <h3 className="inline">{feature.title}</h3>
                    </span>
                    <span className="ml-auto">
                      <svg
                        className="ml-auto h-[10px] w-[10px] flex-shrink-0 fill-slate-600"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="7"
                          width="16"
                          height="2"
                          rx="1"
                          className={`origin-center transform transition duration-200 ease-out ${
                            activeFeature === feature.id ? "rotate-180" : ""
                          }`}
                        />
                        <rect
                          y="7"
                          width="16"
                          height="2"
                          rx="1"
                          className={`origin-center rotate-90 transform transition duration-200 ease-out ${
                            activeFeature === feature.id
                              ? "hidden rotate-180"
                              : ""
                          }`}
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden text-slate-700 transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: activeFeature === feature.id ? "1000px" : "0",
                      opacity: activeFeature === feature.id ? 1 : 0,
                    }}
                  >
                    <div className="pb-8">
                      <div className="leading-relaxed text-slate-600">
                        <p>{feature.description}</p>
                      </div>
                      <div className="mt-4 space-y-1.5">
                        {Array.isArray(feature.additionalInfo) ? (
                          feature.additionalInfo.map((info, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1.5 text-sm font-medium text-slate-700"
                            >
                              {info}
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                            {feature.additionalInfo}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="w-full h-full">
              {features.map((feature) => (
               <Image
               key={feature.id}
               alt={`Feature ${feature.id}: ${feature.title}`}
               loading="lazy"
               width={1200}
               height={600} // Ensure a height is set
               decoding="async"
               data-nimg="1"
               className={`rounded-[16px] border w-full h-full object-cover transition-opacity duration-300 ${
                 activeFeature === feature.id ? "opacity-100" : "hidden opacity-0"
               }`}
               style={{ color: "transparent" }}
               src={feature.image?.src || ""}
             />
             
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
