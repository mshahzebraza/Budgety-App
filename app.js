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
    }

    return {
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
                newItem : new Expense(ID , des, val);
            } else if ( type === "inc" ){
                newItem : new Income(ID , des, val);
            }

            // Automatically pushed into the appropiate data set  // for different names, we would have to use if else conditional
            data.allItems[type].push(newItem);
            
            // Return new item
            return newItem;
            
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
        inputBtn : ".add__btn"
    }



    // PUBLIC METHODS - from Global
     
    return { 
        getInput : function () {
            return {
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : document.querySelector(DOMstrings.inputValue).value
                // btn : document.querySelector(".add__btn").value,
            }
        },

        getDOMstrings : function () {
            return DOMstrings; 
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


    }
    
    
    var ctrlAddItem = function(){
        var input, newItem;

        // Get Input
        input = UICtrl.getInput();
        console.log(input);

        // Add item to Budget Controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value)

        // Show item in container

        // Calculate Budget

        // Display Budget

    }
    


     
    // PUBLIC METHODS - from Global   

    return {

        // Sets up everything needed to start the application
        init: function () {
            setUpEventListeners();
            console.log("App has started");
            
        }
    }
        
})(budgetController, UIController)

AppController.init();