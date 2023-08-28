//Cargar ficheros externos
(function (d) { 
var js, id = "genially-embed-js", ref = d.getElementsByTagName("script")[0];
if (d.getElementById(id)) { return; }
var files = [ "sweetalert2.min.js", "studentPage.js", "studentsPage.js", "functionsMCG.js", "classesPage.js", "teacherPage.js" ]
files.forEach(file =>   {
  js = d.createElement("script"); 
  js.id = id; 
  js.async = true; 
  js.src = "https://myclassgame.github.io/mcgapi/"+file; 
  ref.parentNode.insertBefore(js, ref);
})}
(document));

function loadEvents(page) {
  console.log("loadEvents")

  const mcgAPIBtn = document.querySelector("[data-title='mcgAPI']");
  const mcgAPIText = mcgAPIBtn.querySelector('.genially-view-text span').textContent;
  console.log(mcgAPIText)

  //Ocultar loadEvents
  //document.querySelector("#loadEvents").classList.add("hiddenElement"); 

  if (mcgAPIText==="Student") {
    //Cargar datos y eventos de studentPage.js
    loadStudentPage()
  }
  
  if (mcgAPIText==="Students") {
    //Cargar datos y eventos de studentsPage.js
    loadStudentsPage()
  }

  if (mcgAPIText==="Classes") {
    //Cargar datos y eventos de classesPage.js
    loadClassesPage()
  }

  if (mcgAPIText==="Teacher") {
    //Cargar datos y eventos de teachersPage.js
    loadTeacherPage()
  }
  
  //Cargar datos dels Estudiante
  //setTimeout(loadStudentData, 3000)
}
