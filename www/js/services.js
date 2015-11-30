angular.module('stocksApp.services',[])

.factory('StockDataService',function($q, $http){

  //funzione che fa il fetch dei dettagli dello stock
  var getDetailsData = function(ticker){
    var d = $q.defer();

    var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22'+ticker+'%22)&format=json&env=http://datatables.org/alltables.env';

    $http.get(url)
      .success(function (json){
        var jsonData = json.query.results.quote;
        d.resolve(jsonData);
      })
      .error(function (error){
        console.error('Stock details error: ' + error);
        d.reject();
      })
    ;

    return d.promise;
  };

  //funzione che fa il fetch dei dati finanziari
  var getPriceData = function(ticker){

    var d = $q.defer();
    var url = 'http://finance.yahoo.com/webservice/v1/symbols/'+ ticker +'/quote?format=json&view=detail';

    $http.get(url)

      .success(function (json){
          var jsonData = json.list.resources[0].resource.fields;
          d.resolve(jsonData);
        })

      .error(function (error) {
        console.error('Price data error:' + error);
        d.reject();
      })
    ;

    //ritorno la promise come return della funzione getPriceData
    return d.promise;

  };


  return {
    getPriceData: getPriceData,
    getDetailsData: getDetailsData
  };

});
