angular.module('stocksApp.services',[])

.factory('StockDataService',function($q, $http){

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
    getPriceData: getPriceData
  };

});
