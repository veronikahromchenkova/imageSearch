import React, {useState, useEffect} from 'react';
import './App.scss';
import { getImages } from './components/functions'
import ImageList from './components/imageList';
import SearchBar from "./components/searchBar";
import Loader from 'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {

    const [keyword, setKeyword] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState("Image Search App");
    const [hasMore, setHasMore] = useState(true);
    const [fetchLimit, setFetchLimit] = useState(0);
    const [endMessage, setEndMessage] = useState('You have seen it all');
    const [noResultText, setNoResultText] = useState('');
    const maxFetchLimit = 2;


    useEffect(() => {
        document.title = title;
        setFetchLimit(0);
    },[title]);

    function searchImages(page=1, per_page=30) {
        setLoading(true);
        setFetchLimit(fetchLimit + 1);
        if(fetchLimit < maxFetchLimit){
            getImages(page, per_page, keyword)
                .then((response) => {
                    setLoading(false);
                    setTitle(keyword + " Pictures");
                    const newImages = [...images, ...response.results];
                    setImages(newImages);
                    if(response.total === 0){
                        setNoResultText('No Results');
                    } else{
                        setNoResultText('');
                    }
                })
        } else{
            setHasMore(false);
            setEndMessage('You have reached limit');
            setFetchLimit(0);
        }
    }

    const keywordInputHandler = (input) => {
        setKeyword(input);
    };

    const emptyImageArray = () => {
        images.length = 0;
        setHasMore(true);
    };

    let loader = (loading) ? <Loader className="loader" type="ThreeDots" color="#somecolor" height={80} width={80} /> : '';

    return (
        <div className="App">
            <SearchBar searchImages={searchImages} setKeyword={keywordInputHandler} emptyImageArray={emptyImageArray} />
            <InfiniteScroll
                className="infiniteScroll"
                next={() => {
                    searchImages(page+1,5);
                    setPage(page+1);
                }}
                hasMore={hasMore}
                loader={loader}
                dataLength={images.length}
                endMessage={
                    <p style={{textAlign: 'center', marginBottom: 40}}>
                        <b>{endMessage}</b>
                    </p>
                }
            >
                <ImageList foundImages={images} loading={loading} />
            </InfiniteScroll>
            {noResultText}
        </div>
    );
}

export default App;
