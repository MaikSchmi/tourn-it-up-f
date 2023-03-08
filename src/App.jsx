import './App.css'
import { Route , Routes } from 'react-router'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import LandingPage from './pages/LandingPage'
import IsPrivate from './components/auth/IsPrivate'
import IsPublic from './components/auth/IsPublic'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import TournamentCreate from './pages/tournament/TournamentCreate'
import TournamentPage from './pages/tournament/TournamentPage'
import ProfileSettings from './pages/ProfileSettings'
import TournamentUpdate from './pages/tournament/TournamentUpdate'
import MembershipOptions from './pages/MembershipOptions'
import TournamentSearch from './pages/tournament/TournamentSearch'
import PostSignup from './pages/PostSignup'
import PageError from './pages/PageError'

function App() {
  return (
    <div className="App">

     <Routes>
      <Route path="/" element={<><NavBar /><Footer /></>}>
        <Route path="/" element={<IsPublic><LandingPage/></IsPublic>} />
        <Route path="/home" element={<IsPrivate><Home /></IsPrivate>} />
        <Route path="/membership-options" element={<MembershipOptions /> } />
        <Route path="/profile/:username" element={<IsPrivate> <Profile /> </IsPrivate>} />
        <Route path="/profile/settings" element={ <IsPrivate> <ProfileSettings /></IsPrivate>} />
        <Route path="/tournaments/create" element={<IsPrivate><TournamentCreate /></IsPrivate> } />
        <Route path="/tournaments/:id/update" element={<IsPrivate><TournamentUpdate /></IsPrivate> } />
        <Route path="/tournaments/:id" element={<IsPrivate><TournamentPage /></IsPrivate> } />
        <Route path="/tournaments/search?" element={<TournamentSearch/> } />
        <Route path="/*" element={<PageError />} />
      </Route>
      <Route path="/signup" element={<IsPublic><Signup /></IsPublic>} />
      <Route path="/post-signup" element={<PostSignup /> } />
      <Route path="/login" element={<IsPublic><Login /></IsPublic>} />
     </Routes>
    </div>
  )
}

export default App
