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
  console.log("Dar puntos");
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
          '<input id="swal-input1" class="swal2-input" placeholder="XP">' +
          '<input id="swal-input2" class="swal2-input" placeholder="HP">' +
          '<input id="swal-input3" class="swal2-input" placeholder="GP">' +
          '<input id="swal-input4" class="swal2-input" placeholder="AP">' + ,
      focusConfirm: false,
      preConfirm: () => {
          const points = {
              xp: document.getElementById('swal-input1').value,
              hp: document.getElementById('swal-input2').value,
              gp: document.getElementById('swal-input3').value,
              ap: document.getElementById('swal-input4').value
          }
          return points
      }
  })
  if (formValues) {
    
    console.log(formValues)
    
    // Objeto de datos que se enviará en la solicitud POST
    var points = formValues
    
    //Recuperar studentId   
    points.studentId = localStorage.getItem('studentId');

    // Configurar opciones para la solicitud fetch GET
    var options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(points)
    };

    // Realizar la solicitud fetch POST
    fetch('https://genialmcg.glitch.me/users', options)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data); // Manejar la respuesta recibida del servidor
      
        if(!data.status){
          console.log("OK");
        } else {
          console.log("notOK");
        }
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
  }
}
