import { Outlet } from 'react-router'

import { SiteFooter, SiteHeader } from '../components/site'

// Every page shares the header and footer, so each route renders only its
// <main>.
export default function Site() {
  return (
    <>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  )
}
