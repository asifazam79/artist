<template>
    <div class="grid-column-full">
        <h1>Live music</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac neque neque. Morbi consectetur tellus a vulputate dapibus. Sed faucibus turpis ipsum. Duis vel felis ut nulla venenatis interdum non eu ex. Proin eu purus eu ante venenatis gravida ac vitae ligula. Ut at nisl eu purus varius laoreet in nec sem.</p>
        <div class="banner">Banner placeholder</div>
        <artistList></artistList>
        <videoSection></videoSection>
    </div>
</template>

<script>
import artistList from '../../molecules/ArtistList';
import videoSection from '../../molecules/VideoSection';

export default {
    name: 'LiveMusic',
    components: {
        artistList,
        videoSection
    }
};
</script>

<style type="text/scss">
    .banner {
        background-color: #DDD;
        margin: 0 auto;
        font-size: 2em;
        font-weight: bold;
        text-align: center;
        padding: 80px 0;
    }
</style>
