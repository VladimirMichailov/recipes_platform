import { useContext, useEffect, useState } from 'react';
import UserContext from '../../Context/UserContext/UserContext';
import {
  getRecipesByUserId,
  getFavoritesByUser,
  getOneUser,
  getFollowByWho,
} from '../../services/get';
import ProfileRecipeCard from '../../Components/ProfileRecipeCard/ProfileRecipeCard';
import RecipesForm from '../../Components/Forms/RecipesForm/RecipesForm';
import RecipesContext from '../../Context/RecipesContentxt/RecipesContext';
import './ProfilePage.css';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import { useParams } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import ProfileFavoriteRecipeCard from '../../Components/ProfileFavoriteRecipeCard/ProfileFavoriteRecipeCard';
import ProfileFollowCard from '../../Components/ProfileFollowCard/ProfileFollowCard';

function ProfilePage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [createRecipeIsVisible, setCreateRecipeIsVisible] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [myRecipesIsVisible, setMyRecipesIsVisible] = useState(true);
  const [following, setFollowing] = useState([]);
  const [followingAuthorVisible, setFollowingAuthorVisible] = useState(false);
  const [favoriteRecipesIsVisible, setFavoriteRecipesIsVisible] = useState(false);
  const { id, setUser } = useContext(UserContext);
  const { recipeId } = useParams();
  const {
    recipes,
    setRecipes,
    update,
    setUpdate,
    updateRecipeFormIsVisible,
    setUpdateRecipeFormIsVisible,
    updateRecipe,
    filteredRecipes,
  } = useContext(RecipesContext);

  if (recipes.length === 0 && !sessionStorage.getItem('pageRefreshed')) {
    sessionStorage.setItem('pageRefreshed', 'true');
    window.location.reload();
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getOneUser(id);
        setUser(user);
      } catch (error) {
        setError('Failed to fetch user info.');
        console.error('Error fetching user info:', error);
      }
    };

    fetchUser();
  }, [id, setUser]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const rec = await getRecipesByUserId(id);
        setRecipes(rec);
        const fav = await getFavoritesByUser(id);
        setFavoriteRecipes(fav);

        const fol = await getFollowByWho(id);
        setFollowing(fol);
      } catch (error) {
        setError('Failed to fetch recipes.');
        console.error('Error fetching recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [id, recipeId, update, setRecipes]);

  return (
    <>
      <div className='profile-page-content'>
        <h1 className='profile-title'>Profile info</h1>
        <div className='profile-info'>
          <ProfileCard />
        </div>
        <div className='buttons-content'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => {
              setCreateRecipeIsVisible(!createRecipeIsVisible);
              setUpdateRecipeFormIsVisible(false);
            }}
          >
            Create New Recipe
          </button>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => {
              setCreateRecipeIsVisible(false);
              setUpdateRecipeFormIsVisible(false);
              setMyRecipesIsVisible(true);
              setFavoriteRecipesIsVisible(false);
              setFollowingAuthorVisible(false);
            }}
          >
            My recipes
          </button>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => {
              setCreateRecipeIsVisible(false);
              setUpdateRecipeFormIsVisible(false);
              setMyRecipesIsVisible(false);
              setFavoriteRecipesIsVisible(true);
              setFollowingAuthorVisible(false);
            }}
          >
            My favorite recipes
          </button>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => {
              setCreateRecipeIsVisible(false);
              setUpdateRecipeFormIsVisible(false);
              setMyRecipesIsVisible(false);
              setFavoriteRecipesIsVisible(false);
              setFollowingAuthorVisible(true);
            }}
          >
            Authors I follow
          </button>
        </div>
        {createRecipeIsVisible && (
          <RecipesForm setUpdate={setUpdate} setCreateRecipeIsVisible={setCreateRecipeIsVisible} />
        )}
        {updateRecipeFormIsVisible && (
          <RecipesForm
            setUpdate={setUpdate}
            recipe={updateRecipe}
            setUpdateRecipeFormIsVisible={setUpdateRecipeFormIsVisible}
          />
        )}
        <div className='container text-center'>
          <div className='recipe-list'>
            {isLoading ? (
              <div className='profile-loader'>
                <p className='profile-loading-text'>Loading...</p>
                <PulseLoader color='var(--primary-blue)' size={20} />
              </div>
            ) : myRecipesIsVisible ? (
              filteredRecipes.length === 0 ? (
                <div className='no-recipes'>No recipes found</div>
              ) : (
                filteredRecipes.map((recipe) => (
                  <div key={recipe.id} className='recipe-card'>
                    <ProfileRecipeCard
                      recipe={recipe}
                      createRecipeIsVisible={createRecipeIsVisible}
                      setCreateRecipeIsVisible={setCreateRecipeIsVisible}
                    />
                  </div>
                ))
              )
            ) : favoriteRecipesIsVisible ? (
              favoriteRecipes.length === 0 ? (
                <div className='no-recipes'>No favorite recipes found</div>
              ) : (
                favoriteRecipes.map((fRecipe, index) => (
                  <div key={index} className='recipe-card'>
                    <ProfileFavoriteRecipeCard favoriteRecipe={fRecipe} />
                  </div>
                ))
              )
            ) : followingAuthorVisible ? (
              following.length === 0 ? (
                <div className='no-recipes'>No followed authors found</div>
              ) : (
                following.map((foll, index) => (
                  <div key={index} className='recipe-card'>
                    <ProfileFollowCard followingWhat={foll} />
                  </div>
                ))
              )
            ) : null}
          </div>
        </div>
        <div className='footer-padding'></div>
      </div>
    </>
  );
}

export default ProfilePage;
