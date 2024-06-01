import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "71u8ycpe",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false,
});
