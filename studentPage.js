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
      const studentPoints=document.querySelectorAll("[data-title='studentPoints'] .sc-FNXRL .genially-view-text span")
      studentPoints[0].textContent = student.XP;
      studentPoints[1].textContent = student.HP;
      studentPoints[2].textContent = student.GP;
      studentPoints[3].textContent = student.AP;

      document.querySelector("[data-title='studentPoints']").addEventListener("click", studentPointsBtn)
                                
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
    
    })
    .catch(function(error) {
      console.log('Error:', error);
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
    });
}

function studentPointsBtn() {
  alert("Dar puntos");
}
