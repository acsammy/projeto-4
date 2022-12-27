import P from 'prop-types';
import { loadPages } from '../api/load-pages';
import { useRouter } from 'next/router';
import Home from '../templates/Home';
import { Loading } from '../templates/Loading';

export default function Page({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return <Home data={data} />;
}

Page.propTypes = {
  data: P.object,
};

export const getStaticPaths = async () => {
  // const paths = await (
  //   await loadPages()
  // ).map((page) => {
  //   return {
  //     params: {
  //       slug: page.slug,
  //     },
  //   };
  // });
  return {
    paths: [{ params: { slug: 'udemy' } }],
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  let data = null;

  try {
    data = await loadPages(ctx.params.slug);
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
