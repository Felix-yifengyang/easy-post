import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import ProfilePage from './pages/profile'
import HomePage from './pages/home'
import Layout from './components/layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
