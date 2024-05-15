
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/loginpage'
import EventsList from './Event/EventsList'
import SignUp from './pages/SignUp'
import Success from './pages/Succes'
import RequireAuth from './pages/RequireAuth'
import CreateEvent from './Event/CreateEvent'
import Profile from './User/Profile'
import EditProfile from './User/EditProfile'

function App() {
  return (
    <Routes>
         <Route path='/eventlist' element={<EventsList/>}/>
         <Route path='/' element={<SignUp/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/Success' element={<Success/>}/>
         <Route path='/user/profile' element={<Profile/>}/>
        <Route path='/event/create' element={<CreateEvent/>}/>
         <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
            {/* <Route path='/event/create' element={<CreateEvent/>}/> */}
            {/* <Route path='/admin/dashboard' element={<Dashboard/>}/>  */}
        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
            <Route path='/user/editprofile' element={<EditProfile/>}/>
        </Route>
    </Routes>
    
  )
}
export default App
