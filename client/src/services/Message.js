import axios from "axios";

export const sendMessage = (data) => {
  return axios
    .post(`http://localhost:8000/api/send-message`, data)
    .then((response) => response.data);
};
