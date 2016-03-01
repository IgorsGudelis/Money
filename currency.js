
var appU = {
    constructors: {}
};

appU.constructors.currency = function(){
    var that = this;
    this._currenciesTypes = {
        "+USD": "USD",
        "+EUR": "EUR",
        "+GBP": "GBP",
        "+PLN": "PLN"
    }

    var view = new appU.constructors.currencyView(this);

    //Sets current date
    this._setDate = function(){
        view._setDate();
    };

    //Gets exchange rates for bank buy today and renders currencies types, bankBuy and link to view info to tbody
    this._getBankBuyRatesTodayAndRender = function(){
        function doAjax(currencyType){
            var exchangeRatesURL = "http://api.fixer.io/latest?base=" + that._currenciesTypes[currencyType];

            $.ajax({
                url: exchangeRatesURL,
                jsonpCallback: "jsonCallback",
                success: function(json){
                    view._renderExchangeRatesTable(json, that._currenciesTypes, currencyType);
                }
            });
        };

        for(type in this._currenciesTypes){
            doAjax(type);
        };
    };

    //Gets exchange rates for bank sell today and adds them to the table
    this._getBankSellRatesTodayAndRender = function(){
         function doAjax(currencyType){
            var exchangeRatesURL = "http://api.fixer.io/latest?base=RUB";

             $.ajax({
                 url: exchangeRatesURL,
                 jsonpCallback: "jsonCallback",
                 success: function(json){
                     view._addBankSellInfo(json, that._currenciesTypes, currencyType);
                 }
             });
         };

         for(type in this._currenciesTypes){
             doAjax(type);
         };
    };

    //Renders table of exchange rates
    this._renderExchangeRatesTable = function(){
        this._getBankBuyRatesTodayAndRender();
        this._getBankSellRatesTodayAndRender();
    };

    //Renders selected currency
    this._renderSelectedCurrency = function(currencyType){
        if(currencyType === undefined){
            currencyType = "+USD";
        }

        var exchangeRatesURL = "http://api.fixer.io/latest?base=" + this._currenciesTypes[currencyType];

            $.ajax({
                url: exchangeRatesURL,
                jsonpCallback: "jsonCallback",
                success: function(json){
                    view._renderSelectedCurrencyBankBuyToday(json, that._currenciesTypes, currencyType);
                }
            });

            exchangeRatesURL = "http://api.fixer.io/latest?base=RUB";

                $.ajax({
                    url: exchangeRatesURL,
                    jsonpCallback: "jsonCallback",
                    success: function(json){;
                        view._renderSelectedCurrencyBankSellToday(json, that._currenciesTypes, currencyType)
                    }
                });
    };

    //Shows the table of exchange rates
    this._showExchangeRatesTable = function(){
        view._showExchangeRatesTable();
    };

    //Renders content of the page
    this.showPageContent = function(){
        this._setDate();
        this._renderExchangeRatesTable();
        this._renderSelectedCurrency();
        this._showExchangeRatesTable();
    };
};



