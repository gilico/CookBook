import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import MainComp from '../../components/MainComp/MainCom';
import SearchComp from "./SearchComp/SearchComp";
import Expire from "../../components/Expire";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import './Search.css'
import {getRandomRecipesAsync, searchApiRecipeByCuisineAsync, searchApiRecipeByQueryAsync as searchApiRecipesByQueryAsync} from '../../Api/api-requests';
import SearchResultComp from './SearchResultComp/SearchResultComp';


const Search = () => {
    const cuisine = [
        "African",
        "American",
        "British",
        "Cajun",
        "Caribbean",
        "Chinese",
        "Eastern European",
        "European",
        "French",
        "German",
        "Greek",
        "Indian",
        "Irish",
        "Italian",
        "Japanese",
        "Jewish",
        "Korean",
        "Latin American",
        "Mediterranean",
        "Mexican",
        "Middle Eastern",
        "Nordic",
        "Southern",
        "Spanish",
        "Thai",
        "Vietnamese",
    ]
    const [isQuerySearch, setIsQuerySearch] = useState(false)
    const [errMessage, setErrMessage] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [cuisineValue, setCuisineValue] = useState('');
    const [recipesResult, setRecipesResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const [isByQuisine, setIsByQuisine] = useState(false);
    const [offset, setOffset] = useState(12)

    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const setOffsetEvent = (val) => {
        if (offset === 0 && val === -12)
        {
            setErrMessage("No more previuos results")
        } else
        {
            setOffset(offset + val);
            if (searchValue)
            {
                searcApihHandler(null, searchValue, offset)
            } else if (isByQuisine)
            {
                getCuisineRecipes(cuisineValue, offset)
            }
        }

    }

    const getRandomRecipe = async (type) => {
        if (type === -1)
        {
            setIsRandom(true);
        }
        else
        {
            try
            {

                setOffset(0);
                setRecipesResult([]);
                setIsLoading(true);
                let response = await getRandomRecipesAsync(offset);
                setRecipesResult(response.recipes);
                setIsLoading(false);
            } catch (error)
            {
                setErrMessage(error.message)
            }
        }
    }

    const searcApihHandler = async (e, searchVal, offset = 0) => {
        if (e)
            e.preventDefault();
        try
        {
            if (searchVal === "")
            {
                setErrMessage("Must enter a search parameter")
            } else
            {
                setSearchValue(searchVal);
                setIsLoading(true);
                let response = await searchApiRecipesByQueryAsync(searchVal, offset);

                setRecipesResult(response.results);
                setIsLoading(false);
            }
        } catch (error)
        {
            setErrMessage(error.message)
        }
    }

    const getCuisineRecipes = async (cuisine, offset = 0) => {
        try
        {
            setIsLoading(true);
            setRecipesResult([]);
            let response = await searchApiRecipeByCuisineAsync(cuisine, offset);
            setRecipesResult(response.results);
            setIsLoading(false);
        } catch (error)
        {
            setErrMessage(error.message)
        }
    }

    useEffect(() => {
        if (!userInfo)
        {
            navigate('/signup');
        }

    }, [navigate, userInfo]);


    return (
        <MainComp title={'Search New Recipe'}>
            <div className='search-main-box'>
                {/* <div className='box-search' onClick={() => setIsQuerySearch(false)}>Search By Cuisine</div> */}
                <div className='box-search'
                    onClick={() => {
                        setIsQuerySearch(true);
                        setIsRandom(false);
                        setIsByQuisine(false);
                        setOffset(0);
                        setRecipesResult([]);
                    }}>Free search</div>
                <div className='box-search'
                    onClick={() => {
                        setIsQuerySearch(false);
                        getRandomRecipe(-1);
                        setIsByQuisine(false);
                        setRecipesResult([]);
                    }}>Random Recipes</div>
                <div className='box-search'
                    onClick={() => {
                        setIsQuerySearch(false);
                        setIsRandom(false);
                        setIsByQuisine(true);
                        setOffset(0);
                        setRecipesResult([]);
                    }}>Recipes By Cuisine</div>
            </div>
            {isRandom && <div className='rand-cont' onClick={() => getRandomRecipe(1)}>Suprise Me!</div>}
            {isQuerySearch && <SearchComp searcApihHandler={searcApihHandler} isQuerySearch={isQuerySearch} />}
            {errMessage && <Expire delay="3000"><ErrorMessage>{errMessage}</ErrorMessage></Expire>}
            {recipesResult?.length > 0 && <SearchResultComp isRandom={isRandom} recipesResult={recipesResult} setOffsetEvent={setOffsetEvent} />}
            {isLoading && <Loading />}
            {recipesResult?.length === 0 && isByQuisine && <div className='cuisines'>
                {cuisine.map((cuisine, i) => {
                    return <div key={i} className='cuisineName' onClick={() => {getCuisineRecipes(cuisine); setCuisineValue(cuisine)}}>{cuisine}</div>
                })}
            </div>}
        </MainComp >
    )
}

export default Search