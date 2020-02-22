
let arr;

$(document).ready(function(){

  $("#searchInput").focus();

  $.ajax({
    url: "data/ml.txt",
    cache: false
  })
    .done(function( html ) {
      arr = html.split("\n");
      //console.log(arr.length);
      //arr.forEach( item => console.log("--" + item + "--") );
      arr.forEach( item => $( "#results" ).append( item + "<br>" ) );
    });

  $("#searchInput").bind("change paste keyup", function() {
    let searchString = $(this).val(); 
    //console.log("input: " + searchString );
    let searchResult = arr.filter( item => item.toLowerCase().includes(searchString.toLowerCase()) );
    $("#results").empty();
    searchResult.forEach( item => $("#results").append( item + "<br>" ) );
  });

  $("#sortAbc").click(function() {
    let nameArr = [];
    arr.forEach( item => {
      if(item) {
        let name = item.split(".")[1].trim();
        nameArr.push(name.toLowerCase());
      }
    });
    $("#results").empty();
    nameArr.sort();
    nameArr.forEach( item => $("#results").append( item + "<br>" ) );
  });

});

