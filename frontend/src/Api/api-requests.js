const apiKey = "apiKey=fd3c00f294614cd6b38556b65201356b";
const apiUrl = "https://api.spoonacular.com/recipes/";

export const searchApiRecipeByQueryAsync = async (query, offset) => {
    // let urlQueryApi = new URL(`${apiUrl}complexSearch?query=${query}&${apiKey}`);
    return await fetch(`${apiUrl}complexSearch?query=${query}&${apiKey}&number=12&offset=${offset}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(async result => await result.json())
}

export const getRandomRecipesAsync = async () => {
    return await fetch(`${apiUrl}/random?${apiKey}&number=12`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(async result => await result.json())
}


export const getRecipeAsync = async (recipeId) => {
    return await fetch(`${apiUrl}${recipeId}/information?includeNutrition=false&${apiKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(async result => await result.json())
}

export const getRecipeInstructionsAsync = async (recipeId) => {
    return await fetch(`${apiUrl}${recipeId}/analyzedInstructions?${apiKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(async result => await result.json())
}


export const searchApiRecipeByCuisineAsync = async (quisine, offset) => {
    console.log(quisine)
    // let urlQueryApi = new URL(`${apiUrl}complexSearch?query=${query}&${apiKey}`);
    return await fetch(`${apiUrl}complexSearch?cuisine=${quisine}&${apiKey}&number=12&offset=${offset}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(async result => await result.json())
}