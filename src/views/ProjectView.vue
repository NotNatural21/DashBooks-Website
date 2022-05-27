<template>
    <h4>TimeSheets:</h4>
    <p>You have logged {{ userObj['timeLogged'][today]['hours'].toFixed(2) }}H and earnt ${{ userObj['timeLogged'][today]['pay'] }} today</p>
    <div class="pageHome">
        <div class="item_container">
            <div class="items">
                <div v-for="(projectDict, projectID) in userObj['projects']" :key="projectDict" class="list_item" :data="projectID" @click="$router.push({ name: 'timesheet', params: { 'projectID': projectID } })" :style="{background: `radial-gradient(circle, ${projectDict['colour'][1]} 0%, ${projectDict['colour'][0]} 30%)`, color: `${pickTextColorBasedOnBgColor(projectDict['colour'][1])}`}">
                    <div>
                        <p>{{ projectDict.name }}</p>
                        <p style="font-size: small;">Duration: {{ projectDict.duration }} Weeks</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { userDict } from '../main.js'
export default {
    name: 'projectView',
    components: {

    },
    data(){
        return{
            userObj: userDict,
            today: ''
        }
    },
    beforeMount(){
        let date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = date.getFullYear();
        this.today = mm + '/' + dd + '/' + yyyy;
        if(!(this.today in userDict['timeLogged'])){
            userDict['timeLogged'] = {}
            userDict['timeLogged'][this.today] = {'hours': 0, 'pay': 0};
        }
    },
    methods: {
        pickTextColorBasedOnBgColor(bgColor) {
            let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
            let r = parseInt(color.substring(0, 2), 16); // hexToR
            let g = parseInt(color.substring(2, 4), 16); // hexToG
            let b = parseInt(color.substring(4, 6), 16); // hexToB
            let uicolors = [r / 255, g / 255, b / 255];
            let c = uicolors.map((col) => {
                if (col <= 0.03928) {
                return col / 12.92;
                }
                return Math.pow((col + 0.055) / 1.055, 2.4);
            });
            let L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
            return (L > 0.179) ? '#000000' : '#ffffff';
        },
    }
}
</script>

<style scoped>
.item_container{
    width: 100%;
    height: calc(100vh - var(--navbar_height) - 150px - 18px);
    overflow-y: auto;
}
.items{
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
    align-items: center;
    gap: 3px;
    flex-wrap: wrap;
    gap: 15px;
    width: 100%;
}
.list_item{
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 110px;
    padding: 0 20px;
    color: white;
    cursor: pointer;
    font-family: Lato;
    font-weight: 900;
    font-size: 1.6em;
    border-radius: 5px;
    gap: 10px;
}
.list_item:hover {
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.082), 0 10px 10px rgba(0, 0, 0, 0.11);
}
</style>
