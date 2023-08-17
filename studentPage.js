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
  const studentMCG = JSON.parse(localStorage.getItem('studentMCG'));
  console.log(studentMCG)
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
        <input type="number" min="0" max="23" value="14" />
          '<input id="swal-input1" class="swal2-input" placeholder="XP" type="number" min="-1000" max="1000" value="0">' +
          '<input id="swal-input2" class="swal2-input" placeholder="HP" type="number" min="-1000" max="1000" value="0">' +
          '<input id="swal-input3" class="swal2-input" placeholder="GP" type="number" min="-1000" max="1000" value="0">' +
          '<input id="swal-input4" class="swal2-input" placeholder="AP" type="number" min="-1000" max="1000" value="0">' ,
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
    
    //console.log(formValues)
    
    // Objeto de datos que se enviará en la solicitud POST
    var points = formValues
    console.log(points)

    const studentMCG2 = JSON.parse(localStorage.getItem('studentMCG'));
    console.log(studentMCG2)
    
    const studentPoints=document.querySelectorAll("[data-title='studentPoints'] .sc-FNXRL .genially-view-text span")
    let addPoints= {
      'XP':0,
      'HP':0,
      'GP':0,
      'AP':0,
    }
    
    addPoints.XP = parseInt(studentMCG2.XP) + parseInt(points.XP);
    addPoints.HP = parseInt(studentMCG2.HP) + parseInt(points.HP);
    addPoints.GP = parseInt(studentMCG2.GP) + parseInt(points.GP);
    addPoints.AP = parseInt(studentMCG2.AP) + parseInt(points.AP);
    console.log(addPoints)

    studentPoints[0].textContent = parseInt(addPoints.XP)
    studentPoints[1].textContent = parseInt(addPoints.HP)
    studentPoints[2].textContent = parseInt(addPoints.GP)
    studentPoints[3].textContent = parseInt(addPoints.AP)

    // Configurar opciones para la solicitud fetch GET
    var options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addPoints)
    };

    // Realizar la solicitud fetch PATCH
    fetch('https://genialmcg.glitch.me/students/' + studentMCG2.id, options)
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
