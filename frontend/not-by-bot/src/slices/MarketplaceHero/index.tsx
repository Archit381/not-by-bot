"use client";

import Bounded from "@/app/components/Bounded";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type MarketplaceHeroProps =
  SliceComponentProps<Content.MarketplaceHeroSlice>;

const MarketplaceHero = async ({
  slice,
}: MarketplaceHeroProps): Promise<JSX.Element> => {
  const client = createClient();

  const genres = await Promise.all(
    slice.items.map(async (item) => {
      if (isFilled.contentRelationship(item.genre)) {
        return await client.getByID<Content.MarketplaceDocument>(item.genre.id);
      }
    }),
  );

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
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
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
      </div>
    </div>
  );
};

export default MarketplaceHero;
