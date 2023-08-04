const endpoint = "https://localhost:7206/api/Bird";

const getBirds = async () => {
  const response = await fetch(`${endpoint}/All-bird`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const createBird = async (
  birdName,
  memberId,
  birdTypeId,
  image,
  size,
  weight,
  age
) => {
  const model = {
    birdName: birdName,
    memberId: memberId,
    birdTypeId: birdTypeId,
    image: image,
    size: size,
    weight: weight,
    age: age,
  };
  const response = await fetch(`${endpoint}/create`, {
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

const createBird2 = async (model) => {
  const response = await fetch(`${endpoint}/create`, {
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
export {
  getBirds,
  createBird2
}