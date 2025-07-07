import { Outlet } from 'react-router-dom'
import Header from './header'

export default function layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}