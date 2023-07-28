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

const createReport = async (model) => {
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

const moderateReport = async (reportId, reply, managerId) => {
  const requestBody = {
    reportId: reportId,
    reply: reply,
    managerId: managerId,
  };

  const response = await fetch(`${endpoint}/moderate-report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody), // Convert the object to a JSON string
  });

  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
}

const moderateReportAdm = async (reportID, Reply) => {
  const requestBody = {
    reportID: reportID, // Make sure the field name matches the API's expected field name
    Reply: Reply, // Make sure the field name matches the API's expected field name
  };

  const response = await fetch(`${endpoint}/moderate-report-admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

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
  moderateReport,
  moderateReportAdm
};
