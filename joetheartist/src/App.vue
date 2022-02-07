<template>
    <div class="wrapper">
        <Header></Header>
        <div id="inner-wrapper" class="width-container">
            <Nav></Nav>
            <main class="main-wrapper " id="maincontent" role="main">
                <router-view></router-view>
            </main>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './components/molecules/Header.vue';
import Footer from './components/molecules/Footer.vue';

export default {
    name: 'App',
    components: {
        Header,
        Footer
    }
};
</script>

<style type="text/scss">
    @import './scss/master.scss';

    .wrapper {
        overflow: hidden;
    }
    #inner-wrapper {
        clear: both;
    }
</style>
