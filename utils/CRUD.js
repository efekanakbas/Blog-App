'use server'
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { cookies } from 'next/headers';





// Axios istemcisini oluştur ve yapılandır
const createNetworkClient = () => {
 
  const network = axios.create({
    // baseURL: "https://efekan-akbas-9a21d3a06c36.herokuapp.com/",
    baseURL: "http://localhost:5000/",
  });

  // İstekleri yakalama ve token ekleme
  network.interceptors.request.use(async (config) => {
   
    const {value} = cookies().get('token')
    
    
    if (value) {
      config.headers.authorization = `Bearer ${value}`;
    }
    return config;
  });

  // Yanıtları yakalama ve 403 durumunda yönlendirme
  network.interceptors.response.use(null, (error) => {
    if (error.response.status === 403) {
      Cookies.remove('token')
      location.href = "/login";
    }
    return Promise.reject(error);
  });

  return network;
};

// HTTP isteklerini yapan fonksiyonlar
const network = createNetworkClient();

const getData = async (path) => {
  return await network.get(path).then((r) => r.data);
};

const postData = async (path, body) => {
  return await network.post(path, body).then((r) => r.data);
};

const putData = async (path, body) => {
  return await network.put(path, body).then((r) => r.data);
};

const patchData = async (path, body) => {
  return await network.patch(path, body).then((r) => r.data);
};

const deleteData = async (path, body) => {
  return await network({
    method: "DELETE",
    data: body,
    url: path,
  }).then((r) => r.data);
};

// Fonksiyonları dışa aktar
export { getData, postData, putData, patchData, deleteData };
