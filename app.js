var budgetController = ( function () {

    var x = 10;
    function add(a) {
        return x + a;
    }

    return {
        publicTest: function (z) {
            return add(z);
        }
    }
        
})()


var UIController = ( function () {
    
    function acceptCall() {
        console.log("Someone called me from UI Module");
    }
    
    return {
        someMethod: function () {
            acceptCall();
        }
    }
        
})()



var AppController = ( function (budgetCtrl , UICtrl) {
    
    var mData = function (q) {
        return budgetCtrl.publicTest(q);
    }

    var mUI = function () {
        // UICtrl.acceptCall();
        UICtrl.someMethod();
    }
    
    return {

        fetchFromUI: function () {
            mUI(); // runs mUI = runs someMethod // = runs acceptCall // = logs string
        },
        
        fetchFromData: function (q) {

            // mData(); // runs mData = runs publicTest and demands a NUMBER argument // = returns added value from its Data module //nothing is logged
                // Does not work bcz mData is linked with publictest which demands argument, whereas mData does not pass in any argument. It simply does not have the capacity to pass in the argument as we can't directly call it, this ability must be transferred from top to bottom of the chain, starting from fetchFromData
        
            mData(q); // also does not work bcz AppController.fetchFromData(q) simply runs the fetchDromData method and not the function inside it.. This command here will only "get the returned value" but "will not" pass it on/Return it towards others
            
            return mData(q) // Done!!!
            // Lesson Learnt: always complete the return value cycle, whenever you use nested loops & make sure the returning value keeps on returning till the desired Execution context is approached!!!

            
            // console.log("This is simply:"+q);
            // console.log(mData(1));

        }
    }
        
})(budgetController, UIController)