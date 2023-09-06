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

function loadEvents() {
  console.log("loadEvents")

  const mcg4genBtn = document.querySelector("[data-title='mcg4gen']");
  const mcg4genText = mcg4genBtn.querySelector('.genially-view-text span').textContent;

  if (mcg4genText==="for Genially") {
    //Cargar datos y eventos
    loadElementsPage()
  }

  if (mcg4genText==="Element") {
    //handleClick mcgElementBtn
    document.querySelector("[data-title='mcgElementBtn']").addEventListener("click", mcgElementBtn);
  }
}

function loadElementsPage() {
  console.log("loadElementsPage")
  
  //handleClick loginMCG
  document.querySelector("[data-title='mcgLogin']").addEventListener("click", loginMCG);
  //handleClick Elements
  const mcgElements = document.querySelectorAll("[data-title='mcgElement']");
  mcgElements.forEach(function(element) { element.addEventListener("click", getMCGElement);});
  //Ocultar nextMCG
  document.querySelector("[data-title='nextMCG']").classList.add("hiddenElement");
  //Visualizar stopMCG
  document.querySelector("[data-title='stopMCG']").classList.remove("hiddenElement");
}

/*function loginMCG() {
  alert("Login")
  //Visualizar nextMCG
  document.querySelector("[data-title='nextMCG']").classList.remove("hiddenElement");
  //Ocultar waitingMCG
  document.querySelector("[data-title='stopMCG']").classList.add("hiddenElement");
}*/

async function loginMCG(){
  if (!localStorage.getItem('studentLoggedInMCG')) {
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

            const mcgLoginBtn = document.querySelector("[data-title='mcgLogin']");
            mcgLoginBtn.querySelector('div span').textContent="Logout";
            mcgLoginBtn.querySelector('svg rect').style="fill: red;"
  
            //Visualizar nextMCG
            document.querySelector("[data-title='nextMCG']").classList.remove("hiddenElement");
            //Ocultar waitingMCG
            document.querySelector("[data-title='stopMCG']").classList.add("hiddenElement");
            
          } else {
            mensajeSWAL(data.message)
          }
        })
        .catch(function(error) {
          console.log('Error:', error);
        
          alert("Error de conexión")
        });
    }
  } else {
    localStorage.removeItem('studentLoggedInMCG')
    mensajeSWAL("Has cerrado la sesión")
    const mcgLoginBtn = document.querySelector("[data-title='mcgLogin']");
    mcgLoginBtn.querySelector('div span').textContent="Login";
    mcgLoginBtn.querySelector('svg rect').style="fill: rgb(238, 183, 43);"
    //Ocultar nextMCG
    document.querySelector("[data-title='nextMCG']").classList.add("hiddenElement");
    //Visualizar waitingMCG
    document.querySelector("[data-title='stopMCG']").classList.remove("hiddenElement");
  }
}

function getMCGElement(e) {
  const imageURL = e.target.querySelector("img").src
  alert("mcgElement: " +e.target.id + " " + imageURL)
}

function mcgElementBtn(e) {
  //const imageURL = e.target.querySelector("img").src
  //alert("mcgElement: " +e.target.id + " " + imageURL)
  alert("Elemento conseguido")
}

loadEvents()
