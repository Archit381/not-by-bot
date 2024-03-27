"use client";

import Bounded from "@/app/components/Bounded";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import {
  Spinner,
  Card,
  CardBody,
  Image,
  Button,
  CardHeader,
} from "@nextui-org/react";
import supabase from "../../../supabase";
import { useEffect, useState } from "react";
import Cards from "@/app/components/cards";

export type MarketplaceHeroProps =
  SliceComponentProps<Content.MarketplaceHeroSlice>;

interface Item {
  content_id: string;
  content_genre: string;
  content_name: string;
  content_img: string;
  content_likes: number;
  content_owner_id: string;
}

const MarketplaceHero = async ({
  slice,
}: MarketplaceHeroProps): Promise<JSX.Element> => {
  const client = createClient();
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState<Content.MarketplaceDocument[]>([]);
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      const genresData = await Promise.all(
        slice.items.map(async (item) => {
          if (isFilled.contentRelationship(item.genre)) {
            return await client.getByID<Content.MarketplaceDocument>(
              item.genre.id,
            );
          }
        }),
      );
      setGenres(
        genresData.filter(
          (genre) => genre !== undefined,
        ) as Content.MarketplaceDocument[],
      );
      setLoading(false);
    };

    const fetchData = async () => {
      try {
        let { data: all_content, error } = await supabase
          .from("all_content")
          .select("*");

        if (all_content) {
          setData(all_content);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGenres();
    fetchData();
  }, []);

  return (
    <div>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="text-center"
      >
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-balance text-center text-5xl font-medium md:text-7xl">
                {children}
              </h2>
            ),
            em: ({ children }) => (
              <em className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text not-italic text-transparent">
                {children}
              </em>
            ),
          }}
        />

        <div className="mt-6 text-slate-300">
          <PrismicRichText field={slice.primary.body} />
        </div>
      </Bounded>
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:items-center">
        <div className="mt-2 grid max-w-7xl grid-rows-[auto_auto_auto] items-center justify-center gap-8 self-center md:grid-cols-6 md:gap-10">
          {genres.map(
            (genre, index) =>
              genre && (
                <div key={genre.id}>
                  <PrismicNextLink document={genre}>
                    <div className="flex items-center justify-center rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 p-7 px-9 backdrop-blur-sm hover:border-yellow-300 hover:text-yellow-300">
                      <PrismicRichText field={genre.data.heading} />
                    </div>
                  </PrismicNextLink>
                </div>
              ),
          )}
        </div>

        <div
          style={{
            alignSelf: "flex-start",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <h3 style={{ fontSize: 25, width: "100%",marginBottom: 30 }}>
            Unlock a world of captivating stories handpicked just for you!
          </h3>
          {data.map((item: Item) => {
            return (
              <div
                key={item.content_id}
                style={{ flex: "0 0 auto", margin: 8}}
              >
                <Card className="py-4 bg-gradient-to-b from-gray-900 to-gray-950">
                  <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
                    <p className="text-tiny font-bold uppercase text-white">{item.content_genre}</p>
                    <small className="text-default-500">{item.content_likes} Likes</small>
                    <h4 className="text-large font-bold text-white">{item.content_name}</h4>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Image
                      alt="Card background"
                      className="rounded-xl object-cover"
                      src="https://source.unsplash.com/random?wallpapers"
                      width={190}
                    />
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHero;
