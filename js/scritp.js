const entries = [
    new Entry('salary',2000000),
    new Entry('Sell Phone',400000)

];

const expenses = [
    new Egress('Rent Apartment', 750000),
    new Egress('Pay Cellphone', 100000)
];

let loadApp = () => {
    loadHeader();
    chargeIncome();
    chargeEgress();
}

let totalIncomes = () =>{
    let totalIncome = 0;
    for(let entry of entries){
        totalIncome += entry.value;
    }
    return totalIncome;
}

let totalExpenses = () =>{
    let totalExpense = 0;
    for(let expense of expenses){
        totalExpense += expense.value;
    }
    return totalExpense;
}

let loadHeader = () =>  {
    let budget = totalIncomes() - totalExpenses();
    let expenditurePercentage = totalExpenses()/totalIncomes();
    document.getElementById('budget').innerHTML = moneyFormat(budget);
    document.getElementById('percentage').innerHTML = percentFormat(expenditurePercentage);
    document.getElementById('entries').innerHTML = moneyFormat(totalIncomes());
    document.getElementById('egress').innerHTML = moneyFormat(totalExpenses());
}

const moneyFormat = (value) => {

    return value.toLocaleString('en-US',{style:'currency', currency:'USD',
    minimumFractionDigits:0});

}
const percentFormat = (value) => {
    return value.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2})
}

const chargeIncome = () =>{
    let entriesHTML = '';
    for(let entry of entries){
        entriesHTML += createEntryHTML(entry);
    }
    document.getElementById('list-entry').innerHTML = entriesHTML;
}

const createEntryHTML = (entry) =>{
    let entryHTML = `
    <div class="element cleanstyle">
    <div class="element-description">${entry.description}</div>
    <div class="right cleanstyle">
        <div class="element-value"> + ${moneyFormat(entry.value)}</div>
        <div class="element-delete">
            <button class="element-delete-btn" >
                <ion-icon name="close-circle-outline"
                onclick = 'deleteEntry(${entry.id})' ></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return entryHTML;
}

const deleteEntry = (id) =>{
    let indexDelete = entries.findIndex(entry => entries.id === id);
    entries.splice(indexDelete, 1);
    loadHeader();
    chargeIncome();
}

const chargeEgress = () => {
    let expensesHTML = '';
    for (egress of expenses){
        expensesHTML += createExpensesHTML(egress);
    }
    document.getElementById('list-egress').innerHTML = expensesHTML;
}

const createExpensesHTML = (egress) =>{
    let egressHTML = `
    <div class="element cleanstyle">
    <div class="element-desc">${egress.description}</div>
    <div class="right cleanstyle">
        <div class="element-value"> - ${moneyFormat(egress.value)}</div>
        <div class="element-percent">${percentFormat(egress.value/totalExpenses())}</div>
        <div class="element-delete">
            <button class="element-delete-btn">
                <ion-icon name="close-circle-outline" 
                onclick = 'deleteEgress(${egress.id})' ></ion-icon>
            </button>
        </div> 
    </div>
</div>
    `;
    return egressHTML; 
} 

const deleteEgress = (id) =>{
    let indexDelete = expenses.findIndex(egress => expenses.id === id);
    expenses.splice(indexDelete, 1);
    loadHeader();
    chargeEgress();
}


let addData = () =>{
    let form = document.forms['form'];
    let type = form['type'];
    let description = form['description'];
    let value = form['value'];
    if(description.value !== '' && value.value !== ''){

        if(type.value === 'entry'){
            entries.push(new Entry (description.value, +value.value));
            loadHeader();
            chargeIncome();

        }
        else if(type.value === 'egress'){
            expenses.push(new Egress (description.value, +value.value));
            loadHeader();
            chargeEgress();
        }
    }
} 



console.log("ok");
