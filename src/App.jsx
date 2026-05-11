import { Routes, Route, useLocation } from 'react-router-dom'
import TopNavBar    from './components/TopNavBar'
import BottomNavBar from './components/BottomNavBar'
import LandingPage   from './pages/LandingPage'
import LoginPage     from './pages/LoginPage'
import RegisterPage  from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ClosetPage    from './pages/ClosetPage'
import AddItemPage   from './pages/AddItemPage'
import OutfitsPage   from './pages/OutfitsPage'
import SavedPage     from './pages/SavedPage'

const PUBLIC_PATHS = ['/', '/login', '/register']

export default function App() {
  const location = useLocation()
  const isPublic = PUBLIC_PATHS.includes(location.pathname)

  return (
    <div className={isPublic ? 'public-wrapper' : 'app-wrapper'}>
      {!isPublic && <TopNavBar />}

      <Routes>
        {/* Public routes */}
        <Route path="/"         element={<LandingPage />}   />
        <Route path="/login"    element={<LoginPage />}     />
        <Route path="/register" element={<RegisterPage />}  />

        {/* App routes */}
        <Route path="/dashboard"  element={<DashboardPage />} />
        <Route path="/closet"     element={<ClosetPage />}    />
        <Route path="/closet/add" element={<AddItemPage />}   />
        <Route path="/outfits"    element={<OutfitsPage />}   />
        <Route path="/saved"      element={<SavedPage />}     />
      </Routes>

      {!isPublic && <BottomNavBar />}
    </div>
  )
}
