function loadStudentPage() {
  console.log('loadStudentPage');
  console.log(generarClaveAleatoria());
  const studentIdMCG = window.localStorage.getItem("studentIdMCG");
  fetch('https://genialmcg.glitch.me/students/?studentId='+studentIdMCG)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data); // Manejar la respuesta recibida del servidor
      let student = data[0]
      const studentBtn = document.querySelector("[data-title='studentMCG']");
      //studentBtn.addEventListener("click", loadStudentMCG)
      studentBtn.querySelector('span span').textContent = student.studentName;
      studentBtn.querySelector('.color1').style.fill = student.color;
      studentBtn.id=student.studentId;
      
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
    
    })
    .catch(function(error) {
      console.log('Error:', error);
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
    });
}
