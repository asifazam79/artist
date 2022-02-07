<template>
    <div class="apiWrapper">
        <h2>Musical artists</h2>
        <p>Click on artist name to view more information</p>
        <div id="search-box">
            <label class="input-label" for="search-artist">Search/Filter artists (filter artists by name)</label>
            <input id="filter" aria-controls="artists-list-wrapper" class="input-box" name="search-artist" type="text" @keyup="filterItems($event.target.value);" v-model="search">
        </div>
        <ul class="artistList">
            <template v-if="filteredArtistsList.length !== 0">
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

export default {
    name: 'Artist List',
    created () {
        this.getArtist();
    },
    mounted () {
        this.getMoreArtists();
    },
    data () {
        return {
            initialArtistList: [],
            artistList: [],
            filteredArtistsList: [],
            search: ''
        };
    },
    methods: {
        async getArtist () {
            axios.get('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=182e05ac73d901d512e9e3839a94878c&format=json').then((response) => {
                this.artistList = response.data.results.artistmatches.artist;
                this.initialArtistList = Object.fromEntries(
                    Object.entries(this.artistList).slice(0, 5)
                );
                this.filteredArtistsList = this.initialArtistList;
            }).catch((error) => {
                console.log(error);
            });
        },
        async getMoreArtists () {
            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    axios.get('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=182e05ac73d901d512e9e3839a94878c&format=json').then((response) => {
                        this.artistList = response.data.results.artistmatches.artist;
                        this.artistList = Object.fromEntries(
                            Object.entries(this.artistList).slice(5, this.artistList.length)
                        );
                        this.filteredArtistsList = this.artistList;
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            };
        },
        filterItems (val) {
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
    #search-box {
        background-color: #DDD;
        padding: 15px;
        margin-bottom: 20px;
    }
    #search-box label {
        display: block;
        font-weight: bold;
        float: left;
        padding-bottom: 10px;
    }
    #search-box input {
        display: block;
        clear: both;
        padding: 10px;
    }
</style>
