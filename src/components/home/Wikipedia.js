import React, { useMemo, useState } from 'react';
import { getWikipediaList } from "../../services/home-services";
import '../../App.css';

const Wikipedia = () => {
    const [wikiSearchReturnValues, setWikiSearchReturnValues] = useState([]);
    const [wikiSearchTerms, setWikiSearchTerms] = useState('');
    const [isLoading, setLoading] = useState(false);

    const useWikiSearchEngine = async (e) => {
        e.preventDefault();
        setWikiSearchReturnValues([]);
        setLoading(true);

        const resArr = await getWikipediaList({ wikiSearchTerms });
        setWikiSearchReturnValues(resArr);
        setLoading(false);
    }

    const changeWikiSearchTerms = (e) => {
        e.preventDefault();
        setWikiSearchTerms(e.target.value);
    }

    const wikiSearchResults = useMemo(() => {
        let wikiSearchResults = [];
        for (const key3 in wikiSearchReturnValues) {
            wikiSearchResults.push(
                <div className="searchResultDiv" key={key3}>
                    <h3>
                        <a Target={'_blank'} href={wikiSearchReturnValues[key3].queryResultPageFullURL}>{wikiSearchReturnValues[key3].queryResultPageTitle}</a>
                    </h3>
                    <span className='link'><a Target={'_blank'} href={wikiSearchReturnValues[key3].queryResultPageFullURL}>{wikiSearchReturnValues[key3].queryResultPageFullURL}</a></span>
                    <p className="description" dangerouslySetInnerHTML={{ __html: wikiSearchReturnValues[key3].queryResultPageSnippet }}></p>
                </div>
            );
        }
        return wikiSearchResults;
    }, [wikiSearchReturnValues]);

    return (
        <>
            <h1>Wikipedia Search Engine</h1>
            <form action="">
                <input type="text" value={wikiSearchTerms || ''} onChange={changeWikiSearchTerms} placeholder='Search Wikipedia Articles' />
                <button className='btn btn-sm btn-warning' type='submit' onClick={useWikiSearchEngine}>Search</button>
            </form>
            {isLoading ? <div>{"Loading..."}</div> : wikiSearchResults}
        </>
    );
}

export default Wikipedia;