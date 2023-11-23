//-----------Libaries-----------//
import { React, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import axios from "axios";

//-----------Components-----------//
import NavBar from "../Details/NavBar";

//-----------Utilities-----------//
import { bearerToken } from "../Utilities/token";
import RemindersSummary from "../Components/Applications/Reminders/RemindersSummary";

//-----------Media-----------//

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "grey",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label">{`Week ${label} : ${payload[0].value}`}</p>
        {/* You can add more content here */}
      </div>
    );
  }

  return null;
};

export default function MetricsPage() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem("token");

  // Weekly goals: reference lines
  const [applicationGoalCount, setApplicationGoalCount] = useState(0);
  const [questionsGoalCount, setQuestionsGoalCount] = useState(0);
  const [applications, setApplications] = useState([]);
  const [processedJobApplicationsData, setProcessedJobApplicationsData] =
    useState([]);
  const [questions, setQuestions] = useState([]);
  const [processedQuestionsData, setProcessedQuestionsData] = useState([]);
  const [remindersData, setRemindersData] = useState(null);

  // GET - Retrieve user data from Backend for user
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/users/data`, bearerToken(token)) // Endpoint: users/data
      .then((response) => {
        setApplicationGoalCount(response.data.userData.applicationGoalCount);
        setQuestionsGoalCount(response.data.userData.questionsGoalCount);
      });
  }, []);

  // GET - Retrieve applications from Backend
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/users/applications`, bearerToken(token))
      .then((response) => {
        console.log("Single Application Startp", response.data.applications);
        const filteredApplications = response.data.applications.filter(
          (application) => application.applicationStatus.status !== "Wishlist",
        );
        console.log(filteredApplications)
        setApplications(filteredApplications);
      });
  }, []);

  // GET - Retrieve reminders from Backend
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/applications/reminders/getAll`, bearerToken(token))
      .then((response) => {
        const previewData = response.data.data.slice(0, 6); // Reduce top 3
        console.log("Reminders", previewData);
        setRemindersData(previewData);
      });
  }, []);

  useEffect(() => {
    const getWeekNumber = (d) => {
      const date = new Date(d.getTime());
      date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
      const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
      return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
    };

    const weeklySummary = applications.reduce((acc, application) => {
      const applicationDate = new Date(application.applicationDate);
      const weekNumber = getWeekNumber(applicationDate);
      acc[weekNumber] = (acc[weekNumber] || 0) + 1;
      return acc;
    }, {});

    const jobApplicationsData = Object.keys(weeklySummary).map((week) => ({
      week: week.toString(),
      Applications: weeklySummary[week],
    }));

    setProcessedJobApplicationsData(jobApplicationsData);
  }, [applications]);

  const latestJobApplications =
    processedJobApplicationsData.length > 0
      ? processedJobApplicationsData[processedJobApplicationsData.length - 1]
          .Applications
      : 0;

  // GET - Retrieve questions from Backend

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/users/questions`, bearerToken(token)) // Endpoint: users/questions
      .then((response) => {
        setQuestions(response.data.questions);
      });
  }, []);

  useEffect(() => {
    const getWeekNumber = (d) => {
      const date = new Date(d.getTime());
      date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
      const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
      return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
    };

    const weeklySolvedQuestionsSummary = {};

    questions.forEach((question) => {
      if (question.statusId === 1) {
        const updatedDate = new Date(question.updatedAt);
        const weekNumber = getWeekNumber(updatedDate);

        if (!weeklySolvedQuestionsSummary[weekNumber]) {
          weeklySolvedQuestionsSummary[weekNumber] = 0;
        }
        weeklySolvedQuestionsSummary[weekNumber]++;
      }
    });

    const codingPracticeData = Object.keys(weeklySolvedQuestionsSummary).map(
      (week) => ({
        week: week.toString(),
        Questions: weeklySolvedQuestionsSummary[week],
      }),
    );

    setProcessedQuestionsData(codingPracticeData);
  }, [questions]);

  const latestCodingQuestions =
    processedQuestionsData.length > 0
      ? processedQuestionsData[processedQuestionsData.length - 1].Questions
      : 0;

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
                  {latestJobApplications}/{applicationGoalCount}
                </span>
              </div>
              <div className="h-6 w-full rounded-full bg-gray-600">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{
                    width: `${
                      (latestJobApplications / applicationGoalCount) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between">
                <span>Coding Practice</span>
                <span>
                  {latestCodingQuestions}/{questionsGoalCount}
                </span>
              </div>
              <div className="h-6 w-full rounded-full bg-gray-600">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${
                      (latestCodingQuestions / questionsGoalCount) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </section>

          {/* Top right: Upcoming events */}
          <section className="rounded-lg bg-gray-700 p-4">
            <h2 className="mb-2 text-lg font-semibold">Upcoming Reminders</h2>
            <div className="grid grid-cols-2">
              {remindersData &&
                remindersData.map((reminder, index) => (
                  <RemindersSummary key={index} data={reminder} />
                ))}
            </div>
          </section>

          {/* Bottom left: Weekly Job Applications Bar Chart */}
          <section className="rounded-lg bg-gray-700 p-4 md:col-span-2 lg:col-span-1">
            <h2 className="mb-2 text-lg font-semibold">
              Weekly Job Applications
            </h2>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart
                data={processedJobApplicationsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="week"
                  label={{
                    value: "Week",
                    position: "insideBottomRight",
                    offset: -10,
                  }}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="Applications" fill="#10b981" />
                <ReferenceLine
                  y={applicationGoalCount}
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
                data={processedQuestionsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="week"
                  label={{
                    value: "Week",
                    position: "insideBottomRight",
                    offset: -10,
                  }}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="Questions" fill="#3b82f6" />
                <ReferenceLine
                  y={questionsGoalCount}
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
