import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://poznanski-server.onrender.com/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
