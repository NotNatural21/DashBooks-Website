<template>
	<div class="pageHome">
		<div class="inner">
			<h4>Welcome To DashBooks!</h4>
			<div id="tile_container">
				<div id="records_container">
				    <div class="tile">
                        <div class="top_display">
							<p>Income: {{ currentYear }}</p>
							<div>
								<q-btn-dropdown color="primary" label="Years">
								<q-list>
									<template v-for="yearID in Object.keys(userObj['records'])" :key="yearID">
										<q-item clickable v-close-popup @click="loadNetData" :data="yearID" v-if="yearID != 'accounts' && yearID != 'categories' && yearID != 'payee' && yearID != 'savedTransactions'">
											<q-item-section style="pointer-events: none;">
												<q-item-label style="pointer-events: none;">{{ yearID }}</q-item-label>
											</q-item-section>
										</q-item>
									</template>
								</q-list>
								</q-btn-dropdown>
							</div>
						</div>
                        <div class="mid_display">
							<p style="font-size: large">${{ numberWithCommas(netData.income) }}</p>
                            <p>Total Income for {{ currentYear }}</p>
						</div>
                        <div class="bar_grapgh" style="overflow-y: auto; justify-content: flex-start; margin-top: 10px;">
                            <template v-for="(item, keys) in incomeSum" :key="keys">
                                <div class="incomeBar" :style="{width: `${(90 * Math.abs(item / netData.income))}%`}">{{ keys }}: {{ item }}</div>
                            </template>
						</div>
                    </div>
                    <div class="tile">
                        <div class="top_display">
							<p>Expenses: {{ currentYear }}</p>
							<div>
								<q-btn-dropdown color="primary" label="Years">
								<q-list>
									<template v-for="yearID in Object.keys(userObj['records'])" :key="yearID">
										<q-item clickable v-close-popup @click="loadNetData" :data="yearID" v-if="yearID != 'accounts' && yearID != 'categories' && yearID != 'payee' && yearID != 'savedTransactions'">
											<q-item-section style="pointer-events: none;">
												<q-item-label style="pointer-events: none;">{{ yearID }}</q-item-label>
											</q-item-section>
										</q-item>
									</template>
								</q-list>
								</q-btn-dropdown>
							</div>
						</div>
                        <div class="mid_display">
							<p style="font-size: large">${{ numberWithCommas(netData.expenses) }}</p>
                            <p>Total Expenses for {{ currentYear }}</p>
						</div>
                        <div class="bar_grapgh" style="overflow-y: auto; justify-content: flex-start; margin-top: 10px;">
                            <template v-for="(item, keys) in expenseSum" :key="keys">
                                <div class="expenseBar" :style="{width: `${(100 * Math.abs(item / netData.expenses))}%`}">{{ keys }}: {{ item }}</div>
                            </template>
						</div>
                    </div>
                    <div class="tile">
						<div class="top_display">
							<p>Net Profit: {{ currentYear }}</p>
							<div>
								<q-btn-dropdown color="primary" label="Years">
								<q-list>
									<template v-for="yearID in Object.keys(userObj['records'])" :key="yearID">
										<q-item clickable v-close-popup @click="loadNetData" :data="yearID" v-if="yearID != 'accounts' && yearID != 'categories' && yearID != 'payee' && yearID != 'savedTransactions'">
											<q-item-section style="pointer-events: none;">
												<q-item-label style="pointer-events: none;">{{ yearID }}</q-item-label>
											</q-item-section>
										</q-item>
									</template>
								</q-list>
								</q-btn-dropdown>
							</div>
						</div>
						<div class="mid_display">
							<p style="font-size: large">${{ numberWithCommas(netData.income + netData.expenses) }}</p>
                            <p>Net Profit for {{ currentYear }}</p>
						</div>
						<div class="bar_grapgh" style="height: 160px">
                            <div class="incomeBar" :style="{width: `${(Math.min(100 * Math.abs(netData.income / netData.expenses), 90))}%`}">Income: &nbsp; &nbsp; ${{ numberWithCommas(netData.income) }}</div>
                            <div class="expenseBar" :style="{width: `${(Math.min(100 * Math.abs(netData.expenses / netData.income), 90))}%`}">Expenses: ${{ numberWithCommas(netData.expenses) }}</div>
						</div>
					</div>
				</div>
                <div id="project_container">
                    <div class="inner_project_tiles">
                        <template v-for="(item, keys) in userObj['projects']" :key="keys">
                            <div class="tile">
                                <div class="top_display">
                                    <p style="font-size:x-large; border-bottom: 1px solid black;">{{ item.name }}</p>
                                </div>
                                <p>WEEKS:</p>
                                <div class="weeks_container">
                                    <div class="inner_weeks">
                                        <template v-for="(weekDict, week) in item.weeks" :key="week">
                                            <template v-if="weekDict.invoiced">
                                                <div class="week" style="background-color: #53b700">
                                                    <p style="font-size:large;">{{ week }} : {{ weekDict.startDate }}</p>
                                                    <p class="week_total" @click="totalWeeks" :amount="weekDict.total">${{ numberWithCommas(weekDict.total) }}</p>
                                                    <p v-if="!weekDict.invoiced && checkDate(weekDict.startDate)" style="color: #FF4F00">Invoice Is Due!</p>
                                                    <p v-else="" style="width: 92.61px"></p>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="week">
                                                    <p style="font-size:large;">{{ week }} : {{ weekDict.startDate }}</p>
                                                    <p class="week_total" @click="totalWeeks" :amount="weekDict.total">${{ numberWithCommas(weekDict.total) }}</p>
                                                    <p v-if="!weekDict.invoiced && checkDate(weekDict.startDate) && parseFloat(weekDict.total) != 0" style="color: #FF4F00">Invoice Is Due!</p>
                                                    <p v-else="" style="width: 92.61px"></p>
                                                </div>
                                            </template>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    
                </div>
			</div>
            <div id="total_container" v-if="showTotal">
                <p id="total_amount" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" @click="removeTotal">Total: ${{ numberWithCommas(total) }}</p>
            </div>
		</div>
	</div>
</template>

<script>
import { userDict } from '../main.js';
import $ from 'jquery';
export default {
	name: 'HomeView',
	components: {

	},
	data(){
		return{
			currentYear: '',
			netData: {'income': 0, 'expenses': 0},
            expenseSum: {},
            incomeSum: {},
			total: 0,
			years: [],
            userObj: userDict,
            showTotal: false,
            loaded: false
		}
	},
	mounted(){
        let date = new Date();
        let month = date.getMonth();
        let thisYear = date.getFullYear();
        if(month < 3){
            this.currentYear = `${thisYear - 1} - ${thisYear}`;
        }else{
            this.currentYear = `${thisYear} - ${thisYear + 1}`;
        }
        this.netData.income = 0;
        this.netData.expenses = 0;
        this.expenseSum = {};
        this.incomeSum = {};
        if (this.currentYear in userDict['records']){
            for(const [objKey, objDict] of Object.entries(userDict['records'][this.currentYear]['transactions'])){
                if(objDict.type == 'Credit'){
                    this.netData.income += objDict.amount;
                    objDict.category in this.incomeSum ? this.incomeSum[objDict.category] += 0: this.incomeSum[objDict.category] = 0;
                    this.incomeSum[objDict.category] += objDict.amount;
                }else if(objDict.type == 'Debit'){
                    this.netData.expenses += objDict.amount;
                    objDict.category in this.expenseSum ? this.expenseSum[objDict.category] += 0: this.expenseSum[objDict.category] = 0;
                    this.expenseSum[objDict.category] += objDict.amount;
                }
            }
        }
	},
	methods: {
        removeTotal(){
            this.showTotal = false;
            this.total = 0
        },
        totalWeeks(event){
            this.showTotal = true;
            this.total += parseFloat($(event.target).attr('amount'))
        },
        numberWithCommas(num) {
			return ((parseFloat(num).toFixed(2)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
		},
        checkDate(date){
            let newDate = date.split('/');
            newDate = `${newDate[1]}/${newDate[0]}/${newDate[2]}`;
            const d = new Date(newDate);
            const t = new Date();
            const date2 = new Date(d.getTime() + 12096e5);
            if(date2.getTime() <= t.getTime()){
                return true
            }else{
                return false
            }

        },
		loadNetData(event){
			this.currentYear = $(event.target).attr('data');
            this.netData.income = 0;
            this.netData.expenses = 0;
            this.expenseSum = {};
            this.incomeSum = {};
			for(const [objKey, objDict] of Object.entries(userDict['records'][this.currentYear]['transactions'])){
				if(objDict.type == 'Credit'){
					this.netData.income += objDict.amount;
                    objDict.category in this.incomeSum ? this.incomeSum[objDict.category] += 0: this.incomeSum[objDict.category] = 0;
                    this.incomeSum[objDict.category] += objDict.amount;
				}else if(objDict.type == 'Debit'){
					this.netData.expenses += objDict.amount
                    objDict.category in this.expenseSum ? this.expenseSum[objDict.category] += 0: this.expenseSum[objDict.category] = 0;
                    this.expenseSum[objDict.category] += objDict.amount 
				}
			}
            
		}
	}
}
</script>


<style scoped lang="scss">
.inner{
	margin: 10px;
	width: 98%;
    height: 98%;
	
}
#tile_container{
	width: 100%;
	padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#tile_container > div{
	display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 15px;
    width: 95%;
    gap: 40px;
}

#tile_container > #project_container{
    justify-content: unset;
    display: unset;
}

.inner_project_tiles{
    display: flex;
    justify-content: center;
    width: fit-content;
    flex-wrap: wrap;
    min-width: 100%;
    gap: 40px;
    height: 100%;
    align-items: center;
}

h4{
	margin: 2px 0px;
}

.tile{
	min-width: 230px;
	width: 90%;
    max-width: 400px;
    min-height: 240px;
	height: 240px;
    margin: 0px 15px;
	background-color: white;
	box-shadow: 2px 4px 10px -4px #000000a4;
    border: 1px solid $accent;
    border-radius: 0.3rem;
}

.tile > p{
    display: flex;
    justify-content: center;
}

.top_display{
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 50px;
	width: 100%;
}
p{
	margin: 0px;
}
.mid_display{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 13px;
}
.bar_grapgh{
    width: 100%;
    height: calc(100% - 110px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    overflow-y: auto;
}
.incomeBar{
    margin-left: 13px;
    background-color: #53b700;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    white-space: nowrap;
    padding-left: 7px;
}
.expenseBar{
    margin-left: 13px;
    background-color: #00a6a4;
    height: 30px;
    min-height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    white-space: nowrap;
    padding-left: 7px;
    margin-bottom: 2px;
}

.weeks_container{
    height: calc(100% - 80px);
    overflow-y: auto;
    
}
.inner_weeks{
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
    align-items: center;
    gap: 3px;
}
.week{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 95%;
}
.week > p:first-child{
    display: flex;
    justify-content: flex-end;
}

.week_total{
    cursor: pointer;
    width: 70px;
}
#total_container{
    z-index: 500;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    pointer-events: none;
}

#total_amount{
    width: 15%;
    height: 7%;
    min-height: 75px;
    min-width: 250px;
    display: flex;
    color: white;
    border-radius: 25px 0px 0px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: all;
    font-size: larger;
}
</style>