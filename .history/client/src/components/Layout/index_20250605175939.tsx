import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <h2>这里是导航栏</h2>
      <Outlet />
    </div>
  )
}