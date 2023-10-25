class NetworkLayer {
  baseUrl = "http://localhost:5000";
  insertUrl =
    "http://localhost:5001/api/insert?IATA_CODE=AA&&airport_name=client_airport&&visited=yes";
  searchUrl = "http://localhost:5001/api/search?IATA_CODE=AA";

  static async api_showFavorites() {
    console.log("Showing favorites");
    return [
      {
        id: "1",
        title: "Item 1",
        description: "This is the first item",
        isVisited: true,
      },
    ];
  }

  static async api_search(IATA_CODE) {
    console.log("Searching");
    try {
      const searchUrl = `http://localhost:5001/api/search?IATA_CODE=${IATA_CODE}`;
      console.log(searchUrl);
      let response = await fetch(searchUrl);
      let data = await response.json();
      console.log("response ====>", data.result);
      return data.result;
    } catch (error) {
      console.error(error);
    }
  }

  static async api_insert(IATA_CODE, airport_name, visited) {
    console.log("Inserting");
    try {
      const insertUrl = `http://localhost:5001/api/insert?IATA_CODE=${IATA_CODE}&airport_name=${airport_name}&visited=${visited}`;
      console.log(insertUrl);
      let response = await fetch(insertUrl);
      let data = await response.json();
      console.log("response ====>", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  static async api_delete(IATA_CODE) {
    console.log("Deleting");
    try {
      const deleteUrl = `http://localhost:5001/api/delete?IATA_CODE=${IATA_CODE}`;
      console.log(deleteUrl);
      let response = await fetch(deleteUrl);
      let data = await response.json();
      console.log("response ====>", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  static async api_update(IATA_CODE, visited) {
    console.log("Updating");
    try {
      const updateUrl = `http://localhost:5001/api/update?IATA_CODE=${IATA_CODE}&visited=${visited}`;
      console.log(updateUrl);
      let response = await fetch(updateUrl);
      let data = await response.json();
      console.log("response ====>", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  static async api_advanced1() {
    console.log("Running Advanced 1");
    try {
      const advanced1Url = "http://localhost:5001/api/advanced1";
      console.log(advanced1Url);
      let response = await fetch(advanced1Url);
      let data = await response.json();
      console.log("response ====>", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  static async api_advanced2() {
    console.log("Running Advanced 2");
    try {
      const advanced2Url = "http://localhost:5001/api/advanced2";
      console.log(advanced2Url);
      let response = await fetch(advanced2Url);
      let data = await response.json();
      console.log("response ====>", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  static async signin(username) {
    try {
      const url = `http://localhost:5001/api/sign_in?username=${username}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("response ====>", data);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async seeAllUsers() {
    try {
      const url = `http://localhost:5001/api/all_users`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("all users", data);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default NetworkLayer;
