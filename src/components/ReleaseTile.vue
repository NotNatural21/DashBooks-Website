<template>
	<div class="r_title">
        <h1>{{version}}</h1>
        <h2>Author: {{author}}</h2>
        <p>{{body}}</p>
    </div>
</template>

<script>
export default {
	name: 'ReleaseTile',
    props: {
        draft: {
            type: Boolean,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        version: {
            type: String,
            required: true
        },
        published: {
            type: String,
            required: true
        },
    }
}
</script>

<style scoped>
.r_title{
    width: 98%;
    border: 1px solid black;
    border-radius: 10px;
}

h1{
    font-size: 25px;
}
h2{
    font-size: 17px;
}
</style>
