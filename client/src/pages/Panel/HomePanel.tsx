import HomePage from './panelDocs/Home.mdx'
import { useMdxComps } from '../../hooks/useMdxHooks'

const HomePanel = () => {
  const mdxComps = useMdxComps()

  return <HomePage components={mdxComps}/>
}

export default HomePanel