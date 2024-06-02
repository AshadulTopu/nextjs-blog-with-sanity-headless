import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "71u8ycpe",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false,
});

export const urlFor = (source: any) => imageUrlBuilder(client).image(source)