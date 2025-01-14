export const createJobApplication = async (data) => {
  const token = await window.Clerk?.session?.getToken();

  const res = await fetch("https://hirelyai-be.onrender.com/api/jobapplications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fullName: data.fullName,
      answers: data.answers,
      job: data.jobId,
    }),
  });
};

export const getJobApplicationsForJob = async (jobId) => {
  const token = await window.Clerk?.session?.getToken();

  const res = await fetch(`https://hirelyai-be.onrender.com/api/jobapplications?jobId=${jobId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch job applications for job");
  }
  const data = await res.json();
  return data;
};

export const getJobApplicationById = async (jobApplicationId) => {
  const token = await window.Clerk?.session?.getToken();

  const res = await fetch(`https://hirelyai-be.onrender.com/api/jobapplications/${jobApplicationId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch job application");
  }
  const data = await res.json();
  return data;
};