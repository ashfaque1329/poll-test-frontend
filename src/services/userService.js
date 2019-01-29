import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/rest-auth/registration/";

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.name,
    password1: user.password,
    password2: user.password,
    email: user.email
  });
}
