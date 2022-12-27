import React from 'react';
import P from 'prop-types';
import { loadPages } from '../api/load-pages';
import { Home } from '../templates/Home';

export default function Index({ data = null }) {
  return <Home data={data} />;
}

export const getStaticProps = async () => {
  let data;

  try {
    data = await loadPages('landing-page');
  } catch (error) {
    //
  }

  if (!data || !data.length) {
    return { notFound: true };
  }

  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
};

Index.propTypes = {
  data: P.array,
};
