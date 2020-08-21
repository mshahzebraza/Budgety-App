// BUDGET CONTROLLER




let budgetController = ( function () {

    class Expense{
        constructor (id , description, value) {
            this.id = id,
            this.description = description,
            this.value = value,
            this.percentage = -1
        }
    
        calcPercentage() {
            (totalIncome) => {
                if (totalIncome>0) {
                    this.percentage = Math.round( (this.value / totalIncome) * 100 );
                } else {
                    this.percentage = -1;
                }
            };
        }
        
    }
    
    class Income{
    
        constructor (id , description, value) {
            this.id = id,
            this.description = description,
            this.value = value
        }
        
    }
    

// Object to serve as a database for all items and total

    const data = {
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

    const calculateTotal = (type) => {
        let sum=0;
        data.allItems[type].forEach( currentElement => {
            sum += currentElement.value;
        });
        data.totals[type] = sum;
        return sum;
    }



    return {

        
        calculatePercentages : () => {
            data.allItems.exp.forEach( (cur) => {
                cur.calcPercentage(data.totals.inc)
            })
        },

        getPercentages : () => {
            const arr = data.allItems.exp.map( cur => {
                return cur.percentage;
            })             
            return arr;
        },
        
        deleteItem : (type,ID) => {
            let totalItems,ids,curIndex;

            totalItems = data.allItems[type];
            ids = totalItems.map( (cur, index, array) => {
                return cur.id;
            })
            curIndex = ids.indexOf(ID); // returns -1  if not element found

            if (curIndex !== -1) {                
                totalItems.splice(curIndex , 1);
            }

        },
        
        addItem : (type, des, val) => {
            let newItem, ID;

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
        testing: () => {
            console.log(data);
        },

        calculateBudget : () => {

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

        getBudget : () => {
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
let UIController = ( () => {

    const DOMstrings = {
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
        container: ".container",
        expensesPercLabel: ".item__percentage",
        dateLabel: ".budget__title--month",
    }

    // VERY IMPORTANT TO UNDERSTAND THIS ------ MUST STUDY
    let nodeListForEach = (list, callback) => {
        for (let i = 0; i < list.length; i++) {
            callback( list[i] , i );
            
        }
    }

    
    let formatNumber = (num, type) => {
        let numSplit,int,dec ;

        num = Math.abs(num);
        num = num.toFixed(2);
        
        numSplit = num.split("."); // returns an array of 2 strings
        int = numSplit[0];
        dec = numSplit[1];

        if ( int.length > 3){
            var newInt, rem, mul;
            rem = int.length%3;
            mul = (int.length-rem)/3;
            
            // reads the remainder
            newInt = int.substr(0, rem);
            
            // reads 3 values for unless multiples of three vanish
            for (let i = 0; i < mul; i++) {
                if (newInt === ""){
                    newInt = int.substr(3*i + rem, 3);
                } else {
                    newInt = newInt + "," + int.substr(3*i + rem, 3);
                }
            }

            int = newInt;
        }

        return (type === "exp" ?  "-" : "+") + " " + int + "." + dec;
        
    };


    // PUBLIC METHODS - from Global
     
    return { 

        changeType : function () {

            let fields = document.querySelectorAll(
                DOMstrings.inputType + "," +
                DOMstrings.inputDescription + "," +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, function (cur) {
                cur.classList.toggle("red-focus");
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle("red");
            
        },
        
        displayMonth: () => {
            var now, year, monthIndex, month;

            now = new Date();
            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            monthIndex = now.getMonth();
            month = months[monthIndex];
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = month + " of " +year;
            
        },
        
        displayPercentages : (allPerc) => {
            for (let i = 0; i < allPerc.length; i++) {

                var fields = document.querySelector(DOMstrings.expenseContainer).querySelectorAll(DOMstrings.expensesPercLabel);
                // Alternatively
                // var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

                nodeListForEach(fields, function (cur, idx) {
                    if (allPerc[idx]>0) {
                        cur.textContent = allPerc[idx] + "%";
                    } else {
                        cur.textContent = "---";
                    }
                })
                
            }
        },
        
        getInput : () => {
            return {
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
                // btn : document.querySelector(".add__btn").value,
            }
        },
        addListItem: (type, obj) => {
            // Performs action
            let html, newHtml, element;

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
            newHtml = newHtml.replace('%value%', formatNumber(obj.value , type) );

            // Adding HTML in the document by selecting an html element
            // var x= document.querySelector(element)
            // console.log(x);
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },

        deleteListItem: (selectorID) => {
            let el;
            el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: () => {
            var fields, fieldsArray;

            fields = document.querySelectorAll( DOMstrings.inputDescription + ", " + DOMstrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);
            // slice method makes a copy of and array, and in this case, makes a copy of a nodeList into an array

            fieldsArray.forEach(element => {
                element.value = "";
            });

            fieldsArray[0].focus();
            
        }
        ,

        getDOMstrings : () => {
            return DOMstrings; 
        }
        ,
        displayBudget : (obj) => {

            var type;
            obj.budget >= 0 ? type = "inc" : type = "exp";

            // select the tag using query selector and replace the inner text
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, "exp");

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = Math.round(obj.percentage) + " %";
            } else {
                // This is the case when income is not set, and the ratio gives infinity
                document.querySelector(DOMstrings.percentageLabel).textContent = "---";   
            }



            
        }
        
    }
    
})()



// GLOBAL APP CONTROLLER
let AppController = ( (budgetCtrl , UICtrl) => {
    

    // FOR EVENT LISTENERS

    let setUpEventListeners = () => {

        let DOM = UICtrl.getDOMstrings(); // recieves DOM strings from UICtrl

        document.querySelector(DOM.inputType).addEventListener("change", UICtrl.changeType);
        
        document.querySelector(DOM.inputBtn).addEventListener("click" , ctrlAddItem)

        document.addEventListener("keypress", (event)=> {
            if (event.keyCode === 13 || event.which === 13) {            
                ctrlAddItem();
            }
        })

        document.querySelector(".container").addEventListener("click", ctrlDeleteItem)

    }
    
    let ctrlDeleteItem = (event)=> {
        let itemID;

        // ID in the DOM
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID){
            let splitID, type, ID;

            splitID = itemID.split("-");
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // Delete item from Data
            budgetCtrl.deleteItem(type, ID);

            // Delete item from UI
            UICtrl.deleteListItem(itemID);
            
            // Calculate budget and update in UI
            updateBudget();
            
            // Update Percentages
            updatePercentages();

        }
        // console.log(splitID);

    }
    
    let updateBudget = ()=> {

        // Calculate Budget
        budgetCtrl.calculateBudget();
    
        // Get Budget
        budget = budgetCtrl.getBudget();
        
        // Display Budget
        UICtrl.displayBudget(budget);

        

    }
    
    let ctrlAddItem = () => {
        let input, newItem;

        // Get Input
        input = UICtrl.getInput();

        if (input.value > 0 && input.value !== NaN && input.description !== "" ) {

            // Add item to Budget Controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    
            // Clear fields
            UICtrl.clearFields();
    
            // Show item in container
            UICtrl.addListItem(input.type, newItem);
    
            // Update the budget
            updateBudget();

            // Update the percentages
            updatePercentages();
        }

    }

    let updatePercentages = () => {
        // Calculate in the budget controller
        budgetCtrl.calculatePercentages();

        // Get the Percentage Values
        let allPerc = budgetCtrl.getPercentages();
        
        // Update the percentage in UI
        UICtrl.displayPercentages(allPerc);
        
    }
    


     
    // PUBLIC METHODS - from Global   

    return {

        // Sets up everything needed to start the application
        init: () => {
            UICtrl.displayMonth();
            setUpEventListeners();
            UICtrl.displayBudget({
                budget : 0,
                totalInc : 0,
                totalExp : 0,
                percentage : -1
                
            });
            // console.log("App has started");
            
        }
    }
        
})(budgetController, UIController)

AppController.init();