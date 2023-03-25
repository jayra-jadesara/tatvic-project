import React, { useMemo, useState } from 'react';
import { getScordcardList } from "../../services/home-services";
import '../../App.css';
import dateFormat from "dateformat";

const ScoreCard = () => {
    const [wikiSearchReturnValues, setWikiSearchReturnValues] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const wikiSearchResults = useMemo(() => {
        let wikiSearchResults = [];

        for (const key3 in wikiSearchReturnValues) {
            wikiSearchResults.push(
                <tr className="searchResultDiv" key={key3}>
                    <td>
                        <span>{wikiSearchReturnValues[key3].stext}</span>
                    </td>
                    <td>
                        <span>{dateFormat(wikiSearchReturnValues[key3].create_date, "dd mmm yyyy, hh:MM:ss TT", true)}</span>
                    </td>
                </tr>
            );
        }
        return wikiSearchResults;
    }, [wikiSearchReturnValues]);

    const get7daysData = async () => {
        setWikiSearchReturnValues([]);
        setLoading(true);
        const resArr = await getScordcardList({ wikiSearchTerms: '', operation: 'last7days' });
        setWikiSearchReturnValues(resArr?.data?.data);
        setLoading(false);
    }
    const get1daysData = async () => {
        setWikiSearchReturnValues([]);
        setLoading(true);
        const resArr = await getScordcardList({ wikiSearchTerms: '', operation: 'last1days' });
        setWikiSearchReturnValues(resArr?.data?.data);
        setLoading(false);
    }
    const get1hourData = async () => {
        setWikiSearchReturnValues([]);
        setLoading(true);
        const resArr = await getScordcardList({ wikiSearchTerms: '', operation: 'last1hour' });
        setWikiSearchReturnValues(resArr?.data?.data);
        setLoading(false);
    }

    return (
        <>
            <h1>Score Card</h1>
            <button className='btn btn-sm btn-warning me-2' type='submit' onClick={get7daysData}>Last 7 Days</button>
            <button className='btn btn-sm btn-warning me-2' type='submit' onClick={get1daysData}>Last 1 Days</button>
            <button className='btn btn-sm btn-warning' type='submit' onClick={get1hourData}>Last 1 Hours</button>
            {isLoading ?
                <div>{"Loading..."}</div>
                : <>
                    {wikiSearchResults?.length > 0 &&
                        <div className='d-block'>
                            Total Search Results {wikiSearchResults.length}
                        </div>
                    }
                    <table className='table table-striped table-bordered w-50 mt-3' style={{
                        left: 0,
                        right: 0,
                        margin: 'auto'
                    }}>
                        <tbody>
                            {wikiSearchResults}
                        </tbody>
                    </table>
                </>
            }
        </>
    );
}

export default ScoreCard;