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

//Cargar estudiantes
async function loadStudentsMCG() {
  //Ocultar lcg
  //document.querySelector("[data-title='lcg']").classList.add("hiddenElement");
  
  //Datos userMCG
  let userMCG = JSON.parse(window.localStorage.getItem("userMCG"));
  let userId=userMCG.userId;
  const classIdMCG = window.localStorage.getItem("classIdMCG");
  
  //Visualizar waitingMCG
  document.querySelector("[data-title='waitingMCG']").classList.remove("hiddenElement");
  
  // Realizar la solicitud fetch POST
  fetch('https://genialmcg.glitch.me/students/?classId='+classIdMCG)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data); // Manejar la respuesta recibida del servidor
      const newStudentBtn = document.querySelector("[data-title='studentMCG']");
      
      const postitMCG = document.querySelector("[data-title='myclassesMCG']");
      /*postitMCG.style.overflowY="auto";
      postitMCG.style.overflowX="hidden";
      postitMCG.style.pointerEvents="auto";
      
      postitMCG.style.opacity=0;
      postitMCG.style.visibility="hidden";
      postitMCG.style.transition="all 5s ease-in-out";*/
      
      const myclassesMCG = document.createElement('div');
      myclassesMCG.id = 'myclassesMCG';
      myclassesMCG.classList.add('myclassesMCG');
         
      data.forEach(function(element) {
        // Crea una copia del objeto
        const studentBtn = newStudentBtn.cloneNode(true);
        studentBtn.addEventListener("click", loadStudentMCG)
        studentBtn.querySelector('span span').textContent = element.studentName;
        studentBtn.querySelector('.color1').style.fill = element.color;
        studentBtn.id=element.studentId;
        studentBtn.classList.remove("hiddenElement");
        studentBtn.setAttribute("data-title", "classButton"); 
        //Inserta la copia del objeto en el div de destino
        myclassesMCG.appendChild(studentBtn);
      })

      postitMCG.appendChild(myclassesMCG);
      //Visualizar postitMCG
      /*postitMCG.style.opacity=1;
      postitMCG.style.visibility="visible";
      postitMCG.style.transition="all 0s ease-in-out";*/

      //Ocultar studentMCG
      //document.querySelector("[data-title='studentMCG']").classList.add("hiddenElement"); 

       //Visualizar myclassesMCG
      document.querySelector("[data-title='myclassesMCG']").classList.remove("hiddenElement");
      
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
    
    })
    .catch(function(error) {
      console.log('Error:', error);
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
    });
}

//Cargar estudiante
function loadStudentMCG(e){
  console.log(e.currentTarget.id);
  localStorage.setItem('studentIdMCG',e.currentTarget.id);
  document.querySelector("[data-title='myclassMCG']").click();
  document.querySelector("#myclassesMCG").remove();
}
