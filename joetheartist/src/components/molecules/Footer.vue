<template>
    <div id="footer" class="grid-column-full">
        <div class="width-container">
            <Nav></Nav>
            <span class="copy">&copy; Copyright Live Music 2022</span>
        </div>
    </div>
</template>

<script>
import Nav from './Nav.vue';

export default {
    name: 'Footer',
    components: {
        Nav
    }
};
</script>

<style type="text/scss">
    #footer {
        background-color: #000;
        color: #FFF;
    }
    #footer .nav {
        float: left;
        margin: 0;
        padding: 0;
    }
    #footer a {
        color: #FFF;
    }
    span.copy {
        float: right;
    }
</style>
