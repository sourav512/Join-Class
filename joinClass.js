console.log("Hello world this is join class");
function getClassNo() {
  let time = new Date();
  let hr = time.getHours();
  let min = time.getMinutes();
  let timeFrom12 = (hr*60)+min;

  if (timeFrom12>=990) {
    return 8;
  }
  if (timeFrom12>=930) {
    return 5;
  }
  if (timeFrom12>=870) {
    return 4;
  }
  if (timeFrom12>=855) {
    return 9;
  }
  if (timeFrom12>=795) {
    return 3;
  }
  if (timeFrom12>=735) {
    return 2;
  }
  if (timeFrom12>=690) {
    return 9; //break time
  }
  if (timeFrom12>=630) {
    return 1;
  }
  if (timeFrom12>=570) {
    return 0;
  }
  return 8;
}
function getDay() {
  let day = new Date();
  return day.getDay() - 1;
}
let teacherLink = {
  PR: "https://meet.google.com/zwb-mzzv-pec",
  NPP: "https://meet.google.com/rcd-jnzi-znj",
  YP: "https://meet.google.com/zdo-fygc-hzq",
  SBP: "https://meet.google.com/xrt-uohs-two",
  VK: "https://meet.google.com/giu-mwsd-jux",
  APK: "https://meet.google.com/ddq-wmzx-izg",
  SR: "https://meet.google.com/ppe-wwhr-txa",
  MDP: "https://meet.google.com/pce-ykvu-ctx",
  SP: "https://meet.google.com/fdh-qizj-fjw",
  SV: "https://meet.google.com/qgo-nyss-cuk",
  LIB: "",
  WT: "",
};
let lectur = [
  {
    0: [teacherLink.LIB, "LIB", ""],
    1: [teacherLink.PR, "DAA", "Pushpak Raval"],
    2: [teacherLink.SBP, "FLAT", "Shyambabu Pandey"],
    3: [teacherLink.SR, "OOPJ(Lecture)", "S.Raghupathi"],
    4: [teacherLink.SR, "OOPJ(LAB)", "S.Raghupathi"],
    5: [teacherLink.SR, "OOPJ(LAB)", "S.Raghupathi"],
  },
  {
    0: [teacherLink.WT, "WT", ""],
    1: [teacherLink.MDP, "DPP", "Monal Patel"],
    2: [teacherLink.SV, "PSPE", "Shivanee"],
    3: [teacherLink.SV, "PSPE", "Shivanee"],
    4: [teacherLink.LIB, "LIB", ""],
    5: [teacherLink.SR, "OOPJ(Lecture)", "S.Raghupathi"],
  },
  {
    0: [teacherLink.SR, "OOPJ(Lecture)", "S.Raghupathi"],
    1: [teacherLink.SP, "PSPE", "Snehal Kumar.."],
    2: [teacherLink.NPP, "SE", "Nidhi Patel"],
    3: [teacherLink.SBP, "FLAT", "Shyambabu Pandey"],
    4: [teacherLink.PR, "DAA(LAB)", "Pushpak Raval"],
    5: [teacherLink.PR, "DAA(LAB)", "Pushpak Raval"],
  },
  {
    0: [teacherLink.SR, "OOPJ(LAB)", "S.Raghupathi"],
    1: [teacherLink.SR, "OOPJ(LAB)", "S.Raghupathi"],
    2: [teacherLink.PR, "DAA", "Pushpak Raval"],
    3: [teacherLink.NPP, "SE", "Nidhi Patel"],
    4: [teacherLink.LIB, "LIB", ""],
    5: [teacherLink.LIB, "LIB", ""],
  },
  {
    0: [teacherLink.APK, "IOE", "Aashish Kumar"],
    1: [teacherLink.APK, "IOE", "Aashish Kumar"],
    2: [teacherLink.LIB, "LIB", ""],
    3: [teacherLink.LIB, "LIB", ""],
    4: [teacherLink.PR, "DAA", "Pushpak Raval"],
    5: [teacherLink.NPP, "SE", "Nidhi Patel"],
  },
  {
    0: [teacherLink.VK, "IOE", "Vishwas Kumar"],
    1: [teacherLink.VK, "IOE", "Vishwas Kumar"],
    2: [teacherLink.YP, "SE(LAB)", "Yoothika Patel"],
    3: [teacherLink.YP, "SE(LAB)", "Yoothika Patel"],
    4: [teacherLink.SBP, "FLAT", "Shyambabu Pandey"],
    5: [teacherLink.MDP, "DPP", "Monal Patel"],
  },
];



function updateTable() {
    let lectureNo = getClassNo();
    let day = getDay();
    console.log("running");

    const lecName = document.getElementById("lecName");
    const teacherName = document.getElementById("teacherName");
    const next = document.getElementById("next");
    const off = document.getElementById("off");
    const data = document.getElementById("data");
    if (lectureNo!=9 && lectureNo!=8 && day>=0&& lectur[day][lectureNo][1] != "LIB" && lectur[day][lectureNo][1] != "WT" ) 
    {
        lecName.innerText = lectur[day][lectureNo][1];
        teacherName.innerText = lectur[day][lectureNo][2];
        if (lectureNo+1<=5) {
            
            next.innerText = lectur[day][lectureNo+1][1];
        }else{
          next.innerText = "No Class";
        }
      }else{
      joinBtn.style.display = "none";
      table.style.display = "none";
      off.style.display = "block";
      if (day < 0) {
          data.innerText = "Chill! It's Sunday."
          return;
      }
      if (lectureNo == 9) {
          data.innerText = "Have a kitkat break";
          return;
      }
      if (lectureNo == 8) {
          data.innerText = `NO CLASS...Yay`
          return;
      }
      if (lectur[day][lectureNo][1] == "LIB") {
          data.innerText = "Its Library next class will be of " + lectur[day][lectureNo+1][1];
          return;
      } else {
          data.innerText = "You have a test now. \nThe next class will be of " + lectur[day][lectureNo+1][1];
          return;
      }
  }

}

function getLink() {
  let lectureNo = getClassNo();
  let day = getDay();
  location.replace(lectur[day][lectureNo][0]);
}
const joinBtn = document.getElementById("joinBtn");
const table = document.getElementById("table");
joinBtn.addEventListener("click", getLink);
onload = updateTable();
setInterval(updateTable,5000);