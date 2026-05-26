import {
  Projects,
  Features,
  HeroBanner,
  Funders,
  FindUs,
  GetStarted,
} from '@/components'
import { VideoDemo } from '@/components/video-demo'

import { Layout } from '@/components/layout'

export default function IndexPage() {
  return (
    <Layout
      url={`/`}
      title={'VirtualShip: Explore the ocean with a virtual research vessel'}
      card={
        'https://github.com/Parcels-code/virtualship.parcels-code.org/blob/main/public/virtualship-assets/logo_no-text.png?raw=true'
      }
      // enableBanner
    >
      <HeroBanner />
      <GetStarted />
      <Features />
      <VideoDemo />
      <FindUs />
      {/* <Projects /> TODO uncomment when projects are ready */}
      <Funders />
    </Layout>
  )
}
