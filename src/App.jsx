import { Routes, Route, Navigate } from 'react-router-dom'
import TopNavBar    from './components/TopNavBar'
import BottomNavBar from './components/BottomNavBar'
import DashboardPage from './pages/DashboardPage'
import ClosetPage    from './pages/ClosetPage'
import AddItemPage   from './pages/AddItemPage'
import OutfitsPage   from './pages/OutfitsPage'
import SavedPage     from './pages/SavedPage'

export default function App() {
  return (
    <div className="app-wrapper">
      {/* Desktop-only top nav */}
      <TopNavBar />

      <Routes>
        <Route path="/"           element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard"  element={<DashboardPage />} />
        <Route path="/closet"     element={<ClosetPage />} />
        <Route path="/closet/add" element={<AddItemPage />} />
        <Route path="/outfits"    element={<OutfitsPage />} />
        <Route path="/saved"      element={<SavedPage />} />
      </Routes>

      {/* Mobile-only bottom nav */}
      <BottomNavBar />
    </div>
  )
}
