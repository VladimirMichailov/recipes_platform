import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import RecipesPage from './pages/RecipesPage/RecipesPage';
import UserContext from './Context/UserContext/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AdminPage from './pages/AdminPage/AdminPage';
import { CategoriesProvider } from './Context/CategoriesContext/CategoriesContext';
import { RecipesProvider } from './Context/RecipesContentxt/RecipesContext';
import RecipeDetailsPage from './pages/RecipeDetailsPage/RecipeDetailsPage';

import { useContext } from 'react';
import UserRecipesPage from './pages/UserRecipesPage/UserRecipesPage';

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <ToastContainer autoClose={1200} position='top-center' />
      <CategoriesProvider>
        <RecipesProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Navigate to='/recipes' />} />
            {!isLoggedIn ? (
              <>
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
              </>
            ) : (
              <>
                <Route path='/register' element={<Navigate to='/recipes' replace />} />
                <Route path='/login' element={<Navigate to='/recipes' replace />} />
              </>
            )}
            <Route path='/recipes' element={<RecipesPage />} />
            <Route
              path='/admin'
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path='/recipe/:id' element={<RecipeDetailsPage />} />
            <Route path='/user/recipes/:id' element={<UserRecipesPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </RecipesProvider>
      </CategoriesProvider>
      <Footer />
    </>
  );
}

export default App;
