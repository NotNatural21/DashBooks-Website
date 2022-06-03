<template>
    <!-- Invoice Selector -->
    <div class="pageHome">

        <div class="form_container">
            <div class="form" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);">
                <div id="top">
                    <div class="side">
                        <label for="amount_projects_invoice">Number of Projects To Invoice:</label>
                        <template v-if="isProjects">
                            <select id="amount_projects_invoice" @change="changeProjectNum" style="margin: 0px 0px 10px;">
                                <option v-for="(projID, index) in projectKeys" :key="projID">
                                    {{ index + 1 }}
                                </option>
                            </select>
                        </template>
                        <template v-else>
                            <div class="advisory">Go To Settings To Create A Project</div>
                        </template>
                        <div class="project_selection_container">
                            <template v-if="isProjects">
                                <template v-for="(n, index) in parseInt(amountOfProjects)" :key="index">
                                    <div class="selection_select">
                                        <label :for="`project_selection_${n}`">Choose a Project and Week:</label>
                                        <select :id="`project_selection_${n}`" @change="checkInvoice">
                                            <template v-for="(projDict, projID) in userObj['projects']" :key="projDict" >
                                                <template v-for="(weekDict, weekID) in projDict['weeks']" :key="weekID">
                                                    <option :data="projID" :weekid="weekID">{{ projDict.name }} : {{ weekID }}</option>
                                                </template>
                                            </template>
                                        </select>
                                        <p style="color: white" :id="`invoice_selection_alert_${n}`"></p>
                                    </div>
                                </template>
                            </template>
                        </div>
                    </div>
                    <div class="side">
                        <label for="user_selection">Choose a User:</label>
                        <template v-if="isUsers">
                            <select id="user_selection">
                                <option v-for="(userDict, userID) in userObj['users']" :key="userDict" :data="userID">
                                    {{ userDict['user'] }}
                                </option>
                            </select>
                        </template>
                        <template v-else>
                            <div class="advisory">Go To Settings To Create A User</div>
                        </template>
                        
                        <label for="client_selection">Choose a Client:</label>
                        <template v-if="isClients">
                            <select id="client_selection">
                                <option v-for="(projDict, projID) in userObj['clients']" :key="projDict" :data="projID">
                                    {{ projDict['client'] }}
                                </option>
                            </select>
                        </template>
                        <template v-else>
                            <div class="advisory">Go To Settings To Create A Client</div>
                        </template>
    
                        <label for="invoice_date">Invoice Date:</label>
                        <input id="invoice_date" type="date" />
    
                        <label for="invoice_for">Invoice For:</label>
                        <input id="invoice_for" type="text" />
                        
                        <label for="invoice_ID">Invoice ID:</label>
                        <input id="invoice_ID" type="text" />
                        
                        <label for="invoice_include_colours">Include All Colours:</label>
                        <input id="invoice_include_colours" type="checkbox" />
                    </div>
                </div>
            <q-btn class="glossy" rounded color="primary" label="Print Invoice" @click="generateInvoice"/>
            </div>	
        </div>
    </div>

	<div id="invoice_page" style="display: none;">
		<div id="PRINTtheTHING">
			<div style="-webkit-print-color-adjust: exact" id="invoice_sheet">
				<div class="inner">
					<div class="top_section">
						<div class="top_left">
							<h2 id="user_name_invoice"></h2>
							<p id="user_addOne_invoice"></p>
							<p id="user_addTwo_invoice"></p>
							<p id="user_city_invoice"></p>
							<p id="user_country_invoice"></p>
							<p id="user_contact_invoice"></p>
							<div class="box_with_heading">
								<p>Client ID</p>
								<p id="client_id_invoice"></p>
							</div>
							<div class="box_with_heading">
								<p>Bill To</p>
								<p id="client_name_invoice"></p>
								<p id="client_addOne_invoice"></p>
								<p id="client_addTwo_invoice"></p>
								<p id="client_city_invoice"></p>
								<p id="client_country_invoice"></p>
							</div>
						</div>
						<div class="top_right">
							<div class="title">INVOICE</div>
							<div class="dual_box_heading">
								<div class="box_with_heading">
									<p>Invoice #</p>
									<p id="invoice_id_invoice"></p>
								</div>
								<div class="box_with_heading">
									<p>Date</p>
									<p id="invoice_date_invoice"></p>
								</div>
							</div>
							<div class="box_with_heading">
								<p>Invoice Period</p>
								<p id="invoice_date_period"></p>
							</div>
							<div class="box_with_heading">
								<p>Invoice For</p>
								<p id="invoice_for_invoice"></p>
							</div>
						</div>
					</div>
                    <template v-for="(dict, key) in invoiceData">
                        <div class="bottom_section">
                            <span class="bottom_section_title">{{ dict.projName }}</span>
                            <div v-for="(col, index) in columnLetter" :key="col" :colID="col" class="invoice_sheet_column">
                                <div class="cell heading">{{ columnHeadings[index] }}</div>
                                <template v-for="(Info, colourID) in dict" :key="colourID">
                                    <div v-if="colourID != 'projTotal' && colourID != 'projName'" class="cell">{{ keys[index] == 'rate' || keys[index] == 'Total' ? `$ ${numberWithCommas(Info[keys[index]])}` : Info[keys[index]] }}</div>
                                </template>
                                <div class="cell"></div>
                                <div v-if="col == 'C'" class="cell" style="border-left: 1px solid black" >Subtotal</div>
                                <div v-if="col == 'C'" class="cell" style="border-left: 1px solid black" >Tax</div>
                                <div v-if="col == 'C'" class="cell" style="font-weight: 600;border-left: 1px solid black" >Total</div>

                                <div v-if="col == 'D'" class="cell">$ {{ numberWithCommas(dict.projTotal.toFixed(2)) }}</div>
                                <div v-if="col == 'D'" class="cell">$ 0</div>
                                <div v-if="col == 'D'" class="cell" style="font-weight: 600;">$ {{ numberWithCommas(dict.projTotal.toFixed(2)) }}</div>
                            </div>
                        </div>
                    </template>
                    <div class="bottom_section">
                        <div class="invoice_sheet_column">
                            <div class="cell" style="font-weight: 600;">GRAND TOTAL (NZD)</div>
                            <div class="cell" style="font-weight: 600;">$ {{ numberWithCommas(invoiceTotal.toFixed(2)) }}</div>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { userDict } from '../main.js'
import { generateID } from '../../public/generalFunctions.js';
import $ from 'jquery'
export default {
    name: 'InvoiceView',
    components: {

    },
    data(){
        return {
            userObj: userDict,
            isProjects: false,
            isUsers: false,
            isClients: false,
            isAccounts: false,
			includedColours: {},
			invoiceData: {},
			amountOfProjects: 1,
			invoiceTotal: 0,
			projectKeys: [],
			columnLetter: ['A', 'B', 'C', 'D'],
			columnHeadings: ['Description', 'Rate', 'Quantity', 'Total $'],
			keys: ['name', 'rate', 'QTY', 'Total'],
            addToRecord: true
        }
    },
    mounted(){
        this.$nextTick(() => {
            Object.keys(userDict['projects']).forEach((projectID, index) => {
                let weekID = Object.keys(userDict['projects'][projectID]['weeks'])[0]
                if(userDict['projects'][projectID]['weeks'][weekID]['invoiced']){
                    $(`#invoice_selection_alert_${index + 1}`).text('This week as already been invoiced')
                }else{
                    $(`#invoice_selection_alert_${index + 1}`).text('')
                }
            })
        });
        this.isProjects = Object.keys(userDict['projects']).length != 0;
        this.isUsers = Object.keys(userDict['users']).length != 0;
        this.isClients = Object.keys(userDict['clients']).length != 0;
        this.isAccounts = userDict['records']['accounts'].length != 0;
        if(this.isProjects){
            this.projectKeys = []
            Object.keys(userDict['projects']).forEach((projectID, index) => {
                this.projectKeys.push(projectID)
                this.projectKeys.push(projectID)
            })
        }
    },
    methods: {
        numberWithCommas(num) {
			return ((parseFloat(num).toFixed(2)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
		},
        changeProjectNum(){
            this.amountOfProjects = $(`#amount_projects_invoice option:selected`).val();
            this.$nextTick(() => {
                this.projectKeys.forEach((projectID, index) => {
                    let weekID = Object.keys(userDict['projects'][projectID]['weeks'])[0]
                    if(userDict['projects'][projectID]['weeks'][weekID]['invoiced']){
                        $(`#invoice_selection_alert_${index + 1}`).text('This week as already been invoiced')
                    }else{
                        $(`#invoice_selection_alert_${index + 1}`).text('')
                    }
                })
            });
        },
        checkInvoice(event){
            let projectID = $(`#${event.target.id} option:selected`).attr('data')
            let weekID = $(`#${event.target.id} option:selected`).attr('weekid')
            if(userDict['projects'][projectID]['weeks'][weekID]['invoiced']){
                $(`#invoice_selection_alert_${event.target.id.split('_')[2]}`).text('This week as already been invoiced')
            }else{
                $(`#invoice_selection_alert_${event.target.id.split('_')[2]}`).text('')
            }
        },
        changeState(){
            this.addToRecord = $('#invoice_add_records')[0].checked;
        },
        getFirstLastDate(arr){
            let dateObjArr = [];
            arr.forEach((date, index) => {
                let newDate = date.split('/');
                newDate = `${newDate[1]}/${newDate[0]}/${newDate[2]}`;
                let d = new Date(newDate);
                dateObjArr.push(d)
            })
            let firstDate = dateObjArr[0];
            let lastDate = dateObjArr[0];
            dateObjArr.forEach((date, index) => {
                if(date.getTime() <= firstDate.getTime()){
                    firstDate = date;
                }
                if(date.getTime() >= lastDate.getTime()){
                    lastDate = date;
                }
            })
            return [firstDate, lastDate]
        },
		generateInvoice(){
            this.invoiceTotal = 0
            //Invoice For
			$('#invoice_for_invoice').text($('#invoice_for').val());
			//Invoice ID
            let invoiceID = $('#invoice_ID').val()
			$('#invoice_id_invoice').text(invoiceID);
            //Dicts
			let clientDict = this.userObj['clients'][$("#client_selection option:selected").attr('data')];
			let userDicts = this.userObj['users'][$("#user_selection option:selected").attr('data')];
			//Invoice Date. Uses todays date if none is selected.
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            let invoiceDate = $('#invoice_date').val() ? $('#invoice_date').val().split('-')[2] + '/' + $('#invoice_date').val().split('-')[1] + '/' + $('#invoice_date').val().split('-')[0] : today;
			$('#invoice_date_invoice').text(invoiceDate);
			
            //Process All Data
            this.invoiceData = {};
            let allStartDates = [];
            let includeAllColours = $('#invoice_include_colours')[0].checked;
            for(let i = 1; i <= this.amountOfProjects; i++){
                let projectID = $(`#project_selection_${i} option:selected`).attr('data');
                let weekID = $(`#project_selection_${i} option:selected`).attr('weekid');
                if(!Object.keys(this.invoiceData).includes(projectID)){
                    this.invoiceData[projectID] = {};
                    this.invoiceData[projectID]['projTotal'] = 0;
                    this.invoiceData[projectID]['projName'] = userDict['projects'][projectID]['name'];
                }
                allStartDates.push(userDict['projects'][projectID]['weeks'][weekID]['startDate']);
                for(const [colourID, cellList] of Object.entries(userDict['projects'][projectID]['weeks'][weekID]['colouredCells'])){
                    if(cellList.length != 0 || includeAllColours){
                        let qty = (Math.round((1/(60/userDict['projects'][projectID]['timeInterval'])) * 1000) / 1000) * cellList.length;
                        let total = qty * parseFloat(userDict['colours'][colourID]['rate']);
                        if(!Object.keys(this.invoiceData[projectID]).includes(colourID)){
                            this.invoiceData[projectID][colourID] = {'QTY': 0, 'Total': 0}
                        }
                        this.invoiceData[projectID][colourID]['name'] = userDict['colours'][colourID]['name'];
                        this.invoiceData[projectID][colourID]['rate'] = userDict['colours'][colourID]['rate'];
                        this.invoiceData[projectID][colourID]['QTY'] += qty;
                        this.invoiceData[projectID][colourID]['Total'] += total;
                        this.invoiceData[projectID]['projTotal'] += total
                        this.invoiceTotal += total;
                    }
                }
            }
            //Invoice Period
            let allDate = this.getFirstLastDate(allStartDates)
            let firstDate = allDate[0];
            let lastDate = new Date(allDate[1]);
            lastDate.setDate(allDate[1].getDate() + 13);
            let zeropad_2 = ['00', '0', ''];
            let firstDate_day = zeropad_2[firstDate.getDate().toString().length] + firstDate.getDate().toString();
            let firstDate_month = zeropad_2[(firstDate.getMonth() + 1).toString().length] + (firstDate.getMonth() + 1).toString();
            let lastDate_day = zeropad_2[lastDate.getDate().toString().length] + lastDate.getDate().toString();
            let lastDate_month = zeropad_2[(lastDate.getMonth() + 1).toString().length] + (lastDate.getMonth() + 1).toString();

            let invoicePeriod = `${firstDate_day}/${firstDate_month}/${firstDate.getFullYear()} to ${lastDate_day}/${lastDate_month}/${lastDate.getFullYear()}`;

            $('#invoice_date_period').text(invoicePeriod);

            
			//User
			$('#user_name_invoice').text(userDicts['name']);
			$('#user_addOne_invoice').text(userDicts['addOne']);
			$('#user_addTwo_invoice').text(userDicts['addTwo']);
			$('#user_city_invoice').text(userDicts['city']);
			$('#user_country_invoice').text(userDicts['country']);
			$('#user_contact_invoice').text(userDicts['contact']);

			
			//client
			$('#client_id_invoice').text(clientDict['client']);
			$('#client_name_invoice').text(clientDict['name']);
			$('#client_addOne_invoice').text(clientDict['addOne']);
			$('#client_addTwo_invoice').text(clientDict['addTwo']);
			$('#client_city_invoice').text(clientDict['city']);
			$('#client_country_invoice').text(clientDict['country']);	
            

			setTimeout(() => {
				this.printInvoice();
			}, 1)
		},
		printInvoice(id="invoice_page"){
			let html = `<title>Print Preview</title><link rel="shortcut icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDhINWMtMS42NiAwLTMgMS4zNC0zIDN2Nmg0djRoMTJ2LTRoNHYtNmMwLTEuNjYtMS4zNC0zLTMtM3ptLTMgMTFIOHYtNWg4djV6bTMtN2MtLjU1IDAtMS0uNDUtMS0xcy40NS0xIDEtMSAxIC40NSAxIDEtLjQ1IDEtMSAxem0tMS05SDZ2NGgxMlYzeiIvPjwvc3ZnPg==">`;
			/* 
			$('link').each(function() { // find all <link tags that have
				if ($(this).attr('rel').indexOf('stylesheet') !=-1) { // rel="stylesheet"
					html += `<link rel="stylesheet" href="${$(this).attr("href")}" />`;
				}
			});
			 */
			html += `<link rel="stylesheet" href="/invoicePrint.css" />`
			html += '<body onload="window.focus(); window.print()">'+$("#"+id).html()+'</body>';
			let w = window.open("","_blank", 'width=900,height=900,nodeIntegration=yes');
			if (w) {
				w.document.write(html); 
				w.document.close() 
			}
		}
    }
}
</script>

<style scoped lang="scss">

input {
	width: 200px;
	margin-bottom: 15px;
	padding: 2px;
	font-family: 'Segoe UI', sans-serif;
	font-size: 15px;
	background-color: transparent;
	border: 1px solid white;
	border-bottom: 3px solid white;
	border-radius: 5px;
	outline: unset;
	transition: 0.2s ease border;
    color: white;
}

.form_error {
	border-color: red !important;
}

.form_container {
	position: relative;
    width: 100%;
    height: 100vh;
	opacity: 1;
	display: flex;
	justify-content: center;
    flex-direction: column;
	align-items: center;
	font-family: 'Segoe UI', sans-serif;
}

.form{
    height: 75%;
    width: 85%;
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
	border-radius: 25px;
    border: 1px solid $accent;
}

.form button:first-of-type{
	margin-top: 20px;
}

#top{
    display: flex;
    overflow-y: auto;
    flex-wrap: wrap;
}

.side{
    height: fit-content;
    display: flex;
	position: relative;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}

.side:nth-child(1){
    margin-right: 30px;
}

select{
	width: 230px;
	height: 35px;
	padding: 5px;
	border-radius: 10px;
	outline: none;
}

label{
    margin-top: 12px;
    font-family: 'Lato';
    color: white;
}

input[type="checkbox"]{
    height: 32px;
}

.advisory{
    font-style: italic;
    color: #850c0c
}

.button_link{
    width: 100% !important;
}
.selection_select{
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
}
.selection_select > p{
    height: 21px;
    font-style: italic;
}
</style>
