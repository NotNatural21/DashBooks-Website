<template>
    <!-- Edit Project -->
	<div class="form_container" v-if="ApplicationForm == `changeAutoSave`">
		<div class="form">
            <label for="time_interval">Choose a Time Interval:</label>
			<select id="time_interval">
				<option value="5">5 Minutes</option>
				<option value="10">10 Minutes</option>
				<option value="15">15 Minutes</option>
				<option value="30">30 Minutes</option>
				<option value="60">1 Hour</option>
				<option value="120">2 Hour</option>
			</select>

			<fieldset>
                <q-btn class="glossy" rounded color="primary" label="Save" @click="changeAutoSave"/>
                <q-btn class="glossy" rounded color="secondary" label="Cancel" @click="this.$emit('cancelled', '')"/>
			</fieldset>
		</div>
	</div>
</template>

<script>
import { settingsDict, userDict } from '../main.js';
import $ from 'jquery'
export default {
    name: 'ApplicationForms',
    emits: ["cancelled"],
    props: {
        ApplicationForm: String
    },
    methods: {
        changeAutoSave(){
            settingsDict['autoSaveTime'] = parseInt($(`#time_interval option:selected`).val())
            this.$emit('cancelled', '');
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
