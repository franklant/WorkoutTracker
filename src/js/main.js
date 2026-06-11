function createTableEntry(workout_str, reps_num, weight_num) {
    return  `<tr id="${_workoutNum}-data">
                <td class="workout-str">${workout_str}</td>
                <td class="reps-num">${reps_num}</td>
                <td class="weight-num">${weight_num}</td>
                <td>
                    <button id="${_workoutNum}" class="remove-entry-btn" onclick="removeTableEntry(this)">Remove</button>
                </td>
             </tr>`
}

function addTableEntry() {
    let workoutName = prompt("Name of Workout?");
    let numberOfReps = Number(prompt("Number of Reps Performed?"));
    let weightAmount = Number(prompt("Whats the amount of weight (in lbs.)?"));

    if (isNaN(numberOfReps)) {
        alert("ERROR: NUMBER OF REPS MUST BE A NUMBER");
        return;
    }

    if (isNaN(weightAmount)) {
        alert("ERROR: AMOUNT OF WEIGHT MUST BE A NUMBER");
        return;
    }

    $("#entries").append(createTableEntry(workoutName, numberOfReps , weightAmount))
}

function removeTableEntry(node) {
    let entryId = `#${$(node).attr("id")}-data`;

    if (confirm("Are you sure?")) $(entryId).remove();
}

function submitDate() {
    let workoutDate = $("#date").val()

    if (workoutDate === null || workoutDate === "")  {
        alert("ERROR: MUST PLACE A DATE")
        return "error"
    }

    let dateRegex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/
    if (workoutDate.match(dateRegex) === null) {
        alert("WARN: DATE MUST BE IN MM/DD/YYYY FORMAT")
        return "error"
    }

    $("#prev-date").text(workoutDate)
    return "ok"
}

let _workoutNum = null;
let _tableString = "";
let _tableDate = "";

_workoutNum = localStorage.getItem("newWorkoutNum");
if (_workoutNum === null || _workoutNum === undefined) {
    _workoutNum = 0;
}

_tableString = localStorage.getItem("pastTableString");
_tableDate = localStorage.getItem("pastDate");
console.log(_tableString);

if (_tableString !== "") {
    $("#p-entries").html(JSON.parse(_tableString))
}

if (_tableDate !== "") {
    $("#prev-date").html(JSON.parse(_tableDate))
}

$(document).ready(() => {
    $("#add-entry-btn").on("click", () => {
        addTableEntry()
    })

    $("#submit-new-workout-btn").on("click", () => {
        if (submitDate() === "error") return;

        $("#p-entries").empty()

        let children = $(".n-workout-table").children().children()
        for (let i = 0; i < children.length; i++) {
            if (i === 0 || i === children.length - 1) continue;

            let workoutString = children.eq(i).children(".workout-str").text();
            let numberOfReps = children.eq(i).children(".reps-num").text();
            let amountOfWeight = children.eq(i).children(".weight-num").text();

            $("#p-entries").append(createTableEntry(workoutString, Number(numberOfReps), Number(amountOfWeight)));
        }

        localStorage.setItem("pastDate", JSON.stringify($("#date").val()))
        localStorage.setItem("pastTableString", JSON.stringify($("#p-entries").html()))

        $("#entries").empty()
    })
});