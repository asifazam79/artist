## All Below points are covered
## 1. A promotional banner advertising a new single - {{ Placeholder available }}
## 2. A “Music” section (not required to have working audio playback). Can display anything music-related using either of the following APIs (feel free to query any UMG artist) - {{ http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=182e05ac73d901d512e9e3839a94878c&format=json api call made and data presented }}
## 3. A “Merch” section showcasing 1-4 products (can use dummy/static data) {{ 4 Merch Placeholders added with every artist}}
## 4. A “Video” section that displays the Youtube videos {{ A video of lady gaga song embedded }}
## 5. Include an option to filter the product for one of the sections {{ Search/Filter functionality added with filter by artist name working }}.
## 6. Include pagination or infinite scroll in one of the sections. {{ Infinite scroll implemented with initial 5 results of artists showing first and on page scroll, showing the rest }}
## 7. Please include one visualization/graph using any of the API’s previously mentioned {{ I am attaching the code I tried in Postman that didn't work as expected. Including it to let you know I have made an effort }}
## 8. Code should be reviewable in GitHub {{ Sending the link to the GitHub repo }}.

## Note: I built the whole exercise in Vue.js. It is another variant of SPA like react. Project setup is done from scratch and I have added necessary areas like VueRouter and Vuex configuration although the state management was not required for this exercise. It is just for understanding the complete project if we want to build a complete website and not just a single web page. I have created some pages with dummy data for understanding. Hope it is not a problem. For obvious reasons. I have removed node_modules so npm install is required.

## Data I tried in Postman to get Visualization/Graph is below

let template = `
    <style = "text/css">
    .apiWrapper,
    .videoWrapper {
        padding: 20px 0;
        float: left;
        width: 100%;
    }
    h3.artist-name {
        float: left;
        margin-right: 5px;
        margin-bottom: 0;
    }
    .artistList {
        padding: 0;
    }
    .artistList > li {
        list-style-type: none;
        border-bottom: 1px solid #666;
        float: left;
        width: 100%;
    }
    .artistList > li#no-matches {
        font-weight: bold;
        border: 0;
    }
    .artistList dl dt {
        float: left;
        font-weight: bold;
        padding-right: 5px;
    }
    .artistList dl dd {
        clear: right;
        margin-left: 0;
    }
    .artistList .merch {
        padding: 10px 0;
        width: 100%;
        float: left;
    }
    .artistList .merch li {
        border: 0;
        background-color: #DDD;
        float: left;
        list-style-type: none;
        padding: 5px 10px;
        margin-right: 20px;
    }
    </style>

    <div class="apiWrapper">
        <h2>Musical artists</h2>
        <p>Click on artist name to view more information</p>
        <ul class="artistList">
            {{#each response.data.results.artistmatches.artist}}
                <li>
                    <a class="toggle" href="#">
                        <h3 class="artist-name">{{ name }}</h3>
                        <span class="pictureGallery">
                            <img src="" alt="artistImage" title="artistImage" />
                        </span>
                    </a>
                    <div class="secondary-info">
                        <dl>
                            <dt>Listeners: </dt>
                            <dd>{{ listeners }}</dd>

                            <dt>Streamable: </dt>
                            <dd>{{ streamable }}</dd>

                            <dt>URL: </dt>
                            <dd><a href="">{{ url }}</a></dd>
                        </dl>
                        <h3>Merch</h3>
                        <ul class="merch">
                            <li>Merch Placeholder 1</li>
                            <li>Merch Placeholder 2</li>
                            <li>Merch Placeholder 3</li>
                            <li>Merch Placeholder 4</li>
                        </ul>
                    </div>
                </li>
            {{/each}}
        </ul>
    </div>
`;

pm.visualizer.set(template, {response: pm.response.json()});
 
