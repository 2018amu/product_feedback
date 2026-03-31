const API_URL = "http://localhost:4000/api";

export const submitFeedback = async (data: any) => {
  const res = await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};