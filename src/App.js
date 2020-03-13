import React, {useState, useEffect} from 'react';
import './App.scss';
import axios from 'axios';
import ImageList from './components/imageList';
import SearchBar from "./components/searchBar";
import Loader from 'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {

    const [clientId] = useState("45ENxImi0H7rjXGOdnzQthNGD7ES3Jf9KaFzHTRvA0o");
    const [keyword, setKeyword] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState("Image Search app");
    const [hasMore, setHasMore] = useState(true);
    const [fetchLimit, setFetchLimit] = useState(0);
    const [endMessage, setEndMessage] = useState('You have seen it all');

    useEffect(() => {
        document.title = title;
    },[title]);

    async function searchImages(page= 1, per_page= 30){
        setLoading(true);
        setFetchLimit(fetchLimit + 1);
        console.log(fetchLimit);
        if(fetchLimit < 2) {
            const url = "https://api.unsplash.com/search/photos";
            await axios.get(url, {
                params: {
                    query: keyword,
                    page: page,
                    per_page: per_page
                },
                headers: {
                    Authorization: 'Client-ID ' + clientId
                }
            })
                .then(response => {
                    setLoading(false);
                    setTitle(keyword + " Pictures");
                    const newImages = [...images, ...response.data.results];
                    setImages(newImages);
                })
                .catch(err => {
                    setHasMore(false);
                    console.log(err);
                });
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

    let loader = (loading) ? <Loader type="ThreeDots" color="#somecolor" height={80} width={80} /> : '';

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

        </div>
    );
}

export default App;
