import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PropTypes from 'prop-types';
import { RotateLoader } from 'react-spinners';
import ProtectedRoute from './components/ProtectedRoute';
import Companies from './components/admin/AdminCompany/Companies';
import PageNotFound from './components/pageNotFound/PageNotFound';
import AddCompany from './components/admin/AdminCompany/AddCompany';
import AdminJobs from './components/admin/AdminJob/AdminJobs';
import AddJob from './components/admin/AdminJob/AddAdminJob';
import JobApplicants from './components/admin/Applicants/JobApplicants';

const Home = lazy(() => import('./components/Home/Home'));
const Login = lazy(() => import('./components/auth/Login'));
const Signup = lazy(() => import('./components/auth/Signup'));
const Jobs = lazy(() => import('./components/Jobs/Jobs'));
const Browse = lazy(() => import('./components/Browse/Browse'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Description = lazy(() => import('./components/Jobs/JobDescription'));

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
        <Route path="/jobs/description/:id" element={
          <ProtectedRoute>
            <LazyRoute element={<Description />} />
          </ProtectedRoute>}
        />
        <Route path="/profile" element={
          <ProtectedRoute>
            <LazyRoute element={<Profile />} />
          </ProtectedRoute>
        } />


        {/* ----------Admin---------- */}
        <Route path='/admin/companies' element={
          <ProtectedRoute allowedRoles={['Recruiter']}>
            <LazyRoute element={<Companies />} />
          </ProtectedRoute>
        }
        />

        <Route path='/admin/company/add' element={
          <ProtectedRoute allowedRoles={['Recruiter']}>
            <LazyRoute element={<AddCompany />} />
          </ProtectedRoute>
        }
        />

        <Route path='/admin/company/edit/:id' element={
          <ProtectedRoute allowedRoles={['Recruiter']}>
            <LazyRoute element={<AddCompany />} />
          </ProtectedRoute>
        }
        />

        <Route path='/admin/jobs/' element={
          <ProtectedRoute allowedRoles={['Recruiter']}>
            <LazyRoute element={<AdminJobs />} />
          </ProtectedRoute>
        }
        />

        <Route path='/admin/job/add' element={
          <ProtectedRoute allowedRoles={['Recruiter']}>
            <LazyRoute element={<AddJob />} />
          </ProtectedRoute>
        }
        />

        <Route path='/admin/job/edit/:id' element={
          <ProtectedRoute allowedRoles={['Recruiter']}>
            <LazyRoute element={<AddJob />} />
          </ProtectedRoute>
        }
        />

        <Route path='/admin/job/applicants/:id' element={
          <ProtectedRoute allowedRoles={['Recruiter']}>
            <LazyRoute element={<JobApplicants />} />
          </ProtectedRoute>
        }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

LazyRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default App;
