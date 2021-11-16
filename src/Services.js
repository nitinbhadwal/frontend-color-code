import axios from "axios";

export async function getData() {
  const response = await axios.get(
    `https://color-code-backend.herokuapp.com/v1/colours-code`
  );
  return response;
}

export const API = "https://color-code-backend.herokuapp.com/v1/colours-code";
