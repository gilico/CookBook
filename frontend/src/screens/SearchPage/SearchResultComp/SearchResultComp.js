import React, {useEffect, useState} from 'react'
import {getRecipeAsync, getRecipeInstructionsAsync} from '../../../Api/api-requests'
import Loading from '../../../components/Loading'
import RecipePage from '../OneRecipe/RecipePage'

const SearchResultComp = ({recipesResult, setOffsetEvent, isRandom}) => {
    const [results, setResults] = useState([])
    const [oneRecipeResults, setOneRecipeResults] = useState([])
    const [oneInstructionResults, setOneInstructionResults] = useState([])
    const [isChoseRecipe, setIsChoseRecipe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleClickOnRcipe = async (id) => {
        setIsLoading(true);
        let indrediantsResponse = await getRecipeAsync(id);
        let instructionsResponse = await getRecipeInstructionsAsync(id);
        console.log(instructionsResponse)
        setIsLoading(false);
        setOneInstructionResults(instructionsResponse);
        setOneRecipeResults(indrediantsResponse);
        setIsChoseRecipe(true);
    }

    useEffect(() => {
        if (recipesResult.length > 0)
        {
            setResults(recipesResult);
        }
    }, [setResults, results, recipesResult])

    return (
        <>
            {!isChoseRecipe && <>
                {isLoading && <Loading />}
                <div className='recipe-results'>
                    {results && results.map((recipe) => {
                        return (<div key={recipe.id} className="recipe-item" onClick={() => handleClickOnRcipe(recipe.id)}>
                            <h4>{recipe.title}</h4>
                            <div className='rec-img-cont'><img src={recipe.image} alt="" /></div>
                        </div>)
                    })}
                </div>
                {!isRandom && <div className='paginator'>
                    <div onClick={() => setOffsetEvent(-12)} title='prev' className="pag-arr">&#x2190;</div>
                    <div onClick={() => setOffsetEvent(12)} title='next' className="pag-arr">&#x2192;</div>
                </div>}
            </>}
            {isChoseRecipe && <>
                <RecipePage recipeData={oneRecipeResults} recipeInstructions={oneInstructionResults[0]} setIsChoseRecipe={setIsChoseRecipe} />
            </>}
        </>
    )
}

export default SearchResultComp