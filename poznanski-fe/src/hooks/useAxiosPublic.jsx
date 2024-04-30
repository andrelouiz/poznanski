import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://poznanski.onrender.com/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
