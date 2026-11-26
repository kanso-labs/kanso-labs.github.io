import { Outlet } from 'react-router'

import { AnalyticsBanner } from '../components/analytics'
import { SiteFooter, SiteHeader } from '../components/site'

// Every page shares the header and footer, and the analytics banner, so each
// route renders only its <main>.
export default function Site() {
  return (
    <>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
      <AnalyticsBanner />
    </>
  )
}
