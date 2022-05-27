<template>
    <!-- Create Project -->
	<div class="form_container" v-if="projectForm == `createProject`">
		<div class="form">
			<label for="create_project_name">Project name:</label>
			<input id="create_project_name" type="text" />

			<label for="create_project_duration">Project duration:</label>
			<input id="create_project_duration" type="number" />
			
			<label for="create_project_target">Target Hours Per TimeSheet:</label>
			<input id="create_project_target" type="number" />

			<label for="create_project_date">Project start date:</label>
			<input id="create_project_date" type="date" />

			<label for="time_interval">Choose a Time Interval:</label>
			<select id="time_interval">
				<option value="5">5 Minutes</option>
				<option value="10">10 Minutes</option>
				<option value="15">15 Minutes</option>
				<option value="30">30 Minutes</option>
				<option value="60">1 Hour</option>
			</select>
			
			<label for="week_interval">Choose a Timesheet length:</label>
			<select id="week_interval">
				<option value="1">1 Week</option>
				<option value="2">2 Weeks</option>
			</select>

            <label for="create_project_colour">Project Colour:</label>
			<input type="color" id="create_project_colour" name="head" value="#000000">

			<fieldset>
                <q-btn class="glossy" rounded color="primary" label="Create Project" @click="createProject"/>
                <q-btn class="glossy" rounded color="secondary" label="Cancel" @click="this.$emit('cancelled', '')"/>
			</fieldset>
		</div>
	</div>
	
	<!-- Edit Project -->
	<div class="form_container" v-if="projectForm == `editProject`">
		<div class="form">
			<div id="edit_projectID" projectid="invalid"></div>
			<label for="edit_project_name">Project name:</label>
			<input id="edit_project_name" type="text" />

			<label for="edit_project_duration">Project duration:</label>
			<input id="edit_project_duration" type="number" />
			
			<label for="edit_project_target">Target Hours Per TimeSheet:</label>
			<input id="edit_project_target" type="number" />

            <label for="edit_project_colour">Project Colour:</label>
			<input type="color" id="edit_project_colour" name="head" value="#000000">

            <label for="edit_project_archive">Archive?</label>
            <input id="edit_project_archive" type="checkbox"/>

			<fieldset>
                <q-btn class="glossy" rounded color="primary" label="Save Project" @click="editProject"/>
                <q-btn class="glossy" rounded color="red" label="Delete" @click="deleteProject"/>
                <q-btn class="glossy" rounded color="secondary" label="Cancel" @click="this.$emit('cancelled', '')"/>
			</fieldset>
		</div>
	</div>
    <!-- Create Colour -->
	<div class="form_container" v-if="projectForm == `createColour`">
		<div class="form">
			<label for="create_colour_name">Colour Name:</label>
			<input id="create_colour_name" type="text" />
			
			<label for="create_colour_rate">Colour Rate</label>
			<input id="create_colour_rate" type="number" step="0.01" />

			<label for="create_colour_colour">Colour:</label>
			<input type="color" id="create_colour_colour" name="head" value="#000000">

			<fieldset>
				<q-btn class="glossy" rounded color="primary" label="Create Colour" @click="createColour"/>
                <q-btn class="glossy" rounded color="secondary" label="Cancel" @click="this.$emit('cancelled', '')"/>
			</fieldset>
		</div>
	</div>
	
	<!-- Edit Colour -->
	<div class="form_container" v-if="projectForm == `editColour`">
		<div class="form">
			<div id="edit_colourID" colourid="invalid"></div>
			<label for="edit_colour_name">Colour Name:</label>
			<input id="edit_colour_name" type="text" />
			
			<label for="edit_colour_rate">Colour Rate:</label>
			<input id="edit_colour_rate" type="number" step="0.01" />

			<label for="edit_colour_colour">Colour:</label>
			<input type="color" id="edit_colour_colour" name="head" value="#000000">

			<fieldset>
				<q-btn class="glossy" rounded color="primary" label="Save Colour" @click="editColour"/>
                <q-btn class="glossy" rounded color="red" label="Delete" @click="deleteColour"/>
                <q-btn class="glossy" rounded color="secondary" label="Cancel" @click="this.$emit('cancelled', '')"/>
			</fieldset>
		</div>
	</div>
</template>

<script>
import { userDict } from '../main.js'
import { generateID, reDoDate, addToDate } from '../../public/generalFunctions.js';
import $ from 'jquery'
export default {
    name: 'ProjectForms',
    emits: ["cancelled"],
    props: {
        projectForm: String
    },
    methods: {
        createProject(){
            let name = $('#create_project_name').val();
			let duration = parseInt($('#create_project_duration').val());
			let target = parseInt($('#create_project_target').val());
			let date = reDoDate($('#create_project_date').val());
			let timeInterval = parseInt($(`#time_interval option:selected`).val())
			let weekInterval = parseInt($(`#week_interval option:selected`).val())
            let colour = $("#create_project_colour").val();

			if(name == '' || name == null){ //If no project name was entered.
				$("#create_project_name").addClass('form_error');
				return false;
			}
			if(isNaN(duration)){ //If no duration was provided
				$("#create_project_duration").addClass('form_error');
				$("#create_project_name").removeClass('form_error');
				return false;
			}
			if(date == 'NaN/NaN/NaN'){ //If no date was provided
				$("#create_project_date").addClass('form_error');
				$("#create_project_target").removeClass('form_error');
				return false;
			}
			$("#create_project_date").removeClass('form_error');
			$("#create_project_name").removeClass('form_error');
			$("#create_project_duration").removeClass('form_error');
			$("#create_project_target").removeClass('form_error');

			$('#create_project_name').val('');
			$('#create_project_duration').val('');
			$('#create_project_date').val('');

            isNaN(target) ? target = 0 : target;

			const projectID = generateID(userDict);
			
			let timeList = [];
			for(let h = 0; h < 24; h++){
				let hour = h;
				if(h < 10){
					hour = `0${h}`
				}
				for(let m = 0; m < 60; m += timeInterval){
					let minute = m;
					if(m < 10){
						minute = `0${m}`
					}
					timeList.push(`${hour}:${minute}`)
				}
			}
			let colourIds = Object.keys(userDict['colours'])

			userDict['projects'][projectID] = {'name': name, 'weeks': {}, 'timeList': timeList, 'duration': duration, 'weekInterval': weekInterval, 'timeInterval': timeInterval, 'targetHours': target, 'colour': [colour, this.shadeColor(colour, 85)]};
			
			if(weekInterval == 1){
				for(let w = 1; w <= duration; w++){
					userDict['projects'][projectID]['weeks'][`${w}`] = {'startDate': date, 'colouredCells': {}, 'invoiced': false, 'total': '0.00'};
					colourIds.forEach(colourID => {
						if(colourID != 'colourWhite'){
							userDict['projects'][projectID]['weeks'][`${w}`]['colouredCells'][colourID] = [];
						}
					});
					date = addToDate(date, 7);
				}
			}else if(weekInterval == 2){
				if(duration % 2 == 1){
					duration++;
					userDict['projects'][projectID]['duration'] = duration;
				}   
				for(let w = 1; w <= duration; w+= 2){
					userDict['projects'][projectID]['weeks'][`${w} - ${w + 1}`] = {'startDate': date, 'colouredCells': {}, 'invoiced': false, 'total': '0.00'};
					colourIds.forEach(colourID => {
						if(colourID != 'colourWhite'){
							userDict['projects'][projectID]['weeks'][`${w} - ${w + 1}`]['colouredCells'][colourID] = [];
						}
					});
					date = addToDate(date, 14);
				}
			}
            this.$emit('cancelled', '');
        },
        editProject(){
            const projectID = $(`#edit_projectID`).attr('projectid');
			const name = $('#edit_project_name').val();
			const target = parseInt($('#edit_project_target').val());
			let duration = parseInt($('#edit_project_duration').val());
            const colour = $("#edit_project_colour").val();

			if(name == '' || name == null){ //If no project name was entered.
				$("#edit_project_name").addClass('form_error');
				return false;
			}
			if(isNaN(duration)){ //If no duration was provided
				$("#edit_project_duration").addClass('form_error');
				$("#edit_project_name").removeClass('form_error');
				return false;
			}
			if(isNaN(target)){ //If no duration was provided
				$("#edit_project_target").addClass('form_error');
				$("#edit_project_duration").removeClass('form_error');
				return false;
			}

			$("#edit_project_name").removeClass('form_error');
			$("#edit_project_duration").removeClass('form_error');
			$("#edit_project_target").removeClass('form_error');

			$('#edit_project_name').val('');
			$('#edit_project_duration').val('');
			$('#edit_project_target').val('');

			let colourIds = Object.keys(userDict['colours'])
			let previousDur = userDict['projects'][projectID]['duration'];
			if(userDict['projects'][projectID]['duration'] < duration){
				if(userDict['projects'][projectID]['weekInterval'] == 1){
					let date = userDict['projects'][projectID]['weeks'][`${previousDur}`]['startDate'];
					for(let w = previousDur + 1; w <= duration; w++){
						date = addToDate(date, 14);
						userDict['projects'][projectID]['weeks'][`${w}`] = {'startDate': date, 'colouredCells': {}, 'invoiced': false, 'total': ''};
						colourIds.forEach(colourID => {
							if(colourID != 'colourWhite'){
									userDict['projects'][projectID]['weeks'][`${w}`]['colouredCells'][colourID] = [];
							}
						});
					}

					userDict['projects'][projectID]['duration'] = duration;

				}else if(userDict['projects'][projectID]['weekInterval'] == 2){
					let lastKey = `${previousDur - 1} - ${previousDur}`;
					let date = userDict['projects'][projectID]['weeks'][lastKey]['startDate'];
					for(let w = previousDur + 1; w <= duration; w+= 2){
						date = addToDate(date, 14);
						userDict['projects'][projectID]['weeks'][`${w} - ${w + 1}`] = {'startDate': date, 'colouredCells': {}, 'invoiced': false, 'total': ''};
						colourIds.forEach(colourID => {
							if(colourID != 'colourWhite'){
									userDict['projects'][projectID]['weeks'][`${w} - ${w + 1}`]['colouredCells'][colourID] = [];
							}
						});
					}
					if(duration % 2 == 1){
						userDict['projects'][projectID]['duration'] = duration + 1;
					}else{
						userDict['projects'][projectID]['duration'] = duration;
					}
				}
			}

			userDict['projects'][projectID]['name'] = name;
			userDict['projects'][projectID]['targetHours'] = target;
			userDict['projects'][projectID]['colour'] = [colour, this.shadeColor(colour, 85)];

            if($('#edit_project_archive')[0].checked){
                userDict['archive']['projects'][projectID] = {...userDict['projects'][projectID]}
                delete userDict['projects'][projectID]
            }
            this.$emit('cancelled', '');
        },
        deleteProject(){
            const projectID = $(`#edit_projectID`).attr('projectid');
            let ref = this;
            confirm(`Are you sure you want to delete ${userDict['projects'][projectID]['name']}?`).then(function(outcome) {
                if(outcome){
                    delete userDict['projects'][projectID];
                }
                ref.$emit('cancelled', '');
            });
        },
        createColour(){
            let colourName = $("#create_colour_name").val();
			let colourRate = (parseFloat($("#create_colour_rate").val())).toFixed(2);
			let colour = $("#create_colour_colour").val();

			const colourID = generateID(userDict);

			userDict['colours'][colourID] = {'name': colourName, 'rate': colourRate, 'colour': colour};
			for (let [projectID, projectDict] of Object.entries(userDict['projects'])) {
				let duration = projectDict.duration;
				if(projectDict.weekInterval == 1){
					for(let w = 1; w <= duration; w++){
						userDict['projects'][projectID]['weeks'][`${w}`]['colouredCells'][colourID] = [];
					}
				}
				else if(projectDict.weekInterval == 2){
					for(let w = 1; w <= duration; w+= 2){
						userDict['projects'][projectID]['weeks'][`${w} - ${w + 1}`]['colouredCells'][colourID] = [];
					}
				}
			}

			this.$emit('cancelled', '');
        },
        editColour(){
            const colourID = $(`#edit_colourID`).attr('colourid');
			let colourName = $("#edit_colour_name").val();
			let colourRate = (parseFloat($("#edit_colour_rate").val())).toFixed(2);
			let colour = $("#edit_colour_colour").val();

			userDict['colours'][colourID] = {'name': colourName, 'rate': colourRate, 'colour': colour};
			this.$emit('cancelled', '');
        },
        deleteColour(){
            const colourID = $(`#edit_colourID`).attr('colourid');
            let ref = this;
            confirm(`Are you sure you want to delete ${userDict['colours'][colourID]['name']}?`).then(function(outcome) {
                if(outcome){
                    delete userDict['colours'][colourID];
                    for(const[projectID, projectDict] of Object.entries(userDict['projects'])){
                        for(const [weekID, weekDict] of Object.entries(projectDict['weeks'])){
                            for(const [projColour, colouredCell] of Object.entries(weekDict['colouredCells'])){
                                if(projColour === colourID){
                                    colouredCell;
                                    delete userDict['projects'][projectID]['weeks'][weekID]['colouredCells'][colourID]
                                }
                            }
                        }
                    }
                }
                ref.$emit('cancelled', '');
            });
        },
        shadeColor(color, percent) {

            var R = parseInt(color.substring(1,3),16);
            var G = parseInt(color.substring(3,5),16);
            var B = parseInt(color.substring(5,7),16);

            R = parseInt(R * (100 + percent) / 100);
            G = parseInt(G * (100 + percent) / 100);
            B = parseInt(B * (100 + percent) / 100);

            R = (R<255)?R:255;  
            G = (G<255)?G:255;  
            B = (B<255)?B:255;  

            var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
            var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
            var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

            return "#"+RR+GG+BB;
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

#edit_project_archive{
    height: 30px;
}
</style>
