import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateFirstNote from './pages/CreateFirstNote'
import InsideNotes from './pages/InsideNotes'
import CreateNotes from './pages/CreateNotes'


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path='/CreateFirstNote' element={<CreateFirstNote />} />
        <Route path='/InsideNotes' element={<InsideNotes />} />
        <Route path='/CreateNotes' element={<CreateNotes />} />
      </Routes>
    </Router>
  )
}

export default App