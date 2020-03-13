import React, {useState} from 'react';

const SearchBar = (props) => {

    const [fetchLimit, setFetchLimit] = useState(0);

    function inputHandler(event){
        props.setKeyword(event.target.value);
        setFetchLimit(fetchLimit + 1);
    }

    function onFormSubmit(event){
        event.preventDefault();
        setFetchLimit(0);
        props.emptyImageArray();
        props.searchImages();
    }

    return (
        <div className="searchBlock">
            <h1>Search free photos from Unsplash</h1>
            <form onSubmit={onFormSubmit}>
                <input
                    className="keywordInput"
                    type="text"
                    name="photo"
                    autoComplete="off"
                    placeholder="Search photos by a keyword"
                    onChange={inputHandler}
                />
                <input className="submitBtn" type={"submit"} value={"Search"}/>
            </form>
        </div>
    )
}

export default SearchBar;