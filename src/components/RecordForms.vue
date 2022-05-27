<template>
    <!-- Create Category -->
	<div class="form_container" v-if="recordForm == `createCategory`">
		<div class="form">
			<label for="create_category">Category:</label>
			<input id="create_category" type="text" />

            <label for="create_category_status">Include Category in Pivot Table:</label>
            <input id="create_category_status" type="checkbox" checked/>

			<fieldset>
				<q-btn class="glossy" rounded color="primary" label="Create Category" @click="createCategory"/>
                <q-btn class="glossy" rounded color="secondary" label="Cancel" @click="this.$emit('cancelled', '')"/>
			</fieldset>
		</div>
	</div>

	<!-- Edit Category -->
	<div class="form_container" v-if="recordForm == `editCategory`">
		<div class="form">
			<div id="edit_category_old" oldcategory='invalid' style="display:none;"></div>
			<label for="edit_category">Category:</label>
			<input id="edit_category" type="text" />

            <label for="edit_category_status">Include Category in Pivot Table:</label>
            <input id="edit_category_status" type="checkbox" checked/>

			<fieldset>
				<q-btn class="glossy" rounded color="primary" label="Save Category" @click="editCategory"/>
                <q-btn class="glossy" rounded color="red" label="Delete" @click="deleteCategory"/>
                <q-btn class="glossy" rounded color="secondary" label="Cancel" @click="this.$emit('cancelled', '')"/>
			</fieldset>
		</div>
	</div>
	

	<!-- Create Accounts -->
	<div class="form_container" v-if="recordForm == `createAccount`">
		<div class="form">
			<label for="create_account">Account:</label>
			<input id="create_account" type="text" />

			<fieldset>
				<q-btn class="glossy" rounded color="primary" label="Create Account" @click="createAccount"/>
                <q-btn class="glossy" rounded color="secondary" label="Cancel" @click="this.$emit('cancelled', '')"/>
			</fieldset>
		</div>
	</div>

	<!-- Edit Accounts -->
	<div class="form_container" v-if="recordForm == `editAccount`">
		<div class="form">
			<div id="edit_account_old" oldaccount='invalid'></div>
			<label for="edit_account">Account:</label>
			<input id="edit_account" type="text" />

			<fieldset>
				<q-btn class="glossy" rounded color="primary" label="Save Account" @click="editAccount"/>
                <q-btn class="glossy" rounded color="red" label="Delete" @click="deleteAccount"/>
                <q-btn class="glossy" rounded color="secondary" label="Cancel" @click="this.$emit('cancelled', '')"/>
			</fieldset>
		</div>
	</div>
	
	<!-- Create Payee -->
	<div class="form_container" v-if="recordForm == `createPayee`">
		<div class="form">
			<label for="create_payee">Payee:</label>
			<input id="create_payee" type="text" />

			<fieldset>
				<q-btn class="glossy" rounded color="primary" label="Create Payee" @click="createPayee"/>
                <q-btn class="glossy" rounded color="secondary" label="Cancel" @click="this.$emit('cancelled', '')"/>
			</fieldset>
		</div>
	</div>

	<!-- Edit Payee-->
	<div class="form_container" v-if="recordForm == `editPayee`">
		<div class="form">
			<div id="edit_payee_old" oldpayee='invalid'></div>
			<label for="edit_payee">Payee:</label>
			<input id="edit_payee" type="text" />

			<fieldset>
				<q-btn class="glossy" rounded color="primary" label="Save Payee" @click="editPayee"/>
                <q-btn class="glossy" rounded color="red" label="Delete" @click="deletePayee"/>
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
    name: 'RecordForms',
    emits: ["cancelled"],
    props: {
        recordForm: String
    },
    methods: {
        createCategory(){
            let category = $(`#create_category`).val()
			if(category == ''){ //If no category was provided
				$("#create_category").addClass('form_error');
				return false;
			}
			$("#create_category").removeClass('form_error');
			userDict['records']['categories'][category] = $('#create_category_status')[0].checked
			
			this.$emit('cancelled', '');
        },
        editCategory(){
            let category =  $(`#edit_category_old`).attr(`oldcategory`);
            delete userDict['records']['categories'][category];

			let newCategory = $(`#edit_category`).val();
			if(newCategory == ''){ //If no category was provided
				$("#create_category").addClass('form_error');
				return false;
			}
			$("#create_category").removeClass('form_error');
			userDict['records']['categories'][newCategory] = $('#edit_category_status')[0].checked
 
			this.$emit('cancelled', '');
        },
        deleteCategory(){
            let category =  $(`#edit_category_old`).attr(`oldcategory`);
            let ref = this;
            confirm(`Are you sure you want to delete ${category}?`).then(function(outcome) {
                if(outcome){
                    delete userDict['records']['categories'][category];
                }
                ref.$emit('cancelled', '');
            });
        },
        createPayee(){
            let payee = $(`#create_payee`).val()
			if(payee == ''){ //If no category was provided
				$("#create_payee").addClass('form_error');
				return false;
			}
			$("#create_payee").removeClass('form_error');
			userDict['records']['payee'].push(payee)
			
			this.$emit('cancelled', '');
        },
        editPayee(){
            let oldPayee =  $(`#edit_payee_old`).attr(`oldpayee`);
			const index = userDict['records']['payee'].indexOf(oldPayee);
			if (index > -1) {
				userDict['records']['payee'].splice(index, 1);
			}

			let payee = $(`#edit_payee`).val()
			if(payee == ''){ //If no category was provided
				$("#edit_payee").addClass('form_error');
				return false;
			}
			$("#edit_payee").removeClass('form_error');
			userDict['records']['payee'].push(payee);
 
			this.$emit('cancelled', '');
        },
        deletePayee(){
            let account =  $(`#edit_payee_old`).attr(`oldpayee`);
            let ref = this;
            confirm(`Are you sure you want to delete ${account}?`).then(function(outcome) {
                if(outcome){
                    const index = userDict['records']['payee'].indexOf(account);
                    if (index > -1) {
                        userDict['records']['payee'].splice(index, 1);
                    }
                }
                ref.$emit('cancelled', '');
            });
        },
        createAccount(){
            let account = $(`#create_account`).val()
			if(account == ''){ //If no category was provided
				$("#create_account").addClass('form_error');
				return false;
			}
			$("#create_account").removeClass('form_error');
			userDict['records']['accounts'].push(account);
			
			this.$emit('cancelled', '');
        },
        editAccount(){
            let account =  $(`#edit_account_old`).attr(`oldaccount`);
			const index = userDict['records']['accounts'].indexOf(account);
			if (index > -1) {
				userDict['records']['accounts'].splice(index, 1);
			}
			let newAccount = $(`#edit_account`).val()
			if(newAccount == ''){ //If no category was provided
				$("#edit_account").addClass('form_error');
				return false;
			}
			$("#edit_account").removeClass('form_error');
			userDict['records']['accounts'].push(newAccount);
 
			this.$emit('cancelled', '');
        },
        deleteAccount(){
            let account =  $(`#edit_account_old`).attr(`oldaccount`);
            let ref = this;
            confirm(`Are you sure you want to delete ${account}?`).then(function(outcome) {
                if(outcome){
                    const index = userDict['records']['accounts'].indexOf(account);
                    if (index > -1) {
                        userDict['records']['accounts'].splice(index, 1);
                    }
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
