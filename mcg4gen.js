//Cargar ficheros externos
(function (d) { 
var js, id = "genially-embed-js", ref = d.getElementsByTagName("script")[0];
if (d.getElementById(id)) { return; }
var files = [ "sweetalert2.min.js" ]
files.forEach(file =>   {
  js = d.createElement("script"); 
  js.id = id; 
  js.async = true; 
  js.src = "https://myclassgame.github.io/mcgapi/"+file; 
  ref.parentNode.insertBefore(js, ref);
})}
(document));

//Función mensaje SWAL
function mensajeSWAL(mensaje){
  Swal.fire({
      title: '<span style="color:yellow;">@</span><span style="color:red;">My</span><span style="color:blue;">Class</span><span style="color:lime;">Game</span>',
      background: '#268bd2',
      showCloseButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK',
      imageUrl: 'https://www.myclassgame.es/images/@mcgnb.png',
      imageWidth: 75,
      imageHeight: 75,
      imageAlt: '@MyClassGame',
      html:
          '<h2 style="color: white">' + mensaje + '</h2>',
  })
}

function loadEvents(page) {
  console.log("loadEvents")

  const mcg4genBtn = document.querySelector("[data-title='mcg4gen']");
  const mcg4genText = mcgAPIBtn.querySelector('.genially-view-text span').textContent;

  if (mcg4genText==="Elements") {
    //Cargar datos y eventos de elementsPage.js
    loadElementsPage()
  }
}

function loadElementsPage() {
  console.log("loadElementsPage")
  //Ocultar nextMCG
  document.querySelector("[data-title='nextMCG']").classList.add("hiddenElement");
  //Visualizar waitingMCG
  document.querySelector("[data-title='stopMCG']").classList.remove("hiddenElement");
  //handleClick loginMCG
  const mcg4gen = document.querySelector("[data-title='mcg4gen']").addEventListener("click", loginMCG);
}

/*function loginMCG() {
  alert("Login")
  //Visualizar nextMCG
  document.querySelector("[data-title='nextMCG']").classList.remove("hiddenElement");
  //Ocultar waitingMCG
  document.querySelector("[data-title='stopMCG']").classList.add("hiddenElement");
}*/

async function loginMCG(){
  const { value: formValues } = await Swal.fire({
      title: '<span style="color:yellow;">@</span><span style="color:red;">My</span><span style="color:blue;">Class</span><span style="color:lime;">Game</span>',
      background: '#268bd2',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#0f0',
      confirmButtonText: 'Login',
      cancelButtonColor: '#d33',
      imageUrl: 'https://www.myclassgame.es/images/@mcgnb.png',
      imageWidth: 75,
      imageHeight: 75,
      imageAlt: '@MyClassGame',
      html:
          '<input id="swal-input1" class="swal2-input" placeholder="StudentName">' +
          '<input type="password" id="swal-input2" class="swal2-input" placeholder="Code">',
      focusConfirm: false,
      preConfirm: () => {
        //Datos URL
          let url = window.location.href;
          let parts = url.split('/');
          let genId = parts[parts.length - 1];
          const studentLogin = {
              studentName: document.getElementById('swal-input1').value,
              studentId: document.getElementById('swal-input2').value,
              genId: genId
          }
          return studentLogin
      }
  })
  if (formValues) {
    
    console.log(formValues)
    
    // Objeto de datos que se enviará en la solicitud POST
    var studentLogin = formValues

    // Configurar opciones para la solicitud fetch POST
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentLogin)
    };

    // Realizar la solicitud fetch POST
    fetch('https://genialmcg.glitch.me/studentLogin', options)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        //console.log(data); // Manejar la respuesta recibida del servidor
           
        if(!data.status){
          console.log("Credenciales válidas")
          
          const studentLoggedInMCG = {
            'userId':data.user.userId,
            'studentName':data.user.studentName,
            'studentId': data.user.studentId
          }
          
          localStorage.setItem('studentLoggedInMCG',JSON.stringify(studentLoggedInMCG));
          
        } else {
          mensajeSWAL(data.message)
        }
      })
      .catch(function(error) {
        console.log('Error:', error);
      
        alert("Error de conexión")
      });
  }
}

loadElementsPage()
