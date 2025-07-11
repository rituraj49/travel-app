import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import keycloak from "./keycloakConfig";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

axiosInstance.interceptors.request.use(config => {
    // if(keycloak.authenticated) {
    //     config.headers.Authorization = `Bearer ${keycloak.token}`;
    // }

    return config;
});

export default axiosInstance;