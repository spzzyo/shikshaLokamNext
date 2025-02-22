"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle, RefreshCw, Loader2 } from "lucide-react";

const initialLessons = [
  {
    topic: "Introduction to Fractions",
    category: "Academic",
    difficulty: "Medium",
    resources: ["Interactive Quiz", "Video Explanation", "Practice Problems"],
    progress: 75,
  },
  {
    topic: "Creative Writing Workshop",
    category: "Extracurricular",
    difficulty: "Easy",
    resources: ["Group Exercises", "Story Prompts", "Feedback Sessions"],
    progress: 60,
  },
  {
    topic: "Basics of Basketball",
    category: "Extracurricular",
    difficulty: "Medium",
    resources: ["Drills", "Game Rules", "Strategy Videos"],
    progress: 40,
  },
  {
    topic: "Advanced Algebra",
    category: "Academic",
    difficulty: "Hard",
    resources: ["Live Tutoring", "Problem Sets", "Mock Tests"],
    progress: 50,
  },
];

export default function LessonPlan() {
  const [lessons, setLessons] = useState(initialLessons);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  
  type Lesson = {
    topic: string;
    category: string;
    difficulty: string;
    resources: string[];
    progress: number;
  };

  // Change selectedLessons to store lesson objects, not indexes
  const [selectedLessons, setSelectedLessons] = useState<Lesson[]>([]);

  const toggleSelection = (lesson: Lesson) => {
    setSelectedLessons((prev) =>
      prev.includes(lesson)
        ? prev.filter((l) => l !== lesson)
        : [...prev, lesson]
    );
  };

  const requestNewLessons = () => {
    setLoading(true);
    console.log("Requesting new recommendations...");
    
    setTimeout(() => {
      setLessons([
        {
          topic: "Physics of Roller Coasters",
          category: "Academic",
          difficulty: "Medium",
          resources: ["Experiments", "Simulations", "Live Discussion"],
          progress: 30,
        },
        {
          topic: "Beginner Yoga",
          category: "Extracurricular",
          difficulty: "Easy",
          resources: ["Guided Videos", "Posture Breakdown", "Meditation"],
          progress: 20,
        },
      ]);
      setSelectedLessons([]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        📚 Personalized Lesson Plan Recommendations
      </h2>

      {loading ? (
        <div className="flex items-center justify-center h-24">
          <Loader2 size={24} className="animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-2 gap-4">
          {lessons.map((lesson) => (
            <div key={lesson.topic}> {/* Added key to outer div */}
              <Card
                className={`p-4 shadow-md rounded-md cursor-pointer transition border-2 ${
                  selectedLessons.includes(lesson)
                    ? "border-green-500"
                    : "border-transparent"
                }`}
                onClick={() => toggleSelection(lesson)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">{lesson.topic}</h3>
                  {selectedLessons.includes(lesson) && (
                    <CheckCircle size={20} className="text-green-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600">Category: {lesson.category}</p>
                <p className="text-sm text-gray-600">Difficulty: {lesson.difficulty}</p>
                <p className="text-sm text-gray-600">Completion: {lesson.progress}%</p>
                <h4 className="text-sm font-semibold text-blue-500 mt-2">
                  Recommended Resources:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {lesson.resources.map((res, i) => (
                    <li key={`${lesson.topic}-${i}`}>{res}</li>
                  ))}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={requestNewLessons}
          className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 transition hover:bg-green-600"
          disabled={loading}
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
          Get New Lessons
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-md font-semibold text-gray-700">✍️ Share Your Feedback</h3>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
          className="w-full p-3 border rounded-md text-sm focus:ring-2 focus:ring-blue-400 transition"
        />
        <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Submit Feedback
        </button>
      </div>
    </div>
  );
}
