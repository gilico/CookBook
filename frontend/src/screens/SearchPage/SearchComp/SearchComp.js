import React, {useRef} from 'react'

const SearchComp = ({isQuerySearch, searcApihHandler}) => {
    const inputRef = useRef("");
    return (
        <div>
            <form className='searchForm' onSubmit={e => searcApihHandler(e, inputRef.current.value)}>
                <label htmlFor="search_input">Search Recipe</label>
                <input ref={inputRef} id='search_input' type="text" autoFocus={isQuerySearch} />
            </form>
        </div>
    )
}

export default SearchComp