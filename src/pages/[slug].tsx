import P from "prop-types";
import { loadPages } from "../api/load-pages";
import { useRouter } from "next/router";
import { Loading } from "../templates/Loading";
import { Home, HomeProps } from "../templates/Home";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Page({ data }: HomeProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return <Home data={data} />;
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: "udemy" } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<HomeProps> = async (ctx) => {
  let data = null;

  try {
    data = await loadPages(ctx.params.slug as string);
  } catch (error) {
    data = null;
  }
  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
};
