const date = new Date();
const thisYear = date.getFullYear();
const thisMonth = date.getMonth();
const thisDate = date.getDate();
const Months = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
let firstDayNum;
let monthLength;


function firstDayOfMonth(mon) {
    firstDayNum = new Date(thisYear, mon, 1).getDay();
    if(firstDayNum == 0) firstDayNum = 7;
}

function getMonthLength(monthNum) {
    if(monthNum>11) monthNum = 0;
    if (monthNum < 0) monthNum = 11;
    switch (monthNum) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            monthLength = 31;
            break;
        case 3:
        case 5:
        case 8:
        case 10:
            monthLength = 30;
            break;
        case 1:
            if((thisYear % 4 == 0) && (thisYear % 100 != 0)) {
                monthLength = 29;
            }
            else {monthLength = 28}
            break;
        //no default    
    }
}

function DateNumbering(monthId) {
    let k = 1;
    for(let i = firstDayNum; i < (monthLength+firstDayNum); i++) {  
        document.getElementById("Cell-"+String(monthId)+"-"+k).innerHTML += "<p class='day-nums'>"+k+"</p>";
        k++;
    }
    k = 1;
    for(let i = firstDayNum+monthLength; i < 43; i++) {
        document.getElementById("Cell-"+String(monthId+1)+"-"+k).innerHTML += "<p class='extra-days'>"+k+"</p>";
        k++
    }
    getMonthLength(monthId-1)
    k = 0;
    let l = 0;
    for(let i = firstDayNum-1; i > 0; i--) {
        document.getElementById("Cell-"+String(monthId-1)+"-"+(monthLength-l)).innerHTML += "<p class='extra-days'>"+Number(monthLength-k)+"</p>";
        k++;
        l++;
    }
}

function calendarDraw(month) {
    const calBody = document.getElementById("cal-body");
    let tableForm = "";
    let k = 1;
    let l = 2;
    let m = 1;
    let n = 1;
    
    tableForm += "<table class='calendar-table'><tr class='days'><td>H</td><td>K</td><td>SZ</td><td>CS</td><td>P</td><td>SZO</td><td>V</td></tr>";
    for (let i = 0; i < 6; i++) {
        tableForm += "<tr id='tr"+i+"'>";
        for (let j = 0; j < 7; j++) {   
            firstDayOfMonth(month);
            getMonthLength(month);
            let idName = 1;
            if(k<firstDayNum){
                idName = month-1;
                getMonthLength(month-1);
                tableForm += "<td id='Cell-"+String(idName)+"-"+(monthLength-firstDayNum+l)+"' class='extra-days' onclick='listOut(this)'></td>";
                l++;
            }
            else if(k>=firstDayNum && k < firstDayNum+monthLength){
                idName = month;
                tableForm += "<td id='Cell-"+String(idName)+"-"+m+"' class='this-month-days' onclick='listOut(this)'></td>";
                m++;
            }
            else {
                idName = month+1;
                tableForm += "<td id='Cell-"+String(idName)+"-"+n+"' class='extra-days' onclick='listOut(this)'></td>";
                n++;
            }
            k++;
        }
        tableForm += "</tr>";
    }
    tableForm += "</table>";
    calBody.innerHTML = tableForm;
    DateNumbering(month);
}



let monthChange = 0;

function prevMonth() {
    monthChange--;
    if(thisMonth+monthChange < 0) monthChange = 11-thisMonth;
    calendarDraw(thisMonth + monthChange);
    writeInitial();
    document.getElementById("month").innerHTML = Months[thisMonth+monthChange];
}

function nextMonth() {
    monthChange++;
    if(thisMonth+monthChange > 11) monthChange = -thisMonth;
    calendarDraw(thisMonth + monthChange);
    writeInitial();
    document.getElementById("month").innerHTML = Months[thisMonth+monthChange];
}

let childNum;
let childDiv;
let divChild;
let divElement;
let divCtx;
let myForm;

function addElement(parent) {
    divElement = document.createElement("div");
    divCtx = document.createTextNode(final);
    divElement.appendChild(divCtx);
    let counter = document.getElementById(parent).children.length;
    while(counter < 4) {
        childDiv = document.getElementById(parent).appendChild(divElement);
        childDiv.classList.add("event")
        counter++;
    }
}

let allElems = ["Cell-"+thisMonth+"-"+thisDate, "Bemutató", "Valahol Budapesten", "Az oldal kizárólag bemutatóul szolgál, nem funkcionál személyes naptárként.", 
"Cell-"+(thisMonth-1)+"-27", "CSS írás", "", "Kész a JS, meg kell formázni az oldalt", 
"Cell-"+(thisMonth-1)+"-25", "JS teszt", "", "Hibakeresés, feltárt hibák javítása", 
"Cell-"+(thisMonth-1)+"-23", "Projekt indítása", "", "Oldalfelépítés megtervezése, funkcionalitás definiálása, majd ezek után script írása", 
"Cell-"+thisMonth+"-"+1, "CV írása", "", "", 
"Cell-"+thisMonth+"-"+1, "Referencia rendezése", "", "", 
"Cell-"+thisMonth+"-"+1, "Jelentkezés", "Budapest", "", 
"Cell-"+thisMonth+"-"+1, "Várakozás", "", ""];
let Name;
let Place;
let Descrn;
let final;

function close() {
    document.getElementById("createNew").style.display = "none";
}

let id;

function listOut(cell) {
    close();
    id = cell.id;
    document.getElementById("time").innerHTML = "Időpont: " + Months[id.split('-')[1]] + " " + id.split('-')[2];
    const x = allElems.indexOf(id);
    if(x >= 0) {
        const numberOfSame = allElems.filter(itsId => itsId == id).length;
        let k = x;
        let list = "";
        let childCount = 0;
        for(let f = 0; f<numberOfSame; f++){
            let indexOfNext = allElems.indexOf(id, k);
            list += "<div>";
            list += "<p><span>Név: </span>"+allElems[indexOfNext+1]+"</p>";
            if(allElems[indexOfNext+2] != "") {list += "<p><span>Hely: </span>"+allElems[indexOfNext+2]+"</p>";}
            if(allElems[indexOfNext+3] != "") {list += "<p><span>Leírás: </span>"+allElems[indexOfNext+3]+"</p>";}
            list += "<button class='reset' onclick='remove(`"+id+"`, "+childCount+")'>Törlés</button></div>";
            k += 4;
            childCount++;
        }
        document.getElementById("lists").innerHTML = list;
        document.getElementById("noElemYet").style.display = "none";
    }
    else {
        document.getElementById("lists").innerHTML = "";
        document.getElementById("noElemYet").style.display = "block";
    }
}

function createElem(param) {
    
    if(param){
        Name = document.getElementById("Name").value;
        if(Name != "") {
            Place = document.getElementById("Place").value;
            Descrn = document.getElementById("Description").value;
            let newElem = [id, Name, Place, Descrn];
            allElems = allElems.concat(newElem);
            writeData(id);
            document.getElementById("createNew").style.display = "none";
        }
        else {
            document.getElementById("calForm").children[1].innerHTML = "Kérlek ne hagyd üresen!";
        }
    }
    else {
        writeInitial();
    } 
}

function writeData(dataId) {
    let k = 0;
    const x = allElems.indexOf(dataId);
    if(x >= 0) {
        const numberOfSame = allElems.filter(itsId => itsId == dataId).length;
        k = x;
        if(numberOfSame < 4) {
            if(numberOfSame > 1) {
                for(let d = 0; d < numberOfSame-1; d++) {
                document.getElementById(dataId).getElementsByTagName("div")[0].remove();
                }
            }
            for(let f = 0; f < numberOfSame; f++) {
                const inside = allElems.indexOf(dataId, k);
                final = allElems[inside+1];
                addElement(dataId);
                k += 4;
            }
        }
        else {
            document.getElementById(dataId).getElementsByTagName("div")[2].innerHTML = "További "+(numberOfSame-2);
        } 
    }
    listOut(document.getElementById(dataId));
}

function writeInitial() {
    document.getElementById("month").innerHTML = Months[thisMonth];
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 7; j++) {
            const parent = document.getElementById("tr"+i);
            const child = parent.children[j].id;
            const x = allElems.indexOf(child);
            if(x >= 0) {
                const numberOfSame = allElems.filter(itsId => itsId == child).length;
                let k = x;
                for(let f = 0; f<numberOfSame; f++) {
                    const inside = allElems.indexOf(child, k);
                    final = allElems[inside+1];                    
                     addElement(child);
                    k += 4;
                }
                if(numberOfSame > 3) {
                    document.getElementById(child).getElementsByTagName("div")[2].innerHTML = "További "+(numberOfSame-2);
                }
            }
            listOut(document.getElementById("Cell-"+(thisMonth+monthChange)+"-"+thisDate));
        }
    }
}

function startNew() {
    document.getElementById("calForm").children[1].innerHTML = "";
    document.getElementById("Name").value = "";
    document.getElementById("Place").value = "";
    document.getElementById("Description").value = "";
    document.getElementById("createNew").style.display = "block";
}

function abort() {
    close();
}

function remove(cellID, numOfChild) {
    let k = 0;
    let index;
    for(let i = 0; i < allElems.length; i+=4) {
        if(allElems[i] == cellID) {
            if(k == numOfChild){
                index = i;
            }
            k++;
        }
    }
    let deleted = allElems.splice(index, 4);
        
    const numberOfSame = allElems.filter(itsId => itsId == cellID).length;
    if(numberOfSame < 3) {
        document.getElementById(cellID).children[numOfChild+1].outerHTML = "";
    }
    else {
        for(let i = 1; i < 4; i++) {
            document.getElementById(cellID).children[1].outerHTML = "";
        }
        const x = allElems.indexOf(cellID);
        if(x >= 0) {
            const sameID = allElems.filter(itsId => itsId == cellID).length;
            let k = x;
            for(let f = 0; f<sameID; f++) {
                const inside = allElems.indexOf(cellID, k);
                final = allElems[inside+1];
                addElement(cellID);
                k += 4;
            }
            if(sameID > 3) {
                document.getElementById(cellID).getElementsByTagName("div")[2].innerHTML = "További "+(sameID-2);
            }
        }
    }
    listOut(document.getElementById(cellID));    
}

window.onload = function() {
    calendarDraw(thisMonth, 0);
    createElem(false);
}