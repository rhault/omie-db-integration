import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const fetchOmie = async (url, call, param) => {
  const data = {
    call: call,
    app_key: process.env.API_KEY,
    app_secret: process.env.API_SECRET,
    param: param,
  };

  try {
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw error;
  }
};
