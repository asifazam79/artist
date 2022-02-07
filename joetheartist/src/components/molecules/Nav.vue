<template>
    <ul class="nav">
        <li class="first"><a href="/">Home</a></li>
        <li><a href="/#/about-us">About us</a></li>
        <li><a href="/#/our-services">Our Services</a></li>
        <li class="last"><a href="/#/contact-us">Contact us</a></li>
    </ul>
</template>

<script>
export default {
    name: 'Nav'
};
</script>

<style type="text/scss">
    .nav {
        font-size: 0.9em;
    }
    .nav li {
        list-style-type: none;
        float: left;
    }
    .nav li a {
        text-decoration: none;
        margin: 5px 0;
        padding: 0 10px;
        border-right: 1px solid #666;
    }
    .nav li.first a {
        padding-left: 0;
    }
    .nav li.last a {
        border: 0;
    }
    .nav li a:hover {
        text-decoration: underline;
    }
</style>
