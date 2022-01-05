import { Options } from "ky/distribution/types/options";

export const createRequest = (request: object): Options => {
  return { json: request };
};
