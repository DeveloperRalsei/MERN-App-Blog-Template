import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import HomeDoc from './docs/Home.mdx'

const Home: React.FC = () => {
  return (
    <MDXProvider>
      <HomeDoc/>
    </MDXProvider>
  )
}

export default Home