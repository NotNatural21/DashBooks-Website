<template>
    <!-- Create User -->
	<div class="form_container" v-if="invoiceForm == `createUser`">
		<div class="form">
			<label for="create_user">User:</label>
			<input id="create_user" type="text" />

			<label for="create_user_name">Name:</label>
			<input id="create_user_name" type="text" />

			<label for="create_user_addOne">Address line 1</label>
			<input id="create_user_addOne" type="text" />

			<label for="create_user_addTwo">Address line 2</label>
			<input id="create_user_addTwo" type="text" />

			<label for="create_user_city">City/State</label>
			<input id="create_user_city" type="text" />

			<label for="create_user_country">Country:</label>
			<input id="create_user_country" type="text" />

			<label for="create_user_contact">Contact</label>
			<input id="create_user_contact" type="text" />

			<fieldset>
				<q-btn class="glossy" rounded color="primary" label="Create User" @click="createUser"/>
                <q-btn class="glossy" rounded color="secondary" label="Cancel" @click="this.$emit('cancelled', '')"/>
			</fieldset>
		</div>
	</div>
	
	<!-- Edit User -->
	<div class="form_container" v-if="invoiceForm == `editUser`">
		<div class="form" id="editUserForm">
			<div id="edit_userID" userid="invalid"></div>
			<label for="edit_user">User:</label>
			<input id="edit_user" type="text" />

			<label for="edit_user_name">Name:</label>
			<input id="edit_user_name" type="text" />

			<label for="edit_user_addOne">Address line 1</label>
			<input id="edit_user_addOne" type="text" />

			<label for="edit_user_addTwo">Address line 2</label>
			<input id="edit_user_addTwo" type="text" />

			<label for="edit_user_city">City/State</label>
			<input id="edit_user_city" type="text" />

			<label for="edit_user_country">Country:</label>
			<input id="edit_user_country" type="text" />

			<label for="edit_user_contact">Contact</label>
			<input id="edit_user_contact" type="text" />

			<fieldset>
				<q-btn class="glossy" rounded color="primary" label="Save User" @click="editUser"/>
                <q-btn class="glossy" rounded color="red" label="Delete" @click="deleteUser"/>
                <q-btn class="glossy" rounded color="secondary" label="Cancel" @click="this.$emit('cancelled', '')"/>
			</fieldset>
		</div>
	</div>
	
	<!-- Create Client -->
	<div class="form_container" v-if="invoiceForm == `createClient`">
		<div class="form">
			<label for="create_client">Client:</label>
			<input id="create_client" type="text" />

			<label for="create_client_name">Name:</label>
			<input id="create_client_name" type="text" />

			<label for="create_client_addOne">Address line 1</label>
			<input id="create_client_addOne" type="text" />

			<label for="create_client_addTwo">Address line 2</label>
			<input id="create_client_addTwo" type="text" />

			<label for="create_client_city">City/State</label>
			<input id="create_client_city" type="text" />

			<label for="create_client_country">Country:</label>
			<input id="create_client_country" type="text" />

			<label for="create_client_contact">Contact</label>
			<input id="create_client_contact" type="text" />

			<fieldset>
				<q-btn class="glossy" rounded color="primary" label="Create Client" @click="createClient"/>
                <q-btn class="glossy" rounded color="secondary" label="Cancel" @click="this.$emit('cancelled', '')"/>
			</fieldset>
		</div>
	</div>
	
	<!-- Edit Client -->
	<div class="form_container" v-if="invoiceForm == `editClient`">
		<div class="form">
			<div id="edit_clientID" clientid="invalid"></div>
			<label for="edit_client">Client:</label>
			<input id="edit_client" type="text" />

			<label for="edit_client_name">Name:</label>
			<input id="edit_client_name" type="text" />

			<label for="edit_client_addOne">Address line 1</label>
			<input id="edit_client_addOne" type="text" />

			<label for="edit_client_addTwo">Address line 2</label>
			<input id="edit_client_addTwo" type="text" />

			<label for="edit_client_city">City/State</label>
			<input id="edit_client_city" type="text" />

			<label for="edit_client_country">Country:</label>
			<input id="edit_client_country" type="text" />

			<label for="edit_client_contact">Contact</label>
			<input id="edit_client_contact" type="text" />

			<fieldset>
				<q-btn class="glossy" rounded color="primary" label="Save Client" @click="editClient"/>
                <q-btn class="glossy" rounded color="red" label="Delete" @click="deleteClient"/>
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
    name: 'InvoiceForms',
    emits: ["cancelled"],
    props: {
        invoiceForm: String
    },
    methods: {
        createUser(){
            let user = $('#create_user').val();
			let name = $('#create_user_name').val();
			let addOne = $('#create_user_addOne').val();
			let addTwo = $('#create_user_addTwo').val();
			let city = $('#create_user_city').val();
			let country = $('#create_user_country').val();
			let contact = $('#create_user_contact').val();
			
			if(user == '' || user == null){ //If no user name was entered.
				$("#create_user").addClass('form_error');
				return false;
			}
			$("#create_user").removeClass('form_error');

			const userID = generateID(userDict);

			userDict['users'][userID] = {'user': user, 'name': name, 'addOne': addOne, 'addTwo': addTwo, 'city': city, 'country': country, 'contact': contact};
			
			this.$emit('cancelled', '');
        },
        editUser(){
            const userID = $(`#edit_userID`).attr('userid');
			let user = $('#edit_user').val();
			let name = $('#edit_user_name').val();
			let addOne = $('#edit_user_addOne').val();
			let addTwo = $('#edit_user_addTwo').val();
			let city = $('#edit_user_city').val();
			let country = $('#edit_user_country').val();
			let contact = $('#edit_user_contact').val();

			userDict['users'][userID] = {'user': user, 'name': name, 'addOne': addOne, 'addTwo': addTwo, 'city': city, 'country': country, 'contact': contact};
			this.$emit('cancelled', '');
        },
        deleteUser(){
            const userID = $(`#edit_userID`).attr('userid');
            let ref = this;
            confirm(`Are you sure you want to delete ${userDict['users'][userID]['user']}?`).then(function(outcome) {
                if(outcome){
                    delete userDict['users'][userID];
                }
                ref.$emit('cancelled', '');
            });
        },
        createClient(){
            let client = $('#create_client').val();
			let name = $('#create_client_name').val();
			let addOne = $('#create_client_addOne').val();
			let addTwo = $('#create_client_addTwo').val();
			let city = $('#create_client_city').val();
			let country = $('#create_client_country').val();
			let contact = $('#create_client_contact').val();

			if(client == '' || client == null){ //If no client name was entered.
				$("#create_client").addClass('form_error');
				return false;
			}
			$("#create_client").removeClass('form_error');

			const clientID = generateID(userDict);

			userDict['clients'][clientID] = {'client': client, 'name': name, 'addOne': addOne, 'addTwo': addTwo, 'city': city, 'country': country, 'contact': contact};
			
			this.$emit('cancelled', '');
        },
        editClient(){
            const clientID = $(`#edit_clientID`).attr('clientid');
			let client = $('#edit_client').val();
			let name = $('#edit_client_name').val();
			let addOne = $('#edit_client_addOne').val();
			let addTwo = $('#edit_client_addTwo').val();
			let city = $('#edit_client_city').val();
			let country = $('#edit_client_country').val();
			let contact = $('#edit_client_contact').val();

			userDict['clients'][clientID] = {'client': client, 'name': name, 'addOne': addOne, 'addTwo': addTwo, 'city': city, 'country': country, 'contact': contact};
			this.$emit('cancelled', '');
        },
        deleteClient(){
            const clientID = $(`#edit_clientID`).attr('clientid');
            let ref = this;
            confirm(`Are you sure you want to delete ${userDict['clients'][clientID]['client']}?`).then(function(outcome) {
                if(outcome){
                    delete userDict['clients'][clientID];
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
</style>
