import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices";

const Page = ({ page }) => {
  return (
    <>
      <div><h1>THIS IS A UID PAGE V2</h1></div>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
};

export default Page;

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", params.uid, { lang: locale });

  return {
    props: {
      page,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient()

  const pages = await client.getAllByType("page", { lang: "*" })

  return {
    paths: pages.map((page) => {
      return {
        params: { uid: page.uid },
        locale: page.lang
      }
    }),
    fallback: false
  }
}
