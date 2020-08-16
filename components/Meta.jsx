import Head from 'next/head';
import { labels } from '../lib/config';
const { applicationName } = labels;

const Meta = () => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{formatMetaTitle()}</title>
    </Head>
  );
};

const formatMetaTitle = (subtitle = null) => {
  if (!subtitle) return applicationName;
  return `${applicationName} | ${subtitle}`;
};

export default Meta;
export { formatMetaTitle };
