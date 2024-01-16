import BooksList from './components/BooksList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import BookDetails from './components/BookDetails';

function App() {

  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<BooksList />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
