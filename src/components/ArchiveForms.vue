<template>
    <!-- Edit Project -->
	<div class="form_container" v-if="archiveForm == `editArchive`">
		<div class="form">
            <div id="edit_projectID_archive" projectid="invalid"></div>
            <label for="project_archive">Archive?</label>
            <input id="project_archive" type="checkbox" checked/>

			<fieldset>
                <q-btn class="glossy" rounded color="primary" label="Save" @click="editArchive"/>
                <q-btn class="glossy" rounded color="red" label="Delete" @click="deleteArchive"/>
                <q-btn class="glossy" rounded color="secondary" label="Cancel" @click="this.$emit('cancelled', '')"/>
			</fieldset>
		</div>
	</div>
</template>

<script>
import { userDict } from '../main.js'
import $ from 'jquery'
export default {
    name: 'ArchiveForms',
    emits: ["cancelled"],
    props: {
        archiveForm: String
    },
    methods: {
        editArchive(){
            const projectID = $(`#edit_projectID_archive`).attr('projectid');
            if(!($('#project_archive')[0].checked)){
                userDict['projects'][projectID] = {...userDict['archive']['projects'][projectID]}
                delete userDict['archive']['projects'][projectID]
            }
            this.$emit('cancelled', '');
        },
        deleteArchive(){
            const projectID = $(`#edit_projectID_archive`).attr('projectid');
            let ref = this;
            confirm(`Are you sure you want to delete ${userDict['archive']['projects'][projectID]['name']}?`).then(function(outcome) {
                if(outcome){
                    delete userDict['archive']['projects'][projectID];
                }
                ref.$emit('cancelled', '');
            });
        }
    }
}
</script>

<style scoped lang="scss">
input {
	width: 200px;
	padding: 2px;
	font-family: 'Segoe UI', sans-serif;
	font-size: 15px;
	background-color: transparent;
	border: 1px solid black;
	border-bottom: 3px solid black;
	border-radius: 5px;
	outline: unset;
	transition: 0.2s ease border;
}

.form_error {
	border-color: red !important;
}

.form_container {
	position: absolute;
	z-index: 1000;
	inset: 0px;
	opacity: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Segoe UI', sans-serif;
	transition: 0.2s ease all;
    backdrop-filter: blur(15px);
}

.form{
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	padding: 20px;
	background-color: white;
    border: 1px solid $accent;
	border-radius: 5px;
	transition: 0.3s ease all;
}

.form fieldset{
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin-top: 20px;
	border: unset;
}

select{
	margin: 10px 0px;
	border-radius: 10px;
	padding: 5px;
	width: 110px;
	outline: none;
}

fieldset > .button_link:nth-last-child(1){
	background-color:#bb1818;
}

#project_archive{
    height: 30px;
}
</style>
