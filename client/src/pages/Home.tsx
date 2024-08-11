import React from 'react';
import HomeDoc from './docs/Home.mdx';
import { MDXProvider } from '@mdx-js/react';
import { useMdxComps } from '../hooks/useMdxHooks';

const Home: React.FC = () => {
  const components = useMdxComps();
  return (
    <MDXProvider>
      <HomeDoc components={components} />
      
    </MDXProvider>
  );
};

export default Home;