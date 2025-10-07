import { Projects, Features, HeroBanner, Funders } from '@/components'
import { VideoDemo } from '@/components/video-demo'

import { Layout } from '@/components/layout'

export default function IndexPage() {
  return (
    <Layout
      url={`/`}
      title={'VirtualShip: Explore the ocean with a virtual research vessel'}
      card={
        'https://raw.githubusercontent.com/OceanParcels/oceanparcels_website/main/public/virtualship-assets/virtual_ship_logo_no-text.png'
      }
      // enableBanner
    >
      <HeroBanner />
      <Features />
      <VideoDemo />
      {/* <Projects /> TODO uncomment when projects are ready */}
      <Funders />
    </Layout>
  )
}
