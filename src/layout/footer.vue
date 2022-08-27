<template>
    <footer class="main-footer" style="font-size:0.7rem">
        <strong>
            <span>Copyright &copy; 2022 </span>
            Go Together
            <span>.</span>
        </strong>
        <span> All rights reserved.</span>
        <div class="float-right d-none d-sm-inline-block">
            <b>Version </b>
            <span>{{version}}</span>
        </div>
    </footer>
</template>

<script>
    import {version} from '../../package.json';

    export default {
        name: "profile",
        data() {
            return {
                version : version
            };
        }
    };
</script>
