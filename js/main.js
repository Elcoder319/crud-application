/* =============== Selector =============== */
let firstName = document.getElementById("firstName"),
  lastName = document.getElementById("lastName"),
  universityNumber = document.getElementById("universityNumber"),
  partName = document.getElementById("partName"),
  partNumber = document.getElementById("partNumber"),
  cumulativeAverage = document.getElementById("cumulativeAverage"),
  selectMenu = document.getElementById("selectMenu"),
  searchName = document.getElementById("searchName"),
  uniNumber = document.getElementById("uniNumber"),
  conditionSearch = document.getElementById("conditionSearch"),
  upload = document.querySelector(".upload"),
  btnSearch = document.querySelectorAll(".btn-search button"),
  search = document.querySelector(".search"),
  searchMood = "name";

// Get Search Mood
btnSearch.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id === "searchName") {
      searchMood = "name";
    } else if (btn.id === "partName") {
      searchMood = "Part Name";
    } else if (btn.id === "uniNumber") {
      searchMood = "University Number";
    }
    search.placeholder = `Search By ${searchMood}`;
    search.focus();
    search.value = "";
    showData();
  });
});

// Option
let tmp;
let mood = "create";
let dataPro;
if (localStorage.getItem("studentDetail")) {
  dataPro = JSON.parse(localStorage.getItem("studentDetail"));
} else {
  dataPro = [];
}

upload.addEventListener("click", addData);
/* functions */
function addData() {
  let newPro = {
    firstName: firstName.value.toLowerCase(),
    lastName: lastName.value,
    universityNumber: universityNumber.value,
    partName: partName.value,
    partNumber: partNumber.value,
    cumulativeAverage: cumulativeAverage.value,
    selectMenu: selectMenu.value,
  };
  if (
    firstName.value != "" &&
    lastName.value != "" &&
    universityNumber.value != "" &&
    partName.value != "" &&
    partNumber.value != "" &&
    cumulativeAverage.value != "" &&
    selectMenu.value != ""
  ) {
    showAlert("student Added", "success");
    if (mood === "create") {
      dataPro.push(newPro);
    } else {
      dataPro[tmp] = newPro;
      upload.innerHTML = `<i class="fas fa-download"></i>`;
      showAlert("student info Edit", "info");
      mood = "create";
    }
    checkField();
    clear();
  } else {
    checkField();
    showAlert("Please Type In All field", "info");
  }
  localStorage.setItem("studentDetail", JSON.stringify(dataPro));
  showData();
}
//  Show Alerts in application

function showAlert(message, className) {
  let div = document.createElement("div");
  div.className = `alert alert-${className} open fixed-top`;
  div.appendChild(document.createTextNode(message));
  document.body.appendChild(div);
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 2000);
}

/* Clear All filed from Data */

function clear() {
  firstName.value = "";
  lastName.value = "";
  universityNumber.value = "";
  partName.value = "";
  partNumber.value = "";
  cumulativeAverage.value = "";
}

/* Show Data function */
function showData() {
  let table = "";
  for (let i = 1; i < dataPro.length; i++) {
    table += `
        <tr>
     <td>${i}</td>
     <td>${dataPro[i].firstName}</td>
     <td>${dataPro[i].lastName}</td>
     <td>${dataPro[i].universityNumber}</td>
     <td>${dataPro[i].partName}</td>
     <td>${dataPro[i].partNumber}</td>
     <td>${dataPro[i].cumulativeAverage}</td>
     <td>${dataPro[i].selectMenu}</td>
     <td ><button onclick="updateData(${i})" class="btn btn-success" title="Edit Data"><i class="fa fa-pencil-square"></i></button></td>
     <td onclick="deleteData(${i})"><button class="btn btn-danger" title="Delete Data"><i class="fa fa-trash"></i></button></td>
     </tr>
     `;
  }
  document.getElementById("student-list").innerHTML = table;
}
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.studentDetail = JSON.stringify(dataPro);
  showAlert("Item Deleted", "success");
  showData();
}
showData();

/* Edit Data function */
function updateData(i) {
  firstName.value = dataPro[i].firstName;
  lastName.value = dataPro[i].lastName;
  universityNumber.value = dataPro[i].universityNumber;
  partName.value = dataPro[i].partName;
  partNumber.value = dataPro[i].partNumber;
  cumulativeAverage.value = dataPro[i].cumulativeAverage;
  selectMenu.value = dataPro[i].selectMenu;
  upload.innerHTML = `<i class="fa fa-pencil-square"></i>`;
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  showData();
  checkField();
}
// checked if all fileld not null

function checkField() {
  let inputs = document.getElementsByName("crud");
  inputs.forEach((inp) => {
    if (inp.value === "") {
      inp.classList.add("error-field");
    } else {
      inp.classList.remove("error-field");
    }
  });
}

// Search Data
function searchData(value) {
  let table = "";
  if (searchMood == "name") {
    for (let i = 1; i < dataPro.length; i++) {
      if (dataPro[i].firstName.includes(value).toLowerCase()) {
        table += `
              <tr>
           <td>${i}</td>
           <td>${dataPro[i].firstName}</td>
           <td>${dataPro[i].lastName}</td>
           <td>${dataPro[i].universityNumber}</td>
           <td>${dataPro[i].partName}</td>
           <td>${dataPro[i].partNumber}</td>
           <td>${dataPro[i].cumulativeAverage}</td>
           <td>${dataPro[i].selectMenu}</td>
           <td ><button onclick="updateData(${i})" class="btn btn-success"><i class="fa fa-pencil-square"></i></button></td>
           <td onclick="deleteData(${i})"><button class="btn btn-danger"><i class="fa fa-trash"></i></button></td>
           </tr>
           `;
      }
    }
  } else if (searchMood === "Part Name") {
    for (let i = 1; i < dataPro.length; i++) {
      if (dataPro[i].partName.includes(value)) {
        table += `
          <tr>
       <td>${i}</td>
       <td>${dataPro[i].firstName}</td>
       <td>${dataPro[i].lastName}</td>
       <td>${dataPro[i].universityNumber}</td>
       <td>${dataPro[i].partName}</td>
       <td>${dataPro[i].partNumber}</td>
       <td>${dataPro[i].cumulativeAverage}</td>
       <td>${dataPro[i].selectMenu}</td>
       <td ><button onclick="updateData(${i})" class="btn btn-success"><i class="fa fa-pencil-square"></i></button></td>
       <td onclick="deleteData(${i})"><button class="btn btn-danger"><i class="fa fa-trash"></i></button></td>
       </tr>
       `;
      }
    }
  } else {
    for (let i = 1; i < dataPro.length; i++) {
      if (dataPro[i].universityNumber.includes(value)) {
        table += `
          <tr>
       <td>${i}</td>
       <td>${dataPro[i].firstName}</td>
       <td>${dataPro[i].lastName}</td>
       <td>${dataPro[i].universityNumber}</td>
       <td>${dataPro[i].partName}</td>
       <td>${dataPro[i].partNumber}</td>
       <td>${dataPro[i].cumulativeAverage}</td>
       <td>${dataPro[i].selectMenu}</td>
       <td ><button onclick="updateData(${i})" class="btn btn-success"><i class="fa fa-pencil-square"></i></button></td>
       <td onclick="deleteData(${i})"><button class="btn btn-danger"><i class="fa fa-trash"></i></button></td>
       </tr>
       `;
      }
    }
  }
  document.getElementById("student-list").innerHTML = table;
}
showData();