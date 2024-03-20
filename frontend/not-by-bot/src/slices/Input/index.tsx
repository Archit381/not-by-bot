import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Input`.
 */
export type InputProps = SliceComponentProps<Content.InputSlice>;

/**
 * Component for "Input" Slices.
 */
const Input = ({ slice }: InputProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading1: ({ children }) => (
            <h2 className="text-balance text-center text-5xl font-medium md:text-1xl">
              {children}
            </h2>
          ),
        }}
      />
      <div className="prose prose-invert mt-4 bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text not-italic text-transparent text-2xl">
        <PrismicRichText field={slice.primary.body} />
      </div>

    </Bounded>
  );
};

export default Input;
