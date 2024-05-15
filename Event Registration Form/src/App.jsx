
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/loginpage'
import EventsList from './Event/EventsList'
import SignUp from './pages/SignUp'
import EventDescription from './Event/EventDescription'

function App() {
  return (
    <Routes>
         <Route path='/eventdescription' element={<EventDescription/>}/>
         <Route path='/' element={<EventsList/>}/>
         <Route path='/signup' element={<SignUp/>}/>
         <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default App
