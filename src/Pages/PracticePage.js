//-----------Libaries-----------//
import React, { useState } from "react";

//-----------Components-----------//
import NavBar from "../Details/NavBar";

//-----------Media-----------//

const Problem = ({
  title,
  notes,
  difficulty,
  solved,
  starred,
  onSolvedChange,
  onStarredChange
}) => (
  
  <div className="flex items-center justify-between border-b border-gray-600 p-2">
    <span className="w-1/12">
      <input
        type="checkbox"
        checked={solved}
        onChange={onSolvedChange}
        className="h-4 w-4 rounded border-gray-300 checked:bg-green-500"
      />
    </span>
    <span className="w-1/12" onClick={onStarredChange}>
      <span
        className={`icon cursor-pointer ${
          starred ? "text-yellow-400" : "text-gray-400"
        }`}
      >
        ★
      </span>
    </span>
    <span className="w-5/12 text-white">{title}</span>
    <span className="w-4/12 text-gray-300">{notes}</span>
    <span className="w-1/12">
      <button
        className={`btn btn-xs ${
          difficulty === "Easy" ? "btn-success" : "btn-error"
        }`}
      >
        {difficulty}
      </button>
    </span>
  </div>
);

export default function PracticePage() {

  const [openTopic, setOpenTopic] = useState(null);

  const [topics, setTopics] = useState(
    [
    {
      name: "Arrays & Hashing",
      problems: [
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: true,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Medium",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Hard",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: true,
        },
      ],
    },
    {
      name: "Two Pointers",
      problems: [
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: true,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: true,
        },
      ],
    },
    {
      name: "Sliding Windows",
      problems: [
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: true,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: true,
        },
      ],
    },
    {
      name: "Stacks",
      problems: [
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: true,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: true,
        },
      ],
    },
    {
      name: "Binary Search",
      problems: [
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: true,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: true,
        },
      ],
    },
    {
      name: "Trees",
      problems: [
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: true,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: true,
        },
      ],
    },
    {
      name: "Graphs",
      problems: [
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: true,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: true,
        },
      ],
    },
    {
      name: "Backtracking",
      problems: [
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: true,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: true,
        },
      ],
    },
    {
      name: "1-D Dynamic Programming",
      problems: [
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: true,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: false,
        },
        {
          title: "172: Two Sum",
          notes: "Easier to solve on Python",
          difficulty: "Easy",
          solved: false,
          starred: true,
        },
      ],
    },
  ]);

   const toggleSolved = (topicIndex, problemIndex) => {
     const newTopics = [...topics];
     const problem = newTopics[topicIndex].problems[problemIndex];
     problem.solved = !problem.solved; 
     setTopics(newTopics);
   };

     const toggleStarred = (topicIndex, problemIndex) => {
       const newTopics = [...topics];
       const problem = newTopics[topicIndex].problems[problemIndex];
       problem.starred = !problem.starred; 
       setTopics(newTopics);
     };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background">
      <NavBar />
      <div className="flex w-full flex-1 flex-col">
        <header className="bg-blue-800 p-6 text-white"></header>
        <div className="flex-1 overflow-auto bg-gray-800 p-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex}>
              <button
                className="mb-2 w-full rounded bg-gray-700 p-3 text-left text-white"
                onClick={() =>
                  setOpenTopic(openTopic === topicIndex ? null : topicIndex)
                }
              >
                {topic.name}
              </button>
              {openTopic === topicIndex && (
                <div>
                  <div className="flex justify-between p-2 text-white">
                    <span className="w-1/12">Status</span>
                    <span className="w-1/12">Star</span>
                    <span className="w-5/12">Problem</span>
                    <span className="w-4/12">Notes</span>
                    <span className="w-1/12">Difficulty</span>
                  </div>
                  <div className="rounded bg-gray-600 p-2">
                    {topic.problems.map((problem, problemIndex) => (
                      <Problem
                        key={problemIndex}
                        {...problem}
                        onSolvedChange={() =>
                          toggleSolved(topicIndex, problemIndex)
                        }
                        onStarredChange={() =>
                          toggleStarred(topicIndex, problemIndex)
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
