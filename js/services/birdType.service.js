const endpoint = "https://localhost:7206/api/BirdType";

const getBirdTypeId = async () => {
    const response = await fetch(`${endpoint}/All-bird`);
    if (!response.ok) {
      throw new Error("Invalid Request");
    } else {
      return response.json();
    }
  };

  export{
    getBirdTypeId
  }