$(document).ready(function() {
  
  //opens page after clicking.

/*    <div class='col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-2 
col-lg-8'><div class='alert alert-success alert-dismissible' role='alert'>
<button type='button' class='close' data-dismiss='alert' aria-label='Close'>
<span aria-hidden='true'>&times;</span>
</button>
<p class='linkText'><strong>Link Example: </strong>
Click the Random button for a Random Page, or click the 'x' to remove the link..</p>
<button id='randomButton' class='button btn-default' type='button' 
data-href='https://en.wikipedia.org/wiki/Special:Random'>Random Link</button>
</div></div> */


  var pageOpener = function(open) {
    open.preventDefault();
    //open.stopPropagation();

    // prevent default anchor behavior
    var goTo = this.getAttribute("href");
    //jQUERY animation
    $(this).toggleClass("button, button2");
    setTimeout(function() {

   // window.open($(this).attr("href"), "_blank");
     window.open(goTo, "_blank");
    }, 500);
  };
 
  //button to open Link Example
 $("#randomButton").on("click", pageOpener);

 //console.log(openLink());
  $("#searchButton").on("click touchstart", function(collect) {
    collect = $("#searchInput").val(); //collects the search input
    var url =
      "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
      collect +
      "&format=json&callback=?"; //adds the search input to the api address. The link contains the list of results from the search input
    // the Following sets up the collection of search results through a json file
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      dataType: "json",
      success: function(data) {
        //erases past search results after CLICKING a new Search
        //The following interates through the list of search results from the url link and appends them to our site as new link and and description
        $("#output").html("");
        for (var i = 0; i < data[1].length; i++) {
          // console.log(data[1][i]);

          $("#output").append(`<div class='col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8'>
            <div class='alert alert-success alert-dismissible' role='alert'>
            <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
            <span aria-hidden='true'>&times;</span></button>
            <button class='button btn-default' type='button' href='` + data[3][i] + `' target="_blank">` + data[1][i] + `</button>
            <p class='linkText'>` + data[2][i] + `</p></div></div>`);
        }
        //button to open list of links
       $(".button").on("click", pageOpener);
      }
    });
  });
});