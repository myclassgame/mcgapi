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
      
      const studentBtn = document.querySelector("[data-title='studentMCG']");
      //studentBtn.addEventListener("click", loadStudentMCG)
      studentBtn.querySelector('span span').textContent = data.studentName;
      studentBtn.querySelector('.color1').style.fill = data.color;
      studentBtn.id=data.studentId;
      
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
    
    })
    .catch(function(error) {
      console.log('Error:', error);
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
    });
}
