import API_URL from "../components/globalApiUrl";

export const getUsers = async () => {
  return fetch(API_URL + "/roles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YzhjOTFlZDA1MzdmZTBkNDlmMTU2ZWIiLCJoYXNoZWRQYXNzd29yZCI6Im5pdHMiLCJpYXQiOjE1NTI3MTY1OTQsImV4cCI6MTU1MjgwMjk5NH0.Necq4MXl_7L5XpFPzTbdW-AGxlpcYDVZBGr88kFD6WM",
      userID: "5c8c91a7aa68cb0d3dae645a"
    }
  })
    .then(resp => {
      return resp
        .json()
        .then(respBody => {
          console.log(respBody.status);
          console.log(respBody);
          if (respBody.status !== 200) {
            return {
              success: false,
              error: !!respBody.error
                ? respBody.error
                : "something went wrong with the request"
            };
          }
          return {
            success: true,
            users: respBody.users.email,
            roles: respBody.roles
          };
        })
        .catch(error => {
          return { success: false, error };
        });
    })
    .catch(error => {
      return { success: false, error };
    });
};
