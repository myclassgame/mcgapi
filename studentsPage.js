function loadStudentsPage() {
  console.log("loadStudentsPage")

  //newStudentsMCG
  const registerButtons = document.querySelector("[data-title='newStudentsMCG']");
  registerButtons.addEventListener("click", newStudents);

  //printCodes
  const printCodesBtn = document.querySelector("[data-title='printCodes']");
  printCodesBtn.addEventListener("click", printCodes);

  //pdfCodes
  /*const pdfCodesBtn = document.querySelector("[data-title='pdfCodes']");
  pdfCodesBtn.addEventListener("click", pdfCodes);*/

  //Ocultar studentMCG
  document.querySelector("[data-title='studentMCG']").classList.add("hiddenElement"); 

  //Cargar estudiantes
  setTimeout(loadStudentsMCG, 3000)

  //Ocultar containerMCG
  document.querySelector("[data-title='containerMCG']").classList.add("hiddenElement");
}

//Cargar estudiantes
async function loadStudentsMCG() {
  //Ocultar lcg
  //document.querySelector("[data-title='lcg']").classList.add("hiddenElement");
  
  //Datos userMCG
  let userMCG = JSON.parse(window.localStorage.getItem("userMCG"));
  let userId=userMCG.userId;
  const classMCG = JSON.parse(localStorage.getItem('classMCG'));
  const classIdMCG = classMCG.classId;
  
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
      
      const postitMCG = document.querySelector("[data-title='containerMCG']");
      
      const containerMCG = document.createElement('div');
      containerMCG.id = 'containerMCG';
      containerMCG.classList.add('containerMCG');
         
      data.forEach(function(element) {
        // Crea una copia del objeto
        const studentBtn = newStudentBtn.cloneNode(true);
        studentBtn.addEventListener("click", loadStudentMCG)
        const spans = studentBtn.querySelectorAll('div > span')
        spans[0].textContent = element.studentName;
        spans[1].textContent = element.studentId;
        studentBtn.querySelector('.color1').style.fill = element.color;
        studentBtn.id=element.studentId;
        if (element.image) {
          studentBtn.querySelector('img').src = element.image;
        }
        studentBtn.classList.remove("hiddenElement");
        studentBtn.setAttribute("data-title", "classButton"); 
        //Inserta la copia del objeto en el div de destino
        containerMCG.appendChild(studentBtn);
      })

      postitMCG.appendChild(containerMCG);

       //Visualizar myclassesMCG
      document.querySelector("[data-title='containerMCG']").classList.remove("hiddenElement");
      
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
      let student = JSON.stringify(data[0])
      localStorage.setItem('studentMCG',student);  
      console.log(localStorage.getItem('studentMCG'))
                                
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");

      document.querySelector("[data-title='myclassMCG']").click();
      document.querySelector("#containerMCG").remove();
    })
    .catch(function(error) {
      console.log('Error:', error);
      //Ocultar waitingMCG
      document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
    });
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
      const postitMCG = document.querySelector("#containerMCG");
      
      //Datos localStorage
      const userMCG = JSON.parse(window.localStorage.getItem("userMCG"));
      const classMCG = JSON.parse(localStorage.getItem('classMCG'));
      const classIdMCG = classMCG.classId;
      
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
            
          })
          .catch(function(error) {
            console.log('Error:', error);
          });
      })
  }
}

function printCodes() {
    var printContents = document.getElementById('containerMCG').innerHTML;
    var newWindow = window.open('', '_blank');
    
    newWindow.document.open();
    newWindow.document.write('<html><head><title>Tarjetas Estudiantes @MyClassGame genially</title><link rel="stylesheet" href="https://myclassgame.github.io/mcgapi/stylesMCG.css"></head><body><div id="containerMCG">');
    newWindow.document.write(printContents);
    newWindow.document.write('</div></body></html>');
    newWindow.document.close();
    
    newWindow.onload = function() {
      newWindow.print();
      newWindow.close();
    };
}
