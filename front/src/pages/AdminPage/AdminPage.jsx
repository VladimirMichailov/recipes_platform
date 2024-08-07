import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CategoriesList from '../../Components/CategoriesList/CategoriesList';
import CategoriesForm from '../../Components/Forms/CategoriesForm/CategoriesForm';
import { getAllCategories } from '../../services/get';
import './AdminPage.css';
import CategoriesContext from '../../Context/CategoriesContext/CategoriesContext';
import DotLoader from 'react-spinners/DotLoader';

const AdminPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { update, setCategories, categories } = useContext(CategoriesContext);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <div className='row admin-page'>
      <h1 className='text-center mt-3'>Categories</h1>

      <div className='d-flex flex-column align-items-end mt-3'>
        <CategoriesForm className='col-12 col-md-8 d-flex flex-column' />
      </div>

      {isLoading ? (
        <div className='admin-loader'>
          <DotLoader color='var(--primary-blue)' size={50} />
          <p className='admin-loading-text'>Loading...</p>
        </div>
      ) : categories.length === 0 ? (
        <p className='no-categories'>No categories found</p>
      ) : (
        <CategoriesList />
      )}
    </div>
  );
};

export default AdminPage;
