const endpoint = "https://localhost:7206/api/Report";

const getReports = async () => {
  const response = await fetch(`${endpoint}/All-report`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getReport = async () => {
  const response = await fetch(`${endpoint}/report`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getReportByMember = async (memberId) => {
  const response = await fetch(`${endpoint}/member-report?id=${memberId}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const createReport = async (title, memberId, type, description) => {
  const model = {
    reportTitle: title,
    memberId: memberId,
    reportType: type,
    reportDescription: description,
  };
  const response = await fetch(`${endpoint}/create-report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: model ? JSON.stringify(model) : undefined,
  });
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getReportByModerate = async (memberId) => {
  const response = await fetch(`${endpoint}/member-report?id=${memberId}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

export {
  getReports,
  getReport,
  getReportByMember,
  createReport,
  getReportByModerate,
};