import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PropTypes from 'prop-types';
import { RotateLoader } from 'react-spinners';

const Home = lazy(() => import('./components/Home/Home'));
const Login = lazy(() => import('./components/auth/Login'));
const Signup = lazy(() => import('./components/auth/Signup'));
const Jobs = lazy(() => import('./components/Jobs/Jobs'));
const Browse = lazy(() => import('./components/Browse/Browse'));

const LazyRoute = ({ element }) => (
  <Suspense fallback={
    <div className='flex justify-center items-center h-screen'>
      <RotateLoader color='#F83002' />
    </div>
  }>
    {element}
  </Suspense>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LazyRoute element={<Home />} />} />
        <Route path="/login" element={<LazyRoute element={<Login />} />} />
        <Route path="/signup" element={<LazyRoute element={<Signup />} />} />
        <Route path="/jobs" element={<LazyRoute element={<Jobs />} />} />
        <Route path="/browse" element={<LazyRoute element={<Browse />} />} />
      </Routes>
    </Router>
  );
}

LazyRoute.propTypes = {
  element: PropTypes.node.isRequired,
};
export default App;
