import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";

const Index = ({ page }) => (
  <SliceZone slices={page.data.slices} components={components} />
)

export default Index

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData })

  const page = await client.getByUID("page", "home", { lang: locale })
  const settings = await client.getSingle("settings", { lang: locale })

  return {
    props: {
      page,
      settings
    }
  }
}
