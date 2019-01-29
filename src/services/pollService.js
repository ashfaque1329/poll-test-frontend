import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/poll_test_project/api/polls";

function pollUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getPolls() {
  return http.get(apiEndpoint);
}

export function getPoll(id) {
  return http.get(pollUrl(id));
}

export function savePoll(poll) {
  return http.post(apiEndpoint, poll);
}

export function saveVote(id, pollVote) {
  return http.patch(pollUrl(id), pollVote);
}

export function deletePoll(id) {
  return http.delete(pollUrl(id));
}
