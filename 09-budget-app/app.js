// Constants
const CST = (() => {
    // DOM constants
    const DOM = {
        typeSelect: '.add__type',
        descriptionInput: '.add__description',
        valueInput: '.add__value',
        addButton: '.add__btn',
        containerDiv: '.container',
        incomeListDiv: '.income__list',
        expensesListDiv: '.expenses__list',
        budgetValue: '.budget__value',
        incValue: '.budget__income--value',
        expValue: '.budget__expenses--value',
        incPercentage: '.budget__income--percentage',
        expPercentage: '.budget__expenses--percentage',
        itemDelete: '.item__delete',
    };

    return {
        DOM,
    }
})();



// Data Controler
const budgetControler = (function() {
    var Income = function(ID, description, value) {
        this.id = ID;
        this.description = description;
        this.value = value;
    };

    var Expense = function(ID, description, value) {
        this.id = ID;
        this.description = description;
        this.value = value;
    };

    const data = {
        allItems: {
            inc: [],
            exp: [],
        },
        totals: {
            inc: 0,
            exp: 0
        },
        percentage: -1
    };

    /*
    const data = {
        allItems: {
            inc: [
                {id:0, description: 'Salaire', value: 2200},
                {id:1, description: 'Buy Books', value: 340},
                {id:2, description: 'Revenu', value: 235},
            ],
            exp: [],
        },
        totals: {
            inc: 2200,
            exp: 0
        },
        percentage: -1
    };
    */

    // Add item
    const addItem = function(type, desc, value) {
        let ID, newItem;
        const arr = data.allItems[type];

        if( arr.length > 0 ) {
            ID = arr[arr.length - 1].id + 1;
        } else {
            ID = 0;
        }

        if(type === 'inc') {
            newItem = new Income(ID, desc, value);
            arr.push(newItem);
        } else if(type === 'exp') {
            newItem = new Expense(ID, desc, value);
            arr.push(newItem);
        }

        // Update totals
        data.totals[type] += value;

        return newItem;
    };

    // Remove item
    const removeItem = (id) => {
        const splitID = id.split('-');
        const type = splitID[0];
        const ID = parseInt(splitID[1]);
        const arr = data.allItems[type].map(function(item) {
            return item.id;
        }); // [1, 3, 4, 6, 7]
        const idItem = arr.indexOf(ID);
        data.allItems[type].splice(idItem, 1);
    };

    // Remove ALL items
    const removeAllItem = (id) => {

    };

    // Update item
    const updateItem = (id) => {

    };

    const calculateBudget = () => {
        let sum = 0, inc, exp;
        inc = data.totals.inc = data.allItems['inc'].reduce( (acc, curr) => {
            return acc + curr.value;
        }, 0);
        exp = data.totals.exp = data.allItems['exp'].reduce( (acc, curr) => {
            return acc + curr.value;
        }, 0);

        sum = inc - exp;
        return sum;
    }

    return {
        add: addItem,
        remove: removeItem,
        removeAll: removeAllItem,
        update: updateItem,
        getData(type) {
            return data.allItems[type];
        },
        getTotal(type) {
            return data.totals[type];
        },
        getPercentage() {
            return data.percentage;
        },
        calculate: calculateBudget,
        get() {
            return data;
        }
    }
})();



// UI Controler
const UIControler = (function(CST, budgetModel) {
    const DOMstrings = CST.DOM;
    const getUIelement = (value) => document.querySelector(value);

    return {
        getInput() {
            return {
                type: getUIelement(DOMstrings.typeSelect).value,
                description: getUIelement(DOMstrings.descriptionInput).value,
                value: parseFloat(getUIelement(DOMstrings.valueInput).value),
            }
        },
        getUIelement,
        addUIItem(obj, type) {
            let HTML, ID, desc, val;
            id = obj.id;
            desc = obj.description;
            val = obj.value;

            if(type === 'inc'){
                HTML = `<div class="item clearfix" id="inc-${id}">
                            <div class="item__description">${desc}</div>
                            <div class="right clearfix">
                                <div class="item__value">+ ${val}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
                getUIelement(DOMstrings.incomeListDiv).insertAdjacentHTML('beforeend', HTML);
            } else {
                HTML = `<div class="item clearfix" id="exp-${id}">
                            <div class="item__description">${desc}</div>
                            <div class="right clearfix">
                                <div class="item__value">- ${val}</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
                getUIelement(DOMstrings.expensesListDiv).insertAdjacentHTML('beforeend', HTML);
            }

        },
        removeUIItem(elem) {
            elem.remove();
        },
        update() {
            getUIelement(DOMstrings.budgetValue).textContent = budgetControler.calculate();
            getUIelement(DOMstrings.incValue).textContent = '+ ' + budgetModel.getTotal('inc');
            getUIelement(DOMstrings.expValue).textContent = '- ' + budgetModel.getTotal('exp');
        },
        init() {
            budgetModel.getData('inc').forEach(function(item) {
                UIControler.addUIItem({id: item.id, description: item.description, value: item.value}, 'inc')
            });
            this.update();
        }
    }
})(CST, budgetControler);

// Main Controler
const controler = (function(CST, UICtrl, budgetCtrl) {
    const DOMstrings = CST.DOM;
    const getUI = UICtrl.getUIelement;

    const addItem = () => {
        // Get input data
        const input = UIControler.getInput();
        // Add item to the MODEL
        let newItem = budgetCtrl.add(input.type, input.description, input.value);
        // Add item to UI
        UIControler.addUIItem(newItem, input.type);
        // Update UI
        UICtrl.update(input.type);
    }

    const setupEventListeners = () => {
        getUI(DOMstrings.addButton).addEventListener('click', addItem);
        document.addEventListener('keypress', (e) => {
            if(e.keyCode === 13) {
                addItem();
            }
        });

        getUI(DOMstrings.containerDiv).addEventListener('click', (e) => {
            if(e.target.className === 'ion-ios-close-outline') {
                // get taget element
                const elemDel = e.target.parentNode.parentNode.parentNode.parentNode;
                // get attribute 'id' of target element
                let id = elemDel.id;
                // remove item from model
                budgetControler.remove(id);
                // remove item from UI
                UICtrl.removeUIItem(elemDel);
                // update UI
                UICtrl.update();
            }
        });
    };

    return {
        init() {
            // Set up event listeners
            setupEventListeners();
            // init UI
            UICtrl.init();
        }
    }
})(CST, UIControler, budgetControler);

// Start the application
controler.init();
