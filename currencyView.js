
appU.constructors.currencyView = function(currencyParam){
    var that = this;
    this._currency = currencyParam;

    //Sets current date
    this._setDate = function(){
        var date = new Date();
        var month = date.getMonth() + 1;
        $("#date").text(date.getDate() + "." + month + "." + date.getFullYear());
    };

    //Renders tbody with values of currencies types, bankBuy and link to view info
    this._renderExchangeRatesTable = function(json, currenciesTypes, currencyType){
        var bankBuy = json.rates.RUB;
        bankBuy = bankBuy.toFixed(2).slice(0, -1);

        $("[href='#currenciesTable-popup']").remove();

        var $tr = $("<tr>").attr("data-type", currencyType);
        var $td1 = $("<td>").text(currenciesTypes[currencyType]).appendTo($tr);
        var $td2 = $("<td class='buy'>").text(bankBuy).appendTo($tr);
        var $td3 = $("<td class='sell'>").appendTo($tr);
        var $td4 = $("<td class='info'>")
            .html("<a href='#' class='currencyInfo' data-type='"+ currencyType +"'>Info</a>")
            .appendTo($tr);
        $("tbody").append($tr);

    };

    //Counts rates of currency for bank sell
    function countBankSell(bankSell){
        bankSell = bankSell.toFixed(5).slice( 0, -1);
        bankSell = 1 / bankSell + 1;

        return bankSell = bankSell.toFixed(1);
    };

    //Adds info to table td about rates of bank sale currency
    this._addBankSellInfo = function(json, currenciesTypes, currencyType){
        var bankSell = json.rates[currenciesTypes[currencyType]];
        bankSell = countBankSell(bankSell);

        $("[data-type='"+ currencyType +"'] td:eq(2)").text(bankSell);
    };

    //Renders rates of selected currency for bank buy today
    this._renderSelectedCurrencyBankBuyToday = function(json, currenciesTypes, currencyType){
        $("#currencyName").text(currenciesTypes[currencyType]).appendTo("#currencySelected");

        var bankBuy = json.rates.RUB;
        bankBuy = bankBuy.toFixed(2).slice(0, -1);

        var $bankBuy = $("#bankBuy");
        var bankBuyStr = "Bank buy - " + bankBuy + "";
        $bankBuy.text(bankBuyStr).appendTo("#currencySelected");
    };

    //Renders rates of selected currency for bank sell today
    this._renderSelectedCurrencyBankSellToday = function(json, currenciesTypes, currencyType){
        var $bankSell = $("#bankSell");

        var bankSell = json.rates[currenciesTypes[currencyType]];
        bankSell = countBankSell(bankSell);

        var bankSellStr = "Bank sell - " + bankSell + "";
        $bankSell.text(bankSellStr).insertAfter("#bankBuy");
    };

    //Shows the table of exchange rates
    this._showExchangeRatesTable = function(){
        $("#currencySelected").hide();
        $("#currenciesTable").fadeIn();
        $("#btnColumns").fadeIn();
    };

    //Shows selected currency
    this._showCurrencySelected = function(){
        $("#currenciesTable").hide();
        $("#currencySelected").fadeIn();
    };

    //Binds click on link to view info of currency
    $("#currenciesTable").on("click", "a", function(){
        var currencyType = $(this).attr("data-type");
        that._currency._renderSelectedCurrency(currencyType);

        //Hides panel of checkboxes if it open and button columns
        var visibleCheckbox = $("#columnsOptions").css("display");
        if(visibleCheckbox !== "none"){
            $("#columnsOption").hide();
        }
        $("#btnColumns").hide();

        that._showCurrencySelected();
    });

    //In the panel binds click on link  show all currencies
    $("#allCurrenciesTypes").on("click", function(){
        that._showExchangeRatesTable();
    });

    //In the panel binds click on link show selected currency
    $(".currencyType").on("click", function(){
        var currencyType = $(this).text();
        that._currency._renderSelectedCurrency("+" + currencyType);

        $("#btnColumns").hide();

        that._showCurrencySelected();
    });

    //Hides panel of checkboxes if it open and hides/show button columns when is clicked button menu of the panel
    $("#menu").click(function(){
        var visibleCheckbox = $("#columnsOptions").css("display");
        if(visibleCheckbox !== "none"){
            $("#columnsOption").hide();
        }

        var visibleCurrency = $("#currencySelected").css("display");
        if(visibleCurrency !== "none"){
            $("#btnColumns").hide();
        }else {
            $("#btnColumns").show();
        }
    });

    //Show/hides button columns when click button close panel
    $("#closePanel").click(function(){
        var visibleCurrency = $("#currencySelected").css("display");
        if(visibleCurrency !== "none"){
            $("#btnColumns").hide();
        }else {
            $("#btnColumns").show();
        }
    });

    $("#btnColumns").click(function(){
        $("#columnsOption").toggle();
    });

    //Shows/hide columns of selected name
    $(document).on('change', 'input', function() {
        var checked = $(this).is(":checked");

        var columnName = $(this).attr("value");
        if(checked) {
            $(columnName).fadeIn();
        } else {
            $(columnName).fadeOut();
        }
    });
};