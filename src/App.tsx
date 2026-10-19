import {Route, Routes} from 'react-router-dom'
import EventsList from './pages/EventsList'
import EventDetail from "./pages/EventDetail.tsx";
import CheckIn from "./pages/Checkin.tsx";
import CreateEvent from "./pages/CreateEvent.tsx";
import Certificate from "./pages/Certificate.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<EventsList/>}/>
            <Route path="/events/:id" element={<EventDetail/>}/>
            <Route path="/new" element={<CreateEvent/>}/>
            <Route path="/checkin/:token" element={<CheckIn/>}/>
            <Route path="/certificates/:id" element={<Certificate/>}/>
        </Routes>
    )
}