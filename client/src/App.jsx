import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateFirstNote from './pages/CreateFirstNote'
import InsideNotes from './pages/InsideNotes'
import CreateNotes from './pages/CreateNotes'
import StartScreen from './pages/StartScreen'
import SingInCampusNotes from './pages/SingInCampusNotes'
import LoggInCampusNotes from './pages/LoggInCampusNotes'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<StartScreen/>} />
        <Route path='/SingIn' element={<SingInCampusNotes />} />
        <Route path='/LogIn' element={<LoggInCampusNotes/>} />
        <Route path='/CreateFirstNote' element={<CreateFirstNote />} />
        <Route path='/InsideNotes/:id' element={<InsideNotes />} />
        <Route path='/CreateNotes' element={<CreateNotes />} />
      </Routes>
    </Router>
  )
}

export default App