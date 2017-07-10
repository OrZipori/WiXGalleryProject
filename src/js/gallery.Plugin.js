// plugin for any gallery
// Or Zipori

(function( $ ) {
    var container;
    var paginList = [];
    var currPage;
    var photosPerPage;
    var numOfPages;

    // entry function for the plugin. It's job is to organize the data, the pagination
    // and to render first page
    $.fn.gallery = function(data, perPage) {
        // assign element to container
        container = $(this[0]);

        photosPerPage = perPage;
        currPage = 0;

        // populate data and paginate it
        populateData(data);

        // add controllers for pagination
        addControllers();

        // render first page
        renderData();

        return this;
    };

    // this function adds the controllers for pagination
    function addControllers() {
      // if exists -> remove
      if ($("#controllers").length) {
        $("#controllers a").unbind();
        $("#controllers").remove();
      }

      if (numOfPages > 1) {
        container.after("<div class='clear'></div><div id='controllers'></div>");

        var template = "<a href='javascript:void(0);' id='next'><img src='img/next.png'/></a>";
        template += "<a href='javascript:void(0);' id='prev'><img src='img/prev.png'/></a>";

        $("#controllers").html(template);

        $("#controllers #prev").fadeOut("fast");

        $("#controllers #next").on("click", function() {
            currPage++;
            $("#controllers #prev").fadeIn("fast");
            if (currPage == (numOfPages - 1)) {
              $("#controllers #next").fadeOut("fast");
            }
            renderData();
        });

        $("#controllers #prev").on("click", function() {
            currPage--;
            $("#controllers #next").fadeIn("fast");
            if (currPage == 0) {
              $("#controllers #prev").fadeOut("fast");
            }
            renderData();
        });
      }
    }

    // this function renders the paginList data according to currPage variable
    // which stands for which data vector to render on screen.
    function renderData() {
      var template = "";

      container.empty();
      paginList[currPage].forEach(function(item) {
        if (item.img == "self" || !item.img)
          item.img = "ph.png";
        template += "<div class='image'>";
        template += "<a href = '" + item.url + "'><img src='" + item.img + "'/></a>";
        template += "<span>" + item.title + "</span></div>";
      });

      container.html(template);

      // adds the hover ability (register for event)
      $(".image").hover(function() {
        $(this).find("span").fadeIn("fast");
      },
        function() {
          $(this).find("span").fadeOut("fast");
        });
    }

    // this function populate the list of lists (data vectors), and organize the pagination
    function populateData(arrData) {
      numOfPages = Math.floor((arrData.data.children.length / photosPerPage));
      paginList = [];

      var counter = 0;
      var tmpArr = [];
      var i, k;

      var items = arrData.data.children;

      // populate data and page it - all the data that the division is round
      for (i = 0; i < numOfPages; ++i) {
          for (var j = 0; j < photosPerPage; ++j) {
            var v = {};

            k = i * photosPerPage + j;
            v["url"] = items[k].data.url;
            v["img"] = items[k].data.thumbnail;
            v["title"] = items[k].data.title;

            tmpArr.push(v);
          }
          paginList.push(tmpArr);
          // delete all content
          tmpArr = [];
      }

      // add the remainder
      var remainder = arrData.data.children.length % photosPerPage;
      for (i = 0; i < remainder; ++i) {
        var v = {};

        k = photosPerPage * numOfPages + i;
        v["url"] = items[i].data.url;
        v["img"] = items[i].data.thumbnail;
        v["title"] = items[i].data.title;

        tmpArr.push(v);
      }
      paginList.push(tmpArr);

      // add one more page for the remainder
      if ((arrData.data.children.length % photosPerPage) > 0) numOfPages++;
    }
}( jQuery ));
