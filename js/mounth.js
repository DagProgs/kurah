var monthSelect = document.getElementById("monthSelect");
var tableBody = document.getElementById("prayerTimesTableBody");
var prayerTimes;
var previousHighlightedDay;

function getCurrentMonth() {
    var currentDate = new Date();
    return currentDate.getMonth() + 1;
}

fetch('js/json/prayer-times.json')
    .then(response => response.json())
    .then(data => {
        prayerTimes = data;
        updatePrayerTimesTable();
        monthSelect.value = getCurrentMonth();
    });

function updatePrayerTimesTable() {
    var selectedMonth = monthSelect.value;
    var currentDate = new Date();
    var currentDay = currentDate.getDate();

    tableBody.innerHTML = "";

    for (var day in prayerTimes[selectedMonth]) {
        var row;

        if (day == currentDay && selectedMonth == getCurrentMonth()) {
            row = "<tr class='current-day-cell'>";
            if (previousHighlightedDay) {
                previousHighlightedDay.classList.remove('current-day-cell');
            }
            previousHighlightedDay = tableBody.lastElementChild;
        } else {
            row = "<tr>";
        }

        row += "<td>" + day + "</td>";

        for (var prayer in prayerTimes[selectedMonth][day]) {
            var time = prayerTimes[selectedMonth][day][prayer];
            var formattedTime = time[0].toString().padStart(2, '0') + ":" + time[1].toString().padStart(2, '0');
            row += "<td>" + formattedTime + "</td>";
        }

        row += "</tr>";
        tableBody.innerHTML += row;
    }
}

monthSelect.addEventListener("change", updatePrayerTimesTable);