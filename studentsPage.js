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
  fetch('https://genialmcg.glitch.me/students/?studentId='+e.currentTarget.id)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data); // Manejar la respuesta recibida del servidor
      let student = data[0]
      localStorage.setItem('studentMCG',JSON.stringify(student));  
                                
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
    
    })
    .catch(function(error) {
      console.log('Error:', error);
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
    });
  
  document.querySelector("[data-title='myclassMCG']").click();
  document.querySelector("#myclassesMCG").remove();
}

async function newStudents() {
  const { value: formValues } = await Swal.fire({
      title: '<span style="color:yellow;">@</span><span style="color:red;">My</span><span style="color:blue;">Class</span><span style="color:lime;">Game</span>',
      background: '#268bd2',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#0f0',
      confirmButtonText: 'Crear',
      cancelButtonColor: '#d33',
      imageUrl: 'https://www.myclassgame.es/images/@mcgnb.png',
      imageWidth: 75,
      imageHeight: 75,
      imageAlt: '@MyClassGame',
      html:
          '<input id="swal-input1" class="swal2-input" placeholder="Nombres estudiantes (separar por ,)">',
      focusConfirm: false,
      preConfirm: () => {
          const students = document.getElementById('swal-input1').value;
          return students
      }
  })
  if (formValues) {
      console.log(formValues)
      // Objeto con los nombres de los estudiantes
      const studentList = formValues.split(',');
      const studentListSinEspacios = studentList.map(palabra => palabra.trim());
      const newStudentBtn = document.querySelector("[data-title='studentMCG']");
      const postitMCG = document.querySelector("#myclassesMCG");
      
      //Datos localStorage
      const userMCG = JSON.parse(window.localStorage.getItem("userMCG"));
      const classIdMCG = window.localStorage.getItem("classIdMCG");
      
      studentListSinEspacios.forEach(nombre =>   {
    
        //Crear studentId
        const student = {
          studentId : generarClaveAleatoria(),
          studentName: nombre,
          userId : userMCG.userId,
          classId : classIdMCG,
          color : randomPastelColor(),
          XP:0,
          HP:10,
          GP:0,
          AP:0
        }
  
        console.log(student)
  
        // Configurar opciones para la solicitud fetch POST
        let options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(student)
        };
  
        // Realizar la solicitud fetch POST
        fetch('https://genialmcg.glitch.me/students', options)
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            console.log(data); // Manejar la respuesta recibida del servidor
            
            // Crea una copia del objeto
            const studentBtn = newStudentBtn.cloneNode(true);
            studentBtn.addEventListener("click", loadStudentMCG)
            studentBtn.querySelector('span span').textContent = student.studentName;
            studentBtn.querySelector('.color1').style.fill = student.color;
            studentBtn.id=student.studentId;
            studentBtn.classList.remove("hiddenElement");
            studentBtn.setAttribute("data-title", "classButton"); 
            //Inserta la copia del objeto en el div de destino
            postitMCG.appendChild(studentBtn);
            
            /*
            // Crea una copia del objeto
            const newclassBtn = document.querySelector("[data-title='newclassMCG']")
            const classBtn = newclassBtn.cloneNode(true);
            classBtn.addEventListener("click", loadClassMCG)
            classBtn.querySelector('span span').textContent = data.className;
            classBtn.querySelector('.color1').style.fill = data.color;
            classBtn.id=data.classId;
            classBtn.setAttribute("data-title", "classButton"); 
            //Inserta la copia del objeto en el div de destino
            document.querySelector("#myclassesMCG").appendChild(classBtn);
            */
          })
          .catch(function(error) {
            console.log('Error:', error);
          });
      })
  }
}
