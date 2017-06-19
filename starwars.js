$(document).ready(function() {

  //Array created per homework instructions
    var topics = [
    "Luke Skywalker",
    "Princess Leia",
    "Chewbacca",
    "Yoda",
    "Kylo Ren",
    "Obi-Wan Kenobi",
    "Han Solo"
  ]


 //function to create initial buttons on the page from array
   function createButtons() {
    $("#buttons-here").empty();

    for (var i = 0; i < topics.length; i++){
      var button = $("<button>");
      button.attr("data-starwars", topics[i]);
      button.text(topics[i]);
      $("#buttons-here").append(button);
    }
  }


  // function to display initial buttons on the page
  createButtons();

  $("#addButton").on("click", function(event) {
    event.preventDefault();
    var newButton = $("#inputText").val();
    $("#inputText").val("");
    topics.push(newButton);
    createButtons();
  })

    // Adding click event listen listener to all buttons
    $("button").on("click", function() {
      // Grabbing and storing the data-starwars property value from the button
      var starwars = $(this).attr("data-starwars");
      // Constructing a queryURL using the starwars name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        starwars + "&api_key=dc6zaTOxFJmzC&limit=10";
      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {
            // Creating and storing a div tag
            var starwarsDiv = $("<div>");
            starwarsDiv.addClass("gifstarwars");
            // Creating a paragraph tag with the result item's rating


            var p = $("<p>").text("Image Rating: " + results[i].rating + "   (Click Image to see the Action)");
            // Creating and storing an image tag
            var starwarsImage = $("<img>");

      // Setting the src attribute of the still image to a property pulled off the result item
            starwarsImage.attr("src", results[i].images.fixed_height_still.url);
            starwarsImage.attr("data-still", results[i].images.fixed_height_still.url);
            starwarsImage.attr("data-animate", results[i].images.fixed_height.url);
            starwarsImage.attr("data-state", "still");
            starwarsImage.addClass("moveornot");

         
            // Appending the paragraph and image tag to the starwarsDiv
            starwarsDiv.append(p);
            starwarsDiv.append(starwarsImage);

            // Prependng the starwarsDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(starwarsDiv);
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