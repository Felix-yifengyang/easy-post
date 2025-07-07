import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import ProfilePage from './pages/profile';
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App