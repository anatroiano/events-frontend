import {Route, Routes} from 'react-router-dom'

import Navbar from './components/Navbar'
import {routes} from './lib/routes'
import Certificate from './pages/Certificate'
import CheckIn from './pages/CheckIn'
import CreateEvent from './pages/CreateEvent'
import EventDetail from './pages/EventDetail'
import EventsList from './pages/EventsList'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <Routes>
        <Route path={routes.events} element={<EventsList/>}/>
        <Route path={routes.eventDetail} element={<EventDetail/>}/>
        <Route path={routes.createEvent} element={<CreateEvent/>}/>
        <Route path={routes.checkIn} element={<CheckIn/>}/>
        <Route path={routes.certificate} element={<Certificate/>}/>
      </Routes>
    </div>
  )
}
