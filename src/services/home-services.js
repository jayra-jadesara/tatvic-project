import axios from "axios";

export const getUserDataGoogle = async (accessToken) => {
    const { data } = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
};

export const getScordcardList = async (req) => {
    const data = await operationalData(req);
    return data;
};

const operationalData = async (req) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(
        '/api/v1/page/insertUserSearchDataWikipedia',
        {
            stext: req.wikiSearchTerms,
            email: localStorage.getItem('email'),
            operation: req.operation
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );
}
export const getWikipediaList = async (req) => {
    let url = "https://en.wikipedia.org/w/api.php";
    const params = {
        action: 'query',
        list: 'search',
        srsearch: req.wikiSearchTerms,
        format: 'json'
    };
    url = url + '?origin=*';
    Object.keys(params).forEach((key) => {
        url += "&" + key + "=" + params[key];
    });

    const response = await axios.get(url);
    const arr = [];
    if (response?.data?.query) {
        await operationalData({ wikiSearchTerms: req.wikiSearchTerms, operation: 'insert' });

        for (var key in response?.data?.query?.search) {
            const data = response?.data?.query?.search[key];
            arr.push({
                queryResultPageFullURL: 'no link',
                queryResultPageID: data?.pageid,
                queryResultPageTitle: data?.title,
                queryResultPageSnippet: data?.snippet
            });
        }

        for (var key2 in arr) {
            let page = arr[key2];
            let pageID = page?.queryResultPageID;
            if (pageID) {
                let urlForRetrievingPageURLByPageID = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;
                const resData = await axios.get(urlForRetrievingPageURLByPageID);
                page.queryResultPageFullURL = resData?.data?.query?.pages[pageID]?.fullurl;
            }
        }
    }
    return arr;
};