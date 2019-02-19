var yearSelect = $("#year");
var monthSelect = $("#month");
var today = new Date();
var month = today.getMonth();
var year = today.getFullYear();
var day = today.getDate();
var maxDay = day + 4;
var temperature;
var description;
var icon;


yearSelect.val(year);
monthSelect.val(month);

$(".pDay").text(day);
$(".pMonth").text($("#month option:selected").text());
$(".pYear").text($("#year option:selected").text());

$("#tableCalendar").on("click", "td", function() {
     $(".pDay").text($(this).children(":first").text());
});

GetWeather();

function getCalendar(Month, Year) {
    var firstDay = (new Date(Year, Month)).getDay()-1;
    var daysInMonth = 32 - new Date(Year, Month, 32).getDate();
    var tbl = $("#calendar-body");

    tbl.html("");

    var date = 1;

    for (var countRow = 0; countRow < 6; countRow++) {

        var row = $("<tr></tr>");

        for (var countCell = 0; countCell < 7; countCell++) {
            if (countRow === 0 && countCell < firstDay) {
                var cell = $("<td></td>");
                var text = "";
                cell.append(text);
                row.append(cell);
            }
            else if (date > daysInMonth) {
                break;
            }
            else {
                var cell = $("<td style='font-size: 20px;'></td>");
                var text = date;
                if (date == today.getDate() && Year == today.getFullYear() && Month == today.getMonth()) {
                    cell.addClass("todayCell");
                }
                cell.append("<span>"+text+"</span>");

                if($("#month").val() == month && $("#year").val() == year){
	                if(date >= day && date <= maxDay ){
		                if(temperature !== null && description !== null && icon !== null)
		                {
	                        var urlIcon = "http://openweathermap.org/img/w/"+icon+".png";
		                    cell.append("</br><span style='font-size: 12px;'>"+ description + " (" + temperature + "ºC)</span>");
                            cell.addClass("weatherCell");
	                        cell.css("background-image", "url('"+urlIcon+"')");   
		                }
	                }
                }

                row.append(cell);
                date++;
            }
        }

        tbl.append(row);
    }
};

function GetWeather()
{
    $.ajax({
        type: "GET",
	    dataType: "json",
	    contentType: "application/json",
        url: "Calendar/GetWeather/",
        contentType: "application/json; charset=utf-8",
        beforeSend: function(){
            $('body').loading();
        },
        success: function (data) { 
            if(data != "KO")
            {        
	            temperature = Math.round(data.list[0].main.temp);
	            description = data.list[0].weather[0].main;
	            icon = data.list[0].weather[0].icon;

	            getCalendar(month, year);
            }
            else
            {
                alert("Something gone wrong. (0)", "error");
            }
        },
        error: function(data){
            alert("Something gone wrong. (1)", "error");
        },
        complete: function(){
            $('body').loading('stop');
        },
    });
};

function Refresh()
{
    $(".pMonth").text($("#month option:selected").text());
    $(".pYear").text($("#year option:selected").text());

    if($("#month").val() == month && $("#year").val() == year)
        GetWeather();
    else
        getCalendar($("#month").val(), $("#year").val());
    
};
