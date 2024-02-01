import './App.css';
import NavBar from './ui/NavBar';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Outlet />
    </>
  );
};

export default App;
