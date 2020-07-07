// BUDGET CONTROLLER
var budgetController = ( function () {

    // Some Code
        
})()


// UI CONTROLLER
var UIController = ( function () {
    function acceptCall() {

    var DOMstrings = {
        inputType : ".add__type",
        inputDescription : ".add__description",
        inputValue : ".add__value",
        inputBtn : ".add__btn"
    }



    // PUBLIC METHODS    
     
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
    
    var DOM = UICtrl.getDOMstrings(); // recieves DOM strings from UICtrl
    
    var ctrlAddItem = function(){

        // Get Input
        var input = UICtrl.getInput();
        console.log(input);

        
        // Clear Fields

        // Update Income/Expenses

        // Show Income / Expenses

        // Update Budget
    }
    

    // FOR EVENT LISTENERS
    document.querySelector(DOM.inputBtn).addEventListener("click" , ctrlAddItem)

    document.addEventListener("keypress", function (event) {

        if (event.keyCode === 13 || event.which === 13) {            
            ctrlAddItem();
        }
        
    })
     
    // PUBLIC METHODS    
        
})(budgetController, UIController)