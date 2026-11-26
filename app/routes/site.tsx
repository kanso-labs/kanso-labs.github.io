import { Outlet } from 'react-router'

import { AnalyticsBanner } from '../components/analytics'
import { SiteFooter, SiteHeader } from '../components/site'

// Every page shares the header and footer, and the analytics banner, so each
// route renders only its <main>.
export default function Site() {
  return (
    <>
      {/* First, so the keyboard reaches it before the page; it is fixed to
          the foot of the viewport wherever it sits in the document. */}
      <AnalyticsBanner />
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  )
}
