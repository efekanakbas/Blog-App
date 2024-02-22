import axios from "axios";

//! User

//get
export const getUser = async () => {
  const { data } = await axios.get(`https://65cbe2afefec34d9ed883ace.mockapi.io/users`);
  return data;
};

//post
export const postUser = async (obj: object) => {
    await axios.post(`https://65cbe2afefec34d9ed883ace.mockapi.io/users`, obj);
  };
  

//!
