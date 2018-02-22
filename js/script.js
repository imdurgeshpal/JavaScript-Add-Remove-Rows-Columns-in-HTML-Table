var table = document.getElementById("tableData");

var selectedRow = 0;
var selectedColumn = 0;

var selectedColumnIndex = 0;


var toggleRow = null;
var toggleColumnIndex = null;

var dataArray = new Array();
var storedDataArray = new Array();
var jsonData;


var storedRowLength = 0;
var storedColumnLength = 0;


var columnLength = 0;
var rowLength = 0;

var jsonDataFromStorage = localStorage.getItem('jsonData');
var storedDataArray = JSON.parse(jsonDataFromStorage);

if (storedDataArray != null) {
    storedColumnLength = storedDataArray[1].length;
    storedRowLength = storedDataArray.length;
}

document.getElementById('addRowColumn').style.display = "none";
document.getElementById('deleteRowColumn').style.display = "none";


function onLoadMethod() {
    if (storedColumnLength == 0) {

        for (r = 0; r < 3; r++) {
            row = table.insertRow(r);
            for (c = 0; c < 4; c++) {
                if (r == 0 && c == 0) {
                    row.insertCell(c);
                } else if (r == 0) {
                    row.insertCell(c).innerHTML = "<button class='btn btn-block btn-row' onClick='selectColumn(this)'>Column " + c + " </button>";
                } else if (c == 0) {
                    row.insertCell(c).innerHTML = "<button class='btn btn-md btn-row' onClick='selectRow(this)'>Row " + r + "</button>";
                } else {
                    row.insertCell(c).innerHTML = "<input type='text' class='form-control'>";
                }

            }
        }
    } else {

        for (r = 0; r < storedRowLength; r++) {
            row = table.insertRow(r);
            for (c = 0; c < storedColumnLength; c++) {
                if (r == 0 && c == 0) {
                    row.insertCell(c);
                } else if (r == 0) {
                    row.insertCell(c).innerHTML = "<button class='btn btn-block btn-row' onClick='selectColumn(this)'>Column " + c + " </button>";
                } else if (c == 0) {
                    row.insertCell(c).innerHTML = "<button class='btn btn-md btn-row' onClick='selectRow(this)'>Row " + r + " </button>";
                } else {
                    row.insertCell(c).innerHTML = "<input type='text' class='form-control' value ='" + storedDataArray[r][c] + "' >";
                }
            }
        }
    }
}

function selectRow(e) {

    rowLength = table.rows.length;
    columnLength = table.rows[0].cells.length;
    selectedRow = e.parentNode.parentNode;


    for (i = 0; i < rowLength; i++) {
        for (j = 0; j < columnLength; j++) {
            table.rows[i].cells[j].classList.remove("selectedElement");
        }
    }

    if (toggleRow == null) {

        for (c = 0; c < columnLength; c++) {
            selectedRow.cells[c].className = 'selectedElement';
        }
        toggleRow = selectedRow;
    } else if (toggleRow == selectedRow) {
        toggleRow = null;
        selectedRow = 0;
    } else {

        for (c = 0; c < columnLength; c++) {
            selectedRow.cells[c].className = 'selectedElement';
        }
        toggleRow = selectedRow;
    }



    if (selectedRow == 0) {
        document.getElementById('addRowColumn').style.display = "none";
        document.getElementById('deleteRowColumn').style.display = "none";


    } else {
        document.getElementById('addRowColumn').style.display = "inline-block";
        document.getElementById('deleteRowColumn').style.display = "inline-block";
    }
    selectedColumn = 0;
    toggleColumnIndex = null;
}

function selectColumn(e) {

    rowLength = table.rows.length;
    columnLength = table.rows[0].cells.length;
    selectedColumn = e.parentNode;
    selectedColumnIndex = selectedColumn.cellIndex;


    for (i = 0; i < rowLength; i++) {
        for (j = 0; j < columnLength; j++) {
            table.rows[i].cells[j].classList.remove("selectedElement");
        }
    }

    if (toggleColumnIndex == null) {
        for (i = 0; i < rowLength; i++) {
            table.rows[i].cells[selectedColumnIndex].className = 'selectedElement';
        }
        toggleColumnIndex = selectedColumnIndex;
    } else if (toggleColumnIndex == selectedColumnIndex) {
        for (i = 0; i < rowLength; i++) {
            table.rows[i].cells[selectedColumnIndex].classList.remove("selectedElement");
        }
        toggleColumnIndex = null;
        selectedColumn = 0;
    } else {
        for (i = 0; i < rowLength; i++) {
            table.rows[i].cells[selectedColumnIndex].className = 'selectedElement';
        }
        toggleColumnIndex = selectedColumnIndex;
    }


    if (selectedColumn == 0) {
        document.getElementById('addRowColumn').style.display = "none";
        document.getElementById('deleteRowColumn').style.display = "none";
    } else {
        document.getElementById('addRowColumn').style.display = "inline-block";
        document.getElementById('deleteRowColumn').style.display = "inline-block";
    }

    selectedRow = 0;
    toggleRow = null;
}

function addButton() {

    columnLength = table.rows[0].cells.length;
    rowLength = table.rows.length;

    document.getElementById('addRowColumn').style.display = "none";
    document.getElementById('deleteRowColumn').style.display = "none";


    if (selectedRow != 0) {

        var row = table.insertRow(selectedRow.rowIndex + 1);


        for (c = 0; c < columnLength; c++) {
            var cell = row.insertCell(c);

            if (c == 0) {
                cell.innerHTML = "<button class='btn btn-md btn-row' onClick='selectRow(this)'>Row " + (selectedRow.rowIndex + 1) + " </button>";
            } else {
                cell.innerHTML = "<input type='text' class='form-control'>";
            }
            selectedRow.cells[c].classList.remove("selectedElement");
        }
    } else if (selectedColumn != 0) {

        for (i = 0; i < rowLength; i++) {
            if (i == 0) {
                table.rows[i].insertCell(selectedColumnIndex + 1).innerHTML = "<button class='btn btn-block btn-row' onClick='selectColumn(this)'>Column " + (selectedColumnIndex + 1) + " </button>";
            } else {
                table.rows[i].insertCell(selectedColumnIndex + 1).innerHTML = "<input type='text' class='form-control'>";

            }
            table.rows[i].cells[selectedColumnIndex].classList.remove("selectedElement");
        }
    } else {
        console.log("Error in Adding Column or Row");
    }

    tableNumbering();
    selectedColumn = 0;
    selectedRow = 0;
    toggleRow = null;
    toggleColumnIndex = null;

}

function deleteButton() {

    columnLength = table.rows[0].cells.length;
    rowLength = table.rows.length;
    document.getElementById('addRowColumn').style.display = "none";
    document.getElementById('deleteRowColumn').style.display = "none";

    if (selectedRow != 0 && rowLength > 2) {
        table.deleteRow(selectedRow.rowIndex);
    } else if (selectedColumn != 0 && columnLength > 2) {

        for (i = 0; i < rowLength; i++) {
            table.rows[i].deleteCell(selectedColumnIndex);
        }
    } else {
        document.getElementById('addRowColumn').style.display = "none";
        document.getElementById('deleteRowColumn').style.display = "none";
        for (i = 0; i < rowLength; i++) {
            for (j = 0; j < columnLength; j++) {
                table.rows[i].cells[j].classList.remove("selectedElement");
            }
        }
        console.log("Error in Deleting Row or Column");
        alert("1 Row or Column required");
    }

    tableNumbering();
    selectedRow = 0;
    selectedColumn = 0;
    toggleRow = null;
    toggleColumnIndex = null;

}


function saveData() {

    columnLength = table.rows[0].cells.length - 1;
    rowLength = table.rows.length - 1;



    for (var i = 1; i <= rowLength; i++) {

        dataArray[i] = new Array();

        for (var j = 1; j <= columnLength; j++) {

            dataArray[i][j] = table.rows[i].cells[j].children[0].value;
        }
    }

    alert("Data Daved");

    jsonData = JSON.stringify(dataArray);
    localStorage.setItem('jsonData', jsonData);

    jsonDataFromStorage = localStorage.getItem('jsonData');

    storedDataArray = JSON.parse(jsonDataFromStorage);

    storedColumnLength = storedDataArray[1].length;
    storedRowLength = storedDataArray.length;
}

function tableNumbering() {
    columnLength = table.rows[0].cells.length;
    rowLength = table.rows.length;


    for (r = 0; r < rowLength; r++) {
        for (c = 0; c < columnLength; c++) {
            if (r == 0 & c != 0) {
                table.rows[r].cells[c].firstChild.innerHTML = "Column " + c;
            } else if (r != 0 && c == 0) {
                table.rows[r].cells[c].firstChild.innerHTML = "Row " + r;
            }

        }
    }
}


function resetButton() {
    if (confirm("You will loose your data")) {
        window.localStorage.clear();
        location.reload();
    }
}