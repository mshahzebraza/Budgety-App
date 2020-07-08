// BUDGET CONTROLLER
var budgetController = ( function () {

    var Expense = function (id , type, description) {
        this.id = id,
        this.type = type,
        this.description = description
    }

    var Income = function (id , type, description) {
        this.id = id,
        this.type = type,
        this.description = description
    }

    // Object to serve as a database for all items and total
    var Data = {
        allItems: {
            exp : [],
            inc : []
        },
        totals: {
            exp : 0,
            inc : 0
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

        // Get Input
        var input = UICtrl.getInput();
        console.log(input);

        
        // Clear Fields

        // Add item to Data

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