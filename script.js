async function search(hint) {
  return new Promise((resolve, reject) => {
    $.get('./search.php?hint=' + hint, function(response) {
      console.log(response);
      resolve(response);  // Resolve with the response
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.error('Request failed: ' + textStatus + ', ' + errorThrown);
      reject(errorThrown);  // Reject with the error
    });
  });
}


$(document).ready(function() {
  $(document).on("click", "button", function() {
    var _this = this;
    $(this).css("width", "350px");
    setTimeout(function() {
      $(_this).css("opacity", 0);
      setTimeout(function() {
        $("div")
          .show()
          .css("opacity", 1);
      }, 300);
    }, 300);
  });

  $(document).on("submit", "form", function() {
    $("input, #submit").css("opacity", 0);
    setTimeout(function() {
      $("input, #submit").hide();
      var hint = $('#hint').val();
      
      $("#result").show();
      $("#result").html("Wait..."); 
      // Use the async search function and handle the response
      search(hint).then(
        (response) => {
          $("#result").show();
          $("#result").html(response);  // Populate the result
          setTimeout(function() {
            $("#result").css("opacity", 1);
            $("div").css("border-color", "green");
          }, 1);
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );
    }, 300);
    return false;  // Prevent form submission
  });
});



