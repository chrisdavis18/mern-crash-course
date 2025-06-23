import { Box, Button, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import Navbar from './components/Navbar.jsx';

/**
 * The main application component.
 *
 * This component renders a single button with the text "Hello".
 *
 * @returns {ReactElement} The application component.
 */
function App() {
  
  return (
    // <>
    <Box minH="100vh">
      <Navbar bg={useColorModeValue("gray.100", "gray.900")}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>

    // </>
  )
}

export default App
