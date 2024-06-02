import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

type Props = {
  slug: string;
};

async function getData(slug: string) {
  const query = `
*[_type == "blog" && slug.current == "${slug}"] {
    "currentSlug" : slug.current,
    title,
    content,
    thumbnail,
    mainImage
}[0]
`;

  const data = await client.fetch(query);
  return data;
}

export default async function page({ params }: { params: Props }) {
  const data: fullBlog = await getData(params?.slug);

  //   console.log(data);

  return (
    <section className="container mx-auto">
      <div className="relative w-full h-96 mx-auto my-6">
        <Image
          src={urlFor(data?.thumbnail).url()}
          // width={500}
          // height={500}
          fill={true}
          // sizes="(min-width: 500px) 30vw, 80vw"
          // style={{ width: "100%", height: "auto" }}
          alt="title image"
          //   className="mx-auto my-6"
        />
      </div>
      <h1 className="text-5xl fw-bold mb-8">{data?.title}</h1>
      <div className="prose prose-lg prose-blue dark:prose-invert prose-headings:underline prose-li:marker:text-primary">
        <PortableText value={data?.content} />
      </div>
    </section>
  );
}
