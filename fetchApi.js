import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const isAuthenticate = () => {
  try {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return false;
    return JSON.parse(jwt);
  } catch (error) {
    console.error("Authentication error:", error);
    return false;
  }
};

export const isAdmin = () => {
  try {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return false;
    const userData = JSON.parse(jwt);
    return userData.user && userData.user.role === 1;
  } catch (error) {
    console.error("Admin check error:", error);
    return false;
  }
};

export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    let res = await axios.post(`${apiURL}/api/signin`, data);
    if (res.data.error) {
      throw new Error(res.data.error);
    }
    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    return { error: error.response?.data?.error || "Login failed. Please try again." };
  }
};

export const signupReq = async ({ name, email, password, cPassword }) => {
  const data = { name, email, password, cPassword };
  try {
    let res = await axios.post(`${apiURL}/api/signup`, data);
    if (res.data.error) {
      throw new Error(res.data.error);
    }
    return res.data;
  } catch (error) {
    console.error("Signup error:", error);
    return { error: error.response?.data?.error || "Signup failed. Please try again." };
  }
};
