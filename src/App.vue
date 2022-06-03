<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
    <div id="nav" @click="$event.stopPropagation()">
        <div class="menuImg">
            <img :src="ArrowMenu" id="arrowMenuImg" @click="toggleMenu" class="rotate">
        </div>
        <RouterLink to="/" @click="closeMenu" ><img :src="HomeIcon"/>DashBoard</RouterLink>
        <RouterLink to="/projects" @click="closeMenu" ><img :src="Work"/>TimeSheets</RouterLink>
        <RouterLink to="/invoice" @click="closeMenu" ><img :src="Invoice"/>Invoice</RouterLink>
        <a @click="closeMenu, $refs.file.click()" ><img :src="Upload"/>Load Save</a>
        <input type="file" ref="file" style="display: none" accept=".ssdb" @change="readFile()">
        
    </div>
    <RouterView />
</template>

<script>
import ArrowMenu from './components/Icons/ArrowMenu.svg'
import HomeIcon from './components/Icons/HomeIcon.svg'
import Work from './components/Icons/Work.svg'
import Invoice from './components/Icons/Invoice.svg'
import Upload from './components/Icons/Upload.svg'
import { userDict, saveChecker } from './main.js';
import $ from 'jquery';
export default {
    name: 'App',
    components: {
    },
    data() {
        return {
            file: null,
            contents: null,
            fileLoaded: false
		}
    },
    mounted(){
        window.addEventListener('click', function() {
            this.closeMenu()
        }.bind(this))
    },
    methods: {
        toggleMenu(){
            $('#arrowMenuImg').toggleClass('rotate')
            $('#nav').toggleClass('clicked');
        },
        closeMenu(){
            if($('#nav').hasClass('clicked')){
                this.toggleMenu();
            }
        },
        readFile() {
            this.file = this.$refs.file.files[0];
            const fr = new FileReader();
            fr.onload = e => {
                const data = JSON.parse(e.target.result);
                console.log(data)
                const result = saveChecker(data);
                for(const[key, entry] of Object.entries(result)){
                    userDict[key] = entry;
                }
                this.contents = result;
                console.log(this.contents)
                console.log(userDict)
            }
            fr.readAsText(this.file);
        }
    }
}
</script>


<style>
@import url('../public/root.css');
@import '@/assets/base.css';
@import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');
#app{
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: white;
}

#nav{
    width : 60px;
    min-width : 60px;
    height: 100vh;
    background-color: var(--color-primary);
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 1000;
    top: 0px;
    left: 0px;
    bottom: 0px;
    transition: min-width 1s;
    gap: 25px;
    padding-left: 6px;
    padding-right: 6px;
    overflow-x: hidden;
}

#nav.clicked{
    min-width: 225px;
    align-items: unset;
}

#nav > a{
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 10px;
    color: white;
    text-decoration: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
}

#nav > a:hover{
    background-color: var(--color-primary-highlight);
}

#arrowMenuImg{
    width: 52px;
    height: 52px;
    cursor: pointer;
}

.menuImg{
    display: flex;
    justify-content: flex-end;
}

.rotate{
    transform: rotate(180deg);
}

.pageHome{
	width: calc(100% - 60px);
    height: 100vh;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    color: black;
    margin-left: auto;
    padding: 10px;
    flex-direction: column;
    align-items: center;
}

p{
    margin: 0px !important;
}
h4{
    margin: 0px;
    display: flex;
    justify-content: center;
}
.active_button{
    border: 3px solid black;
}
</style>
