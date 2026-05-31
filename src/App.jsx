import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider }    from './context/AuthContext'
import { WardrobeProvider } from './context/WardrobeContext'
import ProtectedRoute from './components/ProtectedRoute'
import TopNavBar    from './components/TopNavBar'
import BottomNavBar from './components/BottomNavBar'
import FAB          from './components/FAB'
import Toast        from './components/Toast'
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
    <AuthProvider>
      <WardrobeProvider>
        <div className={isPublic ? 'public-wrapper' : 'app-wrapper'}>
          {!isPublic && <TopNavBar />}

          <Routes>
            {/* Public routes */}
            <Route path="/"         element={<LandingPage />}  />
            <Route path="/login"    element={<LoginPage />}    />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected app routes */}
            <Route path="/dashboard"  element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/closet"     element={<ProtectedRoute><ClosetPage /></ProtectedRoute>}    />
            <Route path="/closet/add" element={<ProtectedRoute><AddItemPage /></ProtectedRoute>}   />
            <Route path="/outfits"    element={<ProtectedRoute><OutfitsPage /></ProtectedRoute>}   />
            <Route path="/saved"      element={<ProtectedRoute><SavedPage /></ProtectedRoute>}     />
          </Routes>

          {!isPublic && <BottomNavBar />}
          {!isPublic && <FAB />}
          {!isPublic && <Toast />}
        </div>
      </WardrobeProvider>
    </AuthProvider>
  )
}
