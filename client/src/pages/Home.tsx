import React from 'react';
import HomeDoc from './docs/Home.mdx';
import { useMdxComps } from '../hooks/useMdxHooks';

const Home: React.FC = () => {
  const components = useMdxComps();
  return (
      <HomeDoc components={components} />
  );
};

export default Home;