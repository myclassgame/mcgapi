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
    document.querySelector("[data-title='elementGot']").classList.add("hiddenElement");
    document.querySelector("[data-title='mcgElementBtn']").classList.add("hiddenElement");
    const mcgElementId = document.querySelector("[data-title='elementImg']").id
    const studentData = JSON.parse(localStorage.getItem('studentLoggedInMCG'))
    const url=`https://genialmcg.glitch.me/students/${studentData.sId}/badges?genId=${mcgElementId}`
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data); // Manejar la respuesta recibida del servidor
        if (data.length==0) {
          document.querySelector("[data-title='mcgElementBtn']").classList.remove("hiddenElement");
          document.querySelector("[data-title='elementGot']").classList.add("hiddenElement");
        } else {
          document.querySelector("[data-title='mcgElementBtn']").classList.add("hiddenElement");
          document.querySelector("[data-title='elementGot']").classList.remove("hiddenElement");
        }
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
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
  if (!localStorage.getItem('studentLoggedInMCG')) {
    //Ocultar nextMCG
    document.querySelector("[data-title='nextMCG']").classList.add("hiddenElement");
    //Visualizar stopMCG
    document.querySelector("[data-title='stopMCG']").classList.remove("hiddenElement");
  } else {
    const mcgLoginBtn = document.querySelector("[data-title='mcgLogin']");
    mcgLoginBtn.querySelector('div span').textContent="Logout";
    mcgLoginBtn.querySelector('svg rect').style="fill: red;"

    //Visualizar nextMCG
    document.querySelector("[data-title='nextMCG']").classList.remove("hiddenElement");
    //Ocultar waitingMCG
    document.querySelector("[data-title='stopMCG']").classList.add("hiddenElement");
  }
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
            
            const studentLoggedInMCG = data.user
            studentLoggedInMCG.sId = data.user.id
            console.log(studentLoggedInMCG)
            
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
  const mcgElement = document.querySelector("[data-title='elementImg']");
  //alert(mcgElement.id + " " + mcgElement.querySelector("img").src)
  const studentData = JSON.parse(localStorage.getItem('studentLoggedInMCG'))
  const elementPoints=document.querySelectorAll("[data-title='elementPoints'] .sc-FNXRL .genially-view-text span")
  const elementData = {
    genId : mcgElement.id,
    imgURL : mcgElement.querySelector("img").src,
    XP: elementPoints[0].textContent,
    HP: elementPoints[1].textContent, 
    GP: elementPoints[2].textContent,
    AP: elementPoints[3].textContent
  }
  console.log(studentData)
  console.log(elementData)
  // Configurar opciones para la solicitud fetch POST
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(elementData)
  };

  // Realizar la solicitud fetch POST
  const url=`https://genialmcg.glitch.me/students/${studentData.sId}/badges`
  fetch(url, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      //console.log(data); // Manejar la respuesta recibida del servidor
      //Sumar puntos
   
      let addPoints= {
        'XP':0,
        'HP':0,
        'GP':0,
        'AP':0,
      }
      
      addPoints.XP = parseInt(studentData.XP) + parseInt(elementData.XP);
      addPoints.HP = parseInt(studentData.HP) + parseInt(elementData.HP);
      addPoints.GP = parseInt(studentData.GP) + parseInt(elementData.GP);
      addPoints.AP = parseInt(studentData.AP) + parseInt(elementData.AP);
  
      // Configurar opciones para la solicitud fetch GET
      var options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addPoints)
      };

      console.log(addPoints)
      // Realizar la solicitud fetch PATCH
      fetch('https://genialmcg.glitch.me/students/' + studentData.sId, options)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data); // Manejar la respuesta recibida del servidor
        
          if(!data.status){
            console.log("OK");
            studentData.XP = addPoints.XP
            studentData.HP = addPoints.HP
            studentData.GP = addPoints.GP
            studentData.AP = addPoints.AP
            let student = JSON.stringify(studentData)
            localStorage.setItem('studentLoggedInMCG',student);  
          } else {
            console.log("notOK");
          }
        })
        .catch(function(error) {
          console.log('Error:', error);
        });
      
      document.querySelector("[data-title='mcgElementBtn']").classList.add("hiddenElement");
      document.querySelector("[data-title='elementGot']").classList.remove("hiddenElement");
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
}

loadEvents()
