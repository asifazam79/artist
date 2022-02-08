<template>
    <div class="apiWrapper">
        <h2>Musical artists</h2>
        <p>Please search for your favourite artists and filter results for refined search. Click on artist name to view more information.</p>
        <div id="search-holder">
            <div id="search-box">
                <label class="input-label" for="search-artist">Search artists (search artists by name)</label>
                <input id="search" aria-controls="artists-list-wrapper" class="input-box" name="search-artist" type="text" v-model="search" @keyup="clearList();">
                <button class="searchButton" @click.prevent="searchList();">Search</button>
            </div>
            <div id="filter-box">
                <label class="input-label" for="search-artist">Filter artists (filter artists by name)</label>
                <input id="filter" aria-controls="artists-list-wrapper" class="input-box" name="filter-artist" type="text" @keyup="filterList($event.target.value);" v-model="filter">
            </div>
        </div>
        <ul id="artistUnorderedList">
            <template v-if="filteredArtistsList.length !== 0">
                <li id="tagLine">Showing {{ artistList.length }} results for "{{ search }}"</li>
                <li v-for="(artist, index) in filteredArtistsList" :key="index">
                    <a class="toggle" href="#" @click.prevent="toggleList($event.target)">
                        <h3 class="artist-name">{{ artist.name }}</h3>
                        <span class="pictureGallery">
                            <img :key="index" :src="artist.image[0]['#text']" alt="artistImage" title="artistImage" />
                        </span>
                    </a>
                    <div class="secondary-info">
                        <dl>
                            <dt>Listeners: </dt>
                            <dd>{{ artist.listeners }}</dd>

                            <dt>Streamable: </dt>
                            <dd>{{ artist.streamable }}</dd>

                            <dt>URL: </dt>
                            <dd><a :href="artist.url">{{ artist.url }}</a></dd>
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
            </template>
            <li id="no-matches" v-else>There are no artists that match your search</li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios';
import artist from '../../store/artist.js';

export default {
    name: 'ArtistList',
    mounted () {
        this.clearList();
    },
    data () {
        return {
            initialArtistList: [],
            artistList: [],
            filteredArtistsList: [],
            search: artist.state.searchArtist,
            filter: artist.state.filterItems,
            artistFurtherResults: 5
        };
    },
    computed: {
        searchArtist: {
            get () {
                artist.state.searchArtist = artist.state.searchArtist.charAt(0).toUpperCase() + artist.state.searchArtist.slice(1);
                return artist.state.searchArtist;
            },
            set (value) {
                artist.commit('setSearchArtist', { searchArtist: value });
            }
        },
        filterItems: {
            get () {
                artist.state.filterItems = artist.state.filterItems.charAt(0).toUpperCase() + artist.state.filterItems.slice(1);
                return artist.state.filterItems;
            },
            set (value) {
                artist.commit('setFilterItems', { filterItems: value });
            }
        }
    },
    methods: {
        async searchList () {
            if (this.search !== '' || this.search !== undefined) {
                document.getElementById('artistUnorderedList').style.display = 'block';
                axios.get('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + this.search + '&api_key=182e05ac73d901d512e9e3839a94878c&format=json').then((response) => {
                    this.initialArtistList = response.data.results.artistmatches.artist.slice(0, 5);
                    this.artistList = this.initialArtistList;
                    this.filteredArtistsList = this.artistList;
                }).catch((error) => {
                    console.log(error);
                });
                this.getMoreArtists();
            }
        },
        async getMoreArtists () {
            window.onscroll = () => {
                let bottomOfWindow = window.scrollY > (document.body.offsetHeight - window.outerHeight);
                if (bottomOfWindow) {
                    console.log(this.artistFurtherResults);
                    if (this.search !== '' || this.search !== undefined) {
                        axios.get('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + this.search + '&api_key=182e05ac73d901d512e9e3839a94878c&format=json').then((response) => {
                            if (this.artistFurtherResults <= response.data.results.artistmatches.artist.length) {
                                this.initialArtistList = response.data.results.artistmatches.artist.slice(this.artistFurtherResults, this.artistFurtherResults + 5);
                                this.artistList.push(...this.initialArtistList.map(obj => obj));
                                this.filteredArtistsList = this.artistList;
                                this.artistFurtherResults = this.artistFurtherResults + 5;
                            }
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                }
            };
        },
        filterList (val) {
            if (this.artistList.length !== 0) {
                this.filteredArtistsList = (
                    this.artistList.filter(
                        item => item.name.toLowerCase().indexOf(val.toLowerCase()) > -1
                    )
                );
                return this.filteredArtistsList;
            }
        },
        toggleList (el) {
            this.closeAllInfoBoxes();
            el.parentElement.nextSibling.style.display = 'block';
            return false;
        },
        closeAllInfoBoxes () {
            const secondaryInfo = document.querySelectorAll('.secondary-info');
            secondaryInfo.forEach(function (indEl) {
                indEl.style.display = 'none';
            });
        },
        clearList () {
            this.artistFurtherResults = 5;
            if (this.search === '') {
                document.getElementById('artistUnorderedList').style.display = 'none';
            }
        }
    }
};
</script>

<style type="text/scss">
    .apiWrapper,
    .videoWrapper {
        padding: 20px 0;
        float: left;
        width: 100%;
    }
    .secondary-info {
        display: none;
    }
    h3.artist-name {
        float: left;
        margin-right: 5px;
        margin-bottom: 0;
    }
    #artistUnorderedList {
        padding: 0;
    }
    #artistUnorderedList > li {
        list-style-type: none;
        border-bottom: 1px solid #666;
        float: left;
        width: 100%;
    }
    #artistUnorderedList > li#no-matches {
        font-weight: bold;
        border: 0;
    }
    #artistUnorderedList dl dt {
        float: left;
        font-weight: bold;
        padding-right: 5px;
    }
    #artistUnorderedList dl dd {
        clear: right;
        margin-left: 0;
    }
    #artistUnorderedList .merch {
        padding: 10px 0;
        width: 100%;
        float: left;
    }
    #artistUnorderedList .merch li {
        border: 0;
        background-color: #DDD;
        float: left;
        list-style-type: none;
        padding: 5px 10px;
        margin-right: 20px;
    }
    #search-holder {
        background-color: #DDD;
        padding: 15px;
        margin-bottom: 20px;
        float: left;
        width: 100%;
    }
    #search-holder label {
        display: block;
        font-weight: bold;
        float: left;
        padding-bottom: 10px;
    }
    #search-holder input {
        display: block;
        clear: both;
        padding: 10px;
        float: left;
    }
    #search-box {
        float: left;
        width: 50%;
    }
    #search-box button {
        float: left;
        margin: 0 0 0 10px;
        font-weight: bold;
        padding: 10px;
        background-color: #005eb8;
        border: 1px solid #FFF;
        color: #FFF;
    }
    #filter-box {
        float: right;
        width: 50%;
    }
    #tagLine {
        font-weight: bold;
    }
</style>
