$(document).ready(function() {

    //display time
    $("#currentDay").text(moment().format("dddd MMMM Do, YYYY HH:mm:ss a"));

    //set tense class for each block
    var currentHour = moment().hour();
    $(".time-block").each(function(index, timeBlock) {
        var timeBlockTime = $(timeBlock).attr("hour");
        if(timeBlockTime < currentHour) {
            $(timeBlock).addClass("past")
        } else if(timeBlockTime == currentHour) {
            $(timeBlock).addClass("present")
        } else if(timeBlockTime > currentHour) {
            $(timeBlock).addClass("future")
        }
    });

    //make save button work with
    $(".saveBtn").on("click", function(event) {
        //get the timeblock hours
        var hour = $(event.target).closest(".time-block").attr("hour");
        // get the text from the input
        var text = $(event.target).closest(".time-block").find(".description").val();
        //construct a data entry
        var dataEntry = {
            hour: hour,
            text: text
        }
        //get old data
        var data = JSON.parse(localStorage.getItem("data")) || [];
        //add new data to old data entry
        data.push(dataEntry);
        //set the local storage
        localStorage.setItem("data", JSON.stringify(data));
    });

    //restore text values - get old data
    var data = JSON.parse(localStorage.getItem("data")) || [];
    data.forEach(function(datum) {
        var queryString = `[hour=${datum.hour}]`;
        $(queryString).find(".description").val(datum.text)
    });

});