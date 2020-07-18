// BUDGET CONTROLLER
var budgetController = ( function () {

    var Expense = function (id , description, value) {
        this.id = id,
        this.description = description,
        this.value = value
    }

    var Income = function (id , description, value) {
        this.id = id,
        this.description = description,
        this.value = value
    }

    // Object to serve as a database for all items and total
    var data = {
        allItems: {
            exp : [],
            inc : []
        },
        totals: {
            exp : 0,
            inc : 0
        }
        ,
        budget: 0,
        percentage: -1
    }

    var calculateTotal = function (type) {
        var sum=0;
        data.allItems[type].forEach( function(currentElement) {
            sum += currentElement.value;
        });
        // data.allItems[type].forEach(element => {
        //     sum += element.value;
        // });
        data.totals[type] = sum;
        return sum;
    }


    return {

        deleteItem : function (type,ID) {
            var totalItems;
            totalItems = data.allItems[type];
            // console.log(totalItems.length);

            for (let i = 0; i < totalItems.length ; i++) {
                if (totalItems.id === ID) {
                    var curIndex = totalItems.id; // actual ID
                    console.log("the Selected element had the id: " + curIndex);
                    totalItems.splice(curIndex , 1)
                }

            }
            
            // itemData = data.allItems[type][id];
            // console.log(itemData);
            // item.style.color= "red";
        },
        
        addItem : function (type, des, val) {
            var newItem, ID;

            // Create ID - review the syntax, using the brackets instead of dot to pass in a variable or data (string or number) ---- We could not use [length - 1] instead, bcz "length" isn't a variable & itself doesn't contain any value. 
            if ( data.allItems[type].length > 0 ) {
                ID = data.allItems[type][data.allItems[type].length - 1 ].id + 1;
            } else {
                ID =0;
            }

            // Create new item based on "inc" or "exp"
            if ( type === "exp" ) {
                newItem = new Expense(ID , des, val);
            } else if ( type === "inc" ){
                newItem = new Income(ID , des, val);
            }

            // Automatically pushed into the appropiate data set  // for different names, we would have to use if else conditional
            data.allItems[type].push(newItem);
            
            // Return new item
            return newItem;
            
        },
        testing: function () {
            console.log(data);
        },

        calculateBudget : function () {

            // 01 - Calculate the total of all income/expense
            // calculateTotal("inc");
            // calculateTotal("exp");

            // 02 - Calculate budget from the updated totals in the date object
            // data.budget = data.totals["inc"] - data.totals.exp;

            
            // Alternative Calculates total income/ expense and stores the budget in data structure at the same time.
            data.budget = calculateTotal("inc") - calculateTotal("exp");

            if (data.totals.inc > 0) {
                data.percentage = (data.totals.exp / data.totals.inc) * 100;
            } else {
                data.percentage = -1;
            }


        },

        getBudget : function () {
            return {
                budget : data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                percentage : data.percentage,
                
            }
            
        }
        
    }

    // PUBLIC METHODS    
        
})()


// UI CONTROLLER
var UIController = ( function () {

    var DOMstrings = {
        inputType : ".add__type",
        inputDescription : ".add__description",
        inputValue : ".add__value",
        inputBtn : ".add__btn",
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list",
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: ".container"
    }



    // PUBLIC METHODS - from Global
     
    return { 
        getInput : function () {
            return {
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
                // btn : document.querySelector(".add__btn").value,
            }
        },
        addListItem: function(type, obj){
            // Performs action
            var html, newHtml, element;

            // Selection of HTML Code either income list or expense list.
            if (type === "inc") {

                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            } else if (type === "exp") {
                
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }

            // Manipulatiing the HTML
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Adding HTML in the document by selecting an html element
            // var x= document.querySelector(element)
            // console.log(x);
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },

        clearFields: function () {
            var fields, fieldsArray;

            fields = document.querySelectorAll( DOMstrings.inputDescription + ", " + DOMstrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);
            
            // fieldsArray.forEach( function (current, index, array) {
            //     current.value ="";
            // } );

            // Alternative to course syntax ^ which is a little bit confusing
            fieldsArray.forEach(element => {
                element.value = "";
            });

            fieldsArray[0].focus();
            
        }
        ,

        getDOMstrings : function () {
            return DOMstrings; 
        }
        ,
        displayBudget : function (obj) {

            // get the required data from budget controller
        

            // select the tag using query selector and replace the inner text
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = Math.round(obj.percentage) + " %";
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = "---";
                
            }



            
        }
        
    }
    
})()



// GLOBAL APP CONTROLLER
var AppController = ( function (budgetCtrl , UICtrl) {
    

    // FOR EVENT LISTENERS

    var setUpEventListeners = function () {

        var DOM = UICtrl.getDOMstrings(); // recieves DOM strings from UICtrl
        
        document.querySelector(DOM.inputBtn).addEventListener("click" , ctrlAddItem)

        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {            
                ctrlAddItem();
            }
        })

        document.querySelector(".container").addEventListener("click", ctrlDeleteItem)

    }
    
    var ctrlDeleteItem = function (event) {
        var itemID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID){
            var splitID, type, ID;

            splitID = itemID.split("-");
            type = splitID[0];
            ID = splitID[1];

            // Delete item from Data
            budgetCtrl.deleteItem(type, ID);

            // Delete item from UI
            
            // Calculate budget and update in UI
            

        }
        // console.log(splitID);

    };
    
    var updateBudget = function () {

        // Calculate Budget
        budgetCtrl.calculateBudget();
    
        // Get Budget
        budget = budgetCtrl.getBudget();
        
        // Display Budget
        UICtrl.displayBudget(budget);

        

    }
    
    var ctrlAddItem = function(){
        var input, newItem;

        // Get Input
        input = UICtrl.getInput();

        if (input.value > 0 && input.value !== NaN && input.description !== "" ) {

            // Add item to Budget Controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            console.log(newItem);
    
            // Clear fields
            UICtrl.clearFields();
    
            // Show item in container
            UICtrl.addListItem(input.type, newItem);
    
            // Update the budget
            updateBudget()

            // Update the percentages

        }

    }
    


     
    // PUBLIC METHODS - from Global   

    return {

        // Sets up everything needed to start the application
        init: function () {
            setUpEventListeners();
            UICtrl.displayBudget({
                budget : 0,
                totalInc : 0,
                totalExp : 0,
                percentage : -1
                
            });
            console.log("App has started");
            
        }
    }
        
})(budgetController, UIController)

AppController.init();