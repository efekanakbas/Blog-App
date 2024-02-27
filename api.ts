import axios from "axios";

//! User

//get
export const getUser = async () => {
  const { data } = await axios.get(`https://65cbe2afefec34d9ed883ace.mockapi.io/users/1`);
  return data;
};

//post
export const postUser = async (obj: object) => {
    await axios.post(`https://65cbe2afefec34d9ed883ace.mockapi.io/users`, obj);
  };

//put
export const putUser = async (obj: object) => {
  await axios.put(`https://65cbe2afefec34d9ed883ace.mockapi.io/users/1`, obj);
};
//!

//! Search
  //get
  export const getSearch = async () => {
    const { data } = await axios.get(`https://65cbe2afefec34d9ed883ace.mockapi.io/search/1`);
    return data;
  };
//!


