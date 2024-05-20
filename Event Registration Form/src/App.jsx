
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/loginpage'
import EventsList from './Event/EventsList'
import SignUp from './pages/SignUp'
import Success from './pages/Succes'
import CreateEvent from './Event/CreateEvent'
import Profile from './User/Profile'
import EditProfile from './User/EditProfile'
import AlreadyRegistered from './pages/AlreadyRegistered'
import DiniedPage from './pages/DiniedPage copy'
import EventDescription from './Event/EventDescription'
import EditEvent from './Event/EditEventdetails'

function App() {
  return (
    <Routes>
         <Route path='/eventlist' element={<EventsList/>}/>
         <Route path='/' element={<SignUp/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='event/edit' element={<EditEvent/>}/>
         <Route path='/Success' element={<Success/>}/>
         <Route path='/denied' element={<DiniedPage/>}/>
         <Route path='/alreadyregistered' element={<AlreadyRegistered/>}/>
         <Route path='/event/create' element={<CreateEvent/>}/>
         <Route path='/user/editprofile' element={<EditProfile/>}/>
         <Route path='/user/profile' element={<Profile/>}/>
         <Route path='/eventDescription/:eventId' element={<EventDescription/>}/>


         {/* <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
            <Route path='/admin/dashboard' element={<Dashboard/>}/> 
        </Route> */}
        {/* <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
        </Route> */}
    </Routes>
    
  )
}
export default App
