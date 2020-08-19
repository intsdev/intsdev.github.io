import axios from "axios";

const url =
  "https://drety0z068.execute-api.eu-west-1.amazonaws.com/dev/telegram/send";

const send = async (message) => {
  axios.post(url, { message });
};

export { send };
