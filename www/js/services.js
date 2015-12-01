angular.module('stocksApp.services',[])

.factory('EncodeURIService',function(){

    return {
      encode: function(string){
        console.log(string);
        var encoded_string = encodeURIComponent(string)
          .replace(/\"/g,"%22")
          .replace(/\ /g,"%20")
          .replace(/[!'()]/g, escape)
          ;

        return encoded_string;
      }
    };
})

.factory('StockDataService',function($q, $http, EncodeURIService){

  //funzione che fa il fetch dei dettagli dello stock
  var getDetailsData = function(ticker){
    var d = $q.defer();
    var query = 'select * from yahoo.finance.quotes where symbol IN ("'+ticker+'")';
    var url = 'http://query.yahooapis.com/v1/public/yql?q='+ EncodeURIService.encode(query) +'&format=json&env=http://datatables.org/alltables.env';

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
