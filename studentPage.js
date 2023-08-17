function loadStudentPage() {
  console.log('loadStudentPage');
  console.log(generarClaveAleatoria());

  let studentMCG = JSON.parse(localStorage.getItem('studentMCG'));
  
  const studentBtn = document.querySelector("[data-title='studentMCG']");
  //studentBtn.addEventListener("click", loadStudentMCG)
  studentBtn.querySelector('span span').textContent = studentMCG.studentName;
  studentBtn.querySelector('.color1').style.fill = studentMCG.color;
  studentBtn.id=studentMCG.studentId;
  const studentPoints=document.querySelectorAll("[data-title='studentPoints'] .sc-FNXRL .genially-view-text span")
  studentPoints[0].textContent = studentMCG.XP;
  studentPoints[1].textContent = studentMCG.HP;
  studentPoints[2].textContent = studentMCG.GP;
  studentPoints[3].textContent = studentMCG.AP;

  document.querySelector("[data-title='studentPoints']").addEventListener("click", studentPointsBtn)
                            
  //Ocultar waitingMCG
  document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");

}

async function studentPointsBtn() {
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
          '<input id="swal-input4" class="swal2-input" placeholder="AP">' ,
      focusConfirm: false,
      preConfirm: () => {
          const points = {
              XP: document.getElementById('swal-input1').value,
              HP: document.getElementById('swal-input2').value,
              GP: document.getElementById('swal-input3').value,
              AP: document.getElementById('swal-input4').value
          }
          return points
      }
  })
  if (formValues) {
    
    console.log(formValues)
    
    // Objeto de datos que se enviará en la solicitud POST
    var points = formValues

    //const studentMCG = JSON.parse(localStorage.getItem('studentMCG'));
    //console.log(studentMCG)

    const studentPoints=document.querySelectorAll("[data-title='studentPoints'] .sc-FNXRL .genially-view-text span")
    points.XP = parseInt(studentPoints[0].textContent) + Number.isInteger(points.XP) ? parseInt(points.XP) : 0;
    points.HP = parseInt(studentPoints[1].textContent) + Number.isInteger(points.HP) ? parseInt(points.HP) : 0;
    points.GP = parseInt(studentPoints[2].textContent) + Number.isInteger(points.GP) ? parseInt(points.GP) : 0;
    points.AP = parseInt(studentPoints[3].textContent) + Number.isInteger(points.AP) ? parseInt(points.AP) : 0;
    console.log(points)

    studentPoints[0].textContent = parseInt(points.XP)
    studentPoints[1].textContent = parseInt(points.HP)
    studentPoints[2].textContent = parseInt(points.GP)
    studentPoints[3].textContent = parseInt(points.AP)

    // Configurar opciones para la solicitud fetch GET
    var options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(points)
    };

    let studentMCG = JSON.parse(localStorage.getItem('studentMCG'));
    // Realizar la solicitud fetch PATCH
    fetch('https://genialmcg.glitch.me/students/' + studentMCG.id, options)
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
