import axios from "axios";

const BASE_URL = "https://api.elderscrollslegends.io/v1";

export const fetchCards = async (page) => {
  // Replace the line below and perform API call to get cards
  
  return await fetch(BASE_URL+`/cards?pageSize=20&page=${page}`).then(response=>response.json());
};
