function loadStudentsPage() {
  console.log("loadStudentsPage")

  //newStudentsMCG
  const registerButtons = document.querySelector("[data-title='newStudentsMCG']");
  registerButtons.addEventListener("click", newStudents);

  //Ocultar studentMCG
  document.querySelector("[data-title='studentMCG']").classList.add("hiddenElement"); 

  //Cargar estudiantes
  setTimeout(loadStudentsMCG, 3000)

  //Ocultar myclassesMCG
  document.querySelector("[data-title='myclassesMCG']").classList.add("hiddenElement");
}
