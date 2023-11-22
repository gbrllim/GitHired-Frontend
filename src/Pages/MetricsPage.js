//-----------Libaries-----------//
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

//-----------Components-----------//
import NavBar from "../Details/NavBar";

//-----------Dummy Data-----------//
const jobApplicationsData = [
  { week: "5", Applications: 5 },
  { week: "6", Applications: 5 },
  { week: "7", Applications: 8 },
  { week: "8", Applications: 6 },
  { week: "9", Applications: 10 },
  { week: "10", Applications: 12 },
  { week: "11", Applications: 13 },
  { week: "12", Applications: 14 },
  { week: "13", Applications: 5 },
];

const codingPracticeData = [
  { week: "5", Questions: 3 },
  { week: "6", Questions: 4 },
  { week: "7", Questions: 7 },
  { week: "8", Questions: 8 },
  { week: "9", Questions: 9 },
  { week: "10", Questions: 10 },
  { week: "11", Questions: 11 },
  { week: "12", Questions: 12 },
  { week: "13", Questions: 3 },
];

//-----------Media-----------//

export default function MetricsPage() {
  const latestJobApplications =
    jobApplicationsData[jobApplicationsData.length - 1].Applications;
  const latestCodingQuestions =
    codingPracticeData[codingPracticeData.length - 1].Questions;

  // Weekly goals: reference lines
  const weeklyJobGoal = 10; // goal for job applications
  const weeklyCodingGoal = 5; // goal for coding questions

  return (
    <div className="flex h-screen flex-col bg-background">
      <NavBar />
      <header className="p-4 text-2xl font-bold">Metrics</header>
      <main className="w-full flex-grow overflow-auto p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Top left: Weekly Progress */}
          <section className="rounded-lg bg-gray-700 p-4">
            <h2 className="mb-2 text-lg font-semibold">Weekly Progress</h2>
            <div className="mb-4">
              <div className="mb-1 flex justify-between">
                <span>Job Applications</span>
                <span>
                  {latestJobApplications}/{weeklyJobGoal}
                </span>
              </div>
              <div className="h-6 w-full rounded-full bg-gray-600">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{
                    width: `${(latestJobApplications / weeklyJobGoal) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between">
                <span>Coding Practice</span>
                <span>
                  {latestCodingQuestions}/{weeklyCodingGoal}
                </span>
              </div>
              <div className="h-6 w-full rounded-full bg-gray-600">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${
                      (latestCodingQuestions / weeklyCodingGoal) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </section>

          {/* Top right: Upcoming events */}
          <section className="rounded-lg bg-gray-700 p-4">
            <h2 className="mb-2 text-lg font-semibold">Upcoming</h2>
            <div className="mb-2">
              <p>Interview with Midjourney - 10 Nov 2023 - 4pm</p>
            </div>
            <div>
              <p>Interview with Orange - 11 Nov 2023 - 2pm</p>
            </div>
          </section>

          {/* Bottom left: Weekly Job Applications Bar Chart */}
          <section className="rounded-lg bg-gray-700 p-4 md:col-span-2 lg:col-span-1">
            <h2 className="mb-2 text-lg font-semibold">
              Weekly Job Applications
            </h2>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart
                data={jobApplicationsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Applications" fill="#10b981" />
                <ReferenceLine
                  y={weeklyJobGoal}
                  stroke="red"
                  strokeDasharray="3 3"
                />
              </BarChart>
            </ResponsiveContainer>
          </section>

          {/* Bottom right: Weekly Coding Practice Bar Chart */}
          <section className="rounded-lg bg-gray-700 p-4 md:col-span-2 lg:col-span-1">
            <h2 className="mb-2 text-lg font-semibold">
              Weekly Coding Practice
            </h2>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart
                data={codingPracticeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Questions" fill="#3b82f6" />
                <ReferenceLine
                  y={weeklyCodingGoal}
                  stroke="red"
                  strokeDasharray="3 3"
                />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </div>
      </main>
    </div>
  );
}