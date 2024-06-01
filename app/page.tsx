import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "./components/Navbar";
import { simpleBlogCard } from "./lib/interface";
import { client } from "./lib/sanity";
import Image from "next/image";

async function getPosts() {
  const query = `
  *[_type == 'blog']| order(_createdAt desc){
  title, shortDescription,
    "currentSlug" : slug.current,
    thumbnail
}
  `;

  const response = await client.fetch(query);
  return response;
}

type Props = {};

export default async function page({}: Props) {
  const data: simpleBlogCard[] = await getPosts();
  // console.log(data);

  return (
    <main>
      <Navbar />
      {/* blog card  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item, idx) => {
          return (
            <Card key={idx}>
              <Image src={item?.thumbnail} alt={item?.title} />
              <CardContent>
                <CardTitle>{item?.title}</CardTitle>
                <CardDescription>{item?.smallDescription}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
