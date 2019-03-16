import API_URL from "../components/globalApiUrl";

export const getRoles = async userID => {
  return fetch(API_URL + "/roles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YzgxNzBmZWU4ODQ1MThlOTY4NzM1ZDEiLCJpYXQiOjE1NTE5ODc0MDJ9.ZHEzQokXr-p83Vj-eqvORMHKKSOgtfmIAa1WP7Ymifw"
    }
  })
    .then(resp => {
      return resp.json().then(respBody => {
        return { success: true, rolesList: respBody.rolesList };
      });
    })
    .catch(error => {
      return { success: false, error };
    });
};

export const roleChange = async (userID, role) => {};
