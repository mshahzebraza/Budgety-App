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
        addListItem: function(type, obj){
            // Performs action
            var html, newHtml, element;

            // Selection of HTML Code either income list or expense list.
            if (type === "inc") {

                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            } else if (type === "exp") {
                
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }

            // Manipulatiing the HTML
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Adding HTML in the document by selecting an html element
            var x= document.querySelector(element)
            console.log(x);
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
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

        // Add item to Budget Controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        console.log(newItem);

        // Show item in container
        UICtrl.addListItem(input.type, newItem);

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