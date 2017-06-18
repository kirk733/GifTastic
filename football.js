$(document).ready(function() {
    var still = [];

    // Adding click event listen listener to all buttons
    $("button").on("click", function() {
      // Grabbing and storing the data-football property value from the button
      var football = $(this).attr("data-football");
      // Constructing a queryURL using the football name
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        football + "&api_key=dc6zaTOxFJmzC&limit=10";
      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          console.log(results);

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {
            // Creating and storing a div tag
            var footballDiv = $("<div>");
            footballDiv.addClass("gifFootball");
            // Creating a paragraph tag with the result item's rating


            var p = $("<p>").text("Rating: " + results[i].rating);
            // Creating and storing an image tag
            var footballImage = $("<img>");

      // Setting the src attribute of the still image to a property pulled off the result item
            footballImage.attr("src", results[i].images.fixed_height_still.url);
            footballImage.attr("data-still", results[i].images.fixed_height_still.url);
            footballImage.attr("data-animate", results[i].images.fixed_height.url);
            footballImage.attr("data-state", "still");
            footballImage.addClass("moveornot");

         
            // Appending the paragraph and image tag to the footballDiv
            footballDiv.append(p);
            footballDiv.append(footballImage);
            // Prependng the footballDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(footballDiv);
          }
        });
    });

   $(document).on("click", ".moveornot", function(){

              // storing the data-state of the gif into a variable
              var state = $(this).attr("data-state");

          
          if(state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

          } else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
 })

  })