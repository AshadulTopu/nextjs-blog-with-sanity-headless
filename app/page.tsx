import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <section className="container mx-auto mt-6">
        {/* blog card  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-4">
          {data.map((item, idx) => {
            return (
              <Card key={idx} className="lg:p-6 p-4 rounded-md">
                <div className="relative w-72 h-72 mb-6">
                  <Image
                    // className="w-full h-full"
                    src={urlFor(item?.thumbnail).url()}
                    alt={item?.title}
                    // width={500}
                    // height={500}
                    fill
                    sizes="(min-width: 808px) 50vw, 100vw"
                    // style={{
                    //   width: "100%",
                    //   height: "auto",
                    // }}
                    blurDataURL={urlFor(item?.thumbnail).url()}
                    placeholder="blur"
                  />
                </div>
                <CardContent className="p-0">
                  <CardTitle className="mb-2 line-clamp-2">
                    {item?.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-4 text-gray-700 dark:text-gray-300">
                    {item?.shortDescription}
                  </CardDescription>
                  <Button asChild className="mt-8 w-full">
                    <Link href={`/blog/${item?.currentSlug}`}>Read More </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
