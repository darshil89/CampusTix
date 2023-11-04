import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Problem from "@/components/Problems/Problem";

const getallProblems = async () => {
  const response = await fetch("http://localhost:3000/api/allProblems", {
    method: "GET",
    next: {
      revalidate: 0,
    },
  });
  const data = await response.json();
  // console.log("data = ", data);
  return data;
};

const getSpecificProblem = async (status) => {
  // console.log("status = ", status);
  const res = await fetch("http://localhost:3000/api/allProblems", {
    method: "POST",
    body: JSON.stringify({
      status: status,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (typeof window !== "undefined") return null;
  if (!session) redirect("/signin");
  const problems = await getallProblems();

  const spefificProblem = await getSpecificProblem("pending");
  // console.log("spefificProblem = ", spefificProblem);
  if (session) {
    return (
      <>
        <div className="text-4xl mt-8 ml-4 mb-4 text-gray-700 font-semibold">
          Admin's Dashboard <span className="text-blue-500">Overview</span>
        </div>
        <div className="flex flex-row w-full">
          {/*Stats of the problems's in one line with boxes*/}
          <div className="sm:px-1 ml-4 flex flex-col w-100">
            <div className="bg-blue-300 rounded-lg p-5 shadow-2xl w-full relative ">
              <div className="text-gray-50 sm:text-lg text-2xl">
                Number of Approved Problems
              </div>
              <div className="text-gray-50  text-5xl ">
                11
              </div>
            </div>
            <div className="bg-blue-300 mt-4 rounded-lg p-5 shadow-2xl w-full relative ">
              <div className="text-gray-50 sm:text-lg text-2xl">
                Number of Pending Problems
              </div>
              <div className="text-gray-50  text-5xl ">
                05
              </div>
            </div>
            <div className="bg-blue-300  mt-4 rounded-lg p-5 shadow-2xl w-full relative ">
              <div className="text-gray-50 sm:text-lg text-2xl">
                Number of Rejected Problems
              </div>
              <div className="text-gray-50  text-5xl ">
                11
              </div>
            </div>
          </div>
          <div className="bg-gray-100 ml-5 rounded-lg">
            {problems.map((problem) => {
              return (
                <Problem
                  name={problem.name}
                  key={problem.id}
                  title={problem.title}
                  content={problem.content}
                  userId={problem.userId}
                  problemId={problem.id}
                  status={problem.status}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
