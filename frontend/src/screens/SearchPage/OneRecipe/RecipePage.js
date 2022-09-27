import React from 'react'
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {createDocsAction} from '../../../redux/actions/documentAction';

const RecipePage = ({recipeData, recipeInstructions, setIsChoseRecipe}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let recipeHtml = '';
    let recipeHtmlTitle = '';
    if (recipeData)
    {
        recipeHtmlTitle += recipeData?.title;
        recipeHtml += `<h4>Ingredients</h4>`
        recipeHtml += `<ul className='ingred'>`
        recipeData?.extendedIngredients?.forEach(ingred => {
            recipeHtml += `<li><strong>${ingred?.name} -</strong> ${ingred?.original}</li>`
        })
        recipeHtml += `</ul>`
        if (recipeInstructions)
        {

            recipeHtml += `<h4>Instructions</h4>`
            recipeHtml += `<ul className='ingred'>`
            recipeInstructions?.steps?.forEach((step, i) => {
                recipeHtml += `<li><strong>Step ${i + 1} - </strong>${step.step}</li>`
            })
            recipeHtml += `</ul>`
        }

    }

    const onSaveHandler = () => {
        dispatch(createDocsAction(recipeHtmlTitle, recipeHtml, []));
        navigate('/my-recipes');
    }

    return (
        <>
            <div onClick={() => setIsChoseRecipe(false)} title='back' className="back-arr">&#x2190; back to list</div>
            <div className='recipe-page'>
                <div className='recipeHead'>
                    <h2>Recipe For {recipeData?.title}</h2>
                    {recipeData?.dishTypes?.length > 0 && recipeData?.dishTypes.map((type, i) => {
                        return (<span key={i}>{type} {i !== recipeData?.dishTypes.length - 1 ? ' | ' : ''}</span>)
                    })}
                    <div><img src={recipeData?.image} alt={recipeData?.title} /></div>
                </div>
                <button className='creat-new-btn' onClick={onSaveHandler}>Save New Recipe +</button>
                <div className='recipeBody'>
                    <div dangerouslySetInnerHTML={{__html: recipeHtml}}></div>
                </div>

            </div>
        </>
    )
}

export default RecipePage