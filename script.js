$(document).ready(readyNow);

function readyNow() {
    //button that sets starting budget
    $("#setBudgetButton").on("click", setBudget);
    //button that adds items
    $('#addItemButton').on('click', addItem);
}

//starting budget
let startBudget;
let endBudget;
//empty purchases array
let purchases = [];

function setBudget() {
    //grab value of budget input
    startBudget = $('#budgetInput').val();
    //make sure input is filled
    if (startBudget === '' || startBudget === 0 || startBudget === undefined) {
        alert('Enter a starting budget');
    } else {
        //2. add that budget input to startBudget
        $('#startBudget').empty().append(startBudget);
        //3. add that budget input to remainingBudget
        $('#endBudget').empty().append(startBudget).css('color', 'green');
        //4. if user clicks set budget button again, reset these inputs
        //4a. empty the budget input element
        $('#budgetInput').val('');
        //4b. empty the array
        purchases = [];
    }
}

function emptyInputs() {
    $('#item').val('');
    $('#cost').val('');
}

function addItem() {
    //1. create new item (name, cost)
    let newItem = {
        name: $('#item').val(), //string
        cost: Number($('#cost').val()) //number
    }

    //2. check that inputs are not empty
    if (newItem.name === '' || newItem.cost <= 0 || startBudget === '' || startBudget === 0 || startBudget === undefined) {
        alert('Please fill out \'Starting Budget\', \'Item Name\', and \'Cost\'');
        return
    } else {
        //2. push object into array purchases
        purchases.push(newItem);
        console.log('Added new item: ', newItem);
    }
    //3. empty inputs
    emptyInputs();
    //4. calculate remaining budget
    remainingBudget();
    //5. show new purchases in table
    showPurchases();
}

function removeItem(){
    //select item from listOfPurchases
    //loop thru array
    //remove from listOfPurchases
    //refund item.cost to endBudget
}

function remainingBudget() {
    //1. create a variable that will keep track of sum of purchases
    let sumItemCosts = 0;
    //2. loop thru purchases array and add the costs together
    for (item of purchases) {
        //for each purchase, sum up prices
        sumItemCosts += (item.cost);
        //subtract the sum from the endBudget
        endBudget = startBudget - sumItemCosts;
        //ensures purchase cannot go below 0
        if (startBudget > 0 && endBudget <= 0) {
            alert("⛔️ Purchase automatically denied. Budget will become negative ⛔️");
            return;
        } else if (endBudget > 0) {
            $('#endBudget').empty().append(endBudget);
            console.log('Remaining budget is: ', endBudget);
            //put endBudget inside the Remaining Budget h2 element
        }
    }
}

function showPurchases() {
    //target id
    let el = $("#itemPurchased");
    //grabbing last item in the purhcases array
    let la = purchases[purchases.length - 1].name;
    let ud = purchases[purchases.length - 1].cost;
    //show purchases array
    console.log(`All purchases:`, purchases);
    //adds row and cells WITH the last item
    //adds remove button
    el.before(`<tr>` + `<td>${la}</td>` + `<td>$${ud} <span><button id="removeButton" disabled>Remove</button></span> </td>` + `</tr>`);
}