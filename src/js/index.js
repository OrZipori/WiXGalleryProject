$(document).ready(function() {
  // in case of error
  function raiseError() {
    $("#loader").fadeOut("fast");
    $("#gallery").html("<h1>Error please try again</h1>");
  }

  // on first load
  reddit.hot('cats').limit(35).fetch(function(res) {
    // res contains JSON parsed response from Reddit
    // populateData(res);
    // renderData();

    $("#gallery").gallery(res, 9);
    $("#loader").fadeOut("fast");
  });

  // on search submit
  $("#formReddit").on("submit", function(e) {
    e.preventDefault();

    var string = $("#subreddit").val();

    $("#loader").fadeIn("fast");

    reddit.hot(string).limit(35).fetch(function(res) {
      // res contains JSON parsed response from Reddit
      if (res.error) raiseError();
      // populateData(res);
      // renderData();
      $("#gallery").gallery(res, 9);
      $("#loader").fadeOut("fast");
    }, function(err) {
      raiseError();
      $("#loader").fadeOut("fast");
    });
  })
});
