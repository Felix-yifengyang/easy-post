import { Outlet } from 'react-router-dom'
import Header from './header/'
import layout from '../../styles/components/layout/layout.module.css'

export default function Layout() {
  return (
    <div className={layout.layout}>
      <Header />
      <main className={layout.content}>
        <Outlet />
      </main>
    </div>
  )
}
