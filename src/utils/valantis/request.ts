import axios, { AxiosInstance } from "axios";
import { md5 } from "js-md5";
import { VITE_VALANTIS_BACKEND_PASSWORD } from "../../constants/valantis-backend-password";

export interface Config {
  baseUrl: string;
  customHeaders?: Record<string, any>;
}

export type RequestMethod = "DELETE" | "POST" | "GET";

class Client {
  private axiosClient: AxiosInstance;

  constructor(config: Config) {
    this.axiosClient = this.createClient(config);
  }

  createClient(config: Config) {
    const client = axios.create({
      baseURL: config.baseUrl,
    });

    return client;
  }

  setHeaders() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}${
      currentDate.getMonth() + 1 > 10
        ? currentDate.getMonth() + 1
        : `0${currentDate.getMonth() + 1}`
    }${
      currentDate.getDate() < 10
        ? `0${currentDate.getDate()}`
        : currentDate.getDate()
    }`;
    console.log(formattedDate);
    const xAuth = md5(`${VITE_VALANTIS_BACKEND_PASSWORD}_${formattedDate}`);

    const defaultHeaders: Record<string, any> = {
      "Content-Type": "application/json",
      "X-Auth": xAuth,
    };

    return defaultHeaders;
  }
  async request(
    method: RequestMethod,
    path: string,
    payload: Record<string, any> = {}
  ): Promise<any> {
    const reqOpts = {
      method,
      url: path,
      json: true,
      headers: this.setHeaders(),
    };

    if (["POST", "DELETE"].includes(method)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      reqOpts["data"] = payload;
    }

    const { data, ...response } = await this.axiosClient(reqOpts);

    return { ...data, response };
  }
}

export default Client;
