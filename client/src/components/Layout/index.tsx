import { Outlet } from 'react-router-dom'
import Header from './header/'
import layoutStyles from '../../styles/components/layout/layout.module.css'

export default function Layout() {
  return (
    <div className={layoutStyles.layout}>
      <Header />
      <main className={layoutStyles.content}>
        <Outlet />
      </main>
    </div>
  )
}
