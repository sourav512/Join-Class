const LectureNameInput = document.getElementById("subject");
const TeacherNameInput = document.getElementById("teacherNameInput");
const LectureIdInput = document.getElementById("lectureID");
const lectureNameCell = document.getElementById("lecName");
const teacherNameCell = document.getElementById("teacherName");
const nextLectureCell = document.getElementById("next");
const noClassDiv = document.getElementById("off");
const noClassData = document.getElementById("data");
const joinBtn = document.getElementById("joinBtn");
const table = document.getElementById("table");
const timeTable = document.getElementById("timeTable");

let classData = JSON.parse(localStorage.getItem("lectureData"));
if (!classData) {
  localStorage.setItem("lectureData", JSON.stringify([]));
}
checkLocalStorage();
function checkLocalStorage() {
  if (JSON.parse(localStorage.getItem("lectureData")).length <= 35) {
    document.getElementById("mainContent").style.display = "none";
  } else {
    document.getElementById("form").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    try {
      onload = updateInfoTable();
    } catch (error) {
      console.log(error);
    }
    showTimeTable();
  }
}
console.table(classData);

function getLink() {
  let lectureNo = getLectureNumber();
  location.replace("https://meet.google.com/" + classData[lectureNo].lectureID)
}
setInterval(updateInfoTable, 120 * 1000);

joinBtn.addEventListener("click", getLink);
function getLectureNumber() {
  let timeStamp = new Date();
  let hr = timeStamp.getHours();
  let min = timeStamp.getMinutes();
  let day = timeStamp.getDay() - 1;
  let timeInMinutes = hr * 60 + min;
  let classNumber = null;
  if (timeInMinutes >= 990) {
    classNumber = "noClass";
  } else if (timeInMinutes >= 930) {
    classNumber = 5;
  } else if (timeInMinutes >= 870) {
    classNumber = 4;
  } else if (timeInMinutes >= 855) {
    classNumber = "break";
  } else if (timeInMinutes >= 795) {
    classNumber = 3;
  } else if (timeInMinutes >= 735) {
    classNumber = 2;
  } else if (timeInMinutes >= 690) {
    classNumber = "break"; //break time
  } else if (timeInMinutes >= 630) {
    classNumber = 1;
  } else if (timeInMinutes >= 570) {
    classNumber = 0;
  } else {
    return "noClass";
  }

  if (typeof classNumber == "string") {
    return classNumber;
  } else {
    return day * 6 + classNumber;
  }
}

function validate() {
  if (LectureNameInput.value.length < 3 || LectureNameInput.value.length > 9) {
    console.log("Input size must be greater than 2 and less than 10");
    return;
  }
  if (TeacherNameInput.value.length < 3 || TeacherNameInput.value.length > 15) {
    console.log("Teacher name size must be greater than 2 and less than 16");
    return;
  }
  if (LectureIdInput.value.length != 10) {
    console.log("ID size must be equal to 10");
    return;
  }
  addToLS(LectureNameInput.value, TeacherNameInput.value, LectureIdInput.value);
}

function addToLS(subject, teacherName, lectureID) {
  console.log("addToLS");
  if (classData.length > 35) {
    console.log("create new data set");
  } else {
    let classDetail = {
      subjectName: subject,
      teacherName: teacherName,
      lectureID: lectureID,
    };
    LectureNameInput.value = "";
    TeacherNameInput.value = "";
    LectureIdInput.value = "";
    classData.push(classDetail);
    localStorage.setItem("lectureData", JSON.stringify(classData));
  }
  checkLocalStorage();
}

function updateInfoTable() {
  let lectureNo = getLectureNumber();
  if (typeof lectureNo == "string") {
    table.style.display = "none";
    joinBtn.style.display = "none";
    noClassDiv.style.display = "block";
    if (lectureNo == "break") {
      noClassData.innerText = "Its break";
    } else {
      noClassData.innerText = "No class right now!!";
    }
  } else {
    console.log(lectureNo);
    teacherNameCell.innerText = classData[lectureNo].teacherName.toUpperCase();
    lectureNameCell.innerText = classData[lectureNo].subjectName.toUpperCase();
    nextLectureCell.innerText =
      classData[lectureNo + 1].subjectName.toUpperCase();
  }
}

function showTimeTable() {
  
  let days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let lectureNo = getLectureNumber();

  for (let i = 0; i < 6; i++) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    tr.appendChild(td);
    td.innerHTML = days[i];
    td.style.backgroundColor = "#e98074";
    td.style.color = "#eae7dc";
    td.style.borderBottom ="2px solid #eae7dc";
    td.style.borderRight ="2px solid #8e8d8a" ;
    for (let j = 0; j < 6; j++) {
      let td = document.createElement("td");
      tr.appendChild(td);
      if (typeof lectureNo != "string") {
        if (lectureNo == i*6+j) {
          td.style.backgroundColor = "#e85a4f";
        }
        else if(i*6>=lectureNo-(lectureNo%6) && i*6+j<=lectureNo){
          td.style.backgroundColor = "rgb(232 90 79 / 51%)";
        }
      }
      td.innerHTML = classData[i * 6 + j].subjectName.toUpperCase();
      td.style.borderRight ="2px solid #8e8d8a";
    }
    timeTable.appendChild(tr);
  }
}
function resetData() {
  let result = confirm("Are you sure you want to delete data. This can't be reverted");
  if (result) {
    localStorage.clear();
    location.reload();
  }
}
console.log('Upcoming update will bring json data entry support for faster data entry');