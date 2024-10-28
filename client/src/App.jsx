import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateFirstNote from './pages/CreateFirstNote'



function App() {
  return (
    <Router>
      <Routes>
        
        <Route path='/CreateFirstNote' element={<CreateFirstNote />} />
     
      </Routes>
    </Router>
  )
}

export default App