const endpoint = "https://localhost:7206/api/ReportType";

const getReportTypes = async () => {
  const response = await fetch(`${endpoint}/All-type`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getReportTypesByName = async (name) => {
  const response = await fetch(`${endpoint}/Name-type?name=${name}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getReportTypeById = async (id) => {
  const response = await fetch(`${endpoint}/ID-type?id=${id}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const createReportType = async (typeName) => {
  const model = {
    reportTypeName: typeName,
  };
  const response = await fetch(`${endpoint}/Insert-Category`, {
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

const updateReportType = async (id, typeName) => {
  const model = {
    reportTypeId: id,
    reportTypeName: typeName,
  };
  const response = await fetch(`${endpoint}/Update-type`, {
    method: "PUT",
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

export {
 getReportTypeById,
 getReportTypes
};