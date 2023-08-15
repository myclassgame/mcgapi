//Función mensaje SWAL
function mensajeSWAL(mensaje){
  Swal.fire({
      title: '<span style="color:yellow;">@</span><span style="color:red;">My</span><span style="color:blue;">Class</span><span style="color:lime;">Game</span>',
      background: '#268bd2',
      showCloseButton: true,
      confirmButtonColor: '#0f0',
      confirmButtonText: 'OK',
      imageUrl: 'https://www.myclassgame.es/images/@mcgnb.png',
      imageWidth: 75,
      imageHeight: 75,
      imageAlt: '@MyClassGame',
      html:
          '<h2 style="color: white">' + mensaje + '</h2>',
  })
}

//Función para registrar usuario en @MyClassGame
async function registerUser() {
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
          '<input id="swal-input1" class="swal2-input" placeholder="Username">' +
          '<input type="password" id="swal-input2" class="swal2-input" placeholder="Password">',
      focusConfirm: false,
      preConfirm: () => {
          const user = {
              username: document.getElementById('swal-input1').value,
              password: document.getElementById('swal-input2').value
          }
          return user
      }
  })
  if (formValues) {
    
    console.log(formValues)
    
    //Visualizar waitingMCG
    document.querySelector("[data-title='waitingMCG']").classList.remove("hiddenElement");
    
    // Objeto de datos que se enviará en la solicitud POST
    var userdata = formValues
    
    //Crear userId
    userdata.userId = generarClaveAleatoria()

    // Configurar opciones para la solicitud fetch POST
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userdata)
    };

    // Realizar la solicitud fetch POST
    fetch('https://genialmcg.glitch.me/users', options)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data); // Manejar la respuesta recibida del servidor
      
        //Oculat waitingMCG
        document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
      
        if(!data.status){
          //Visualizar logoutMCG
          document.querySelector("[data-title='logoutMCG']").classList.remove("hiddenElement");  
          
          //Visualizar usernameMCG
          document.querySelector("[data-title='usernameMCG']").classList.remove("hiddenElement");
          
          //Visualizar newclassMCG
          //document.querySelector("[data-title='newclassMCG']").classList.remove("hiddenElement");

          //Visualizar classesMCG
          document.querySelector("[data-title='classesMCG']").classList.remove("hiddenElement");
      
          //Visualizar adventuresMCG
          document.querySelector("[data-title='adventuresMCG']").classList.remove("hiddenElement");

          //Visualizar myclassesMCG
          //document.querySelector("[data-title='myclassesMCG']").classList.remove("hiddenElement");
          
          document.querySelector("[data-title='usernameMCG'] .genially-view-text").innerHTML="<b style='color:blue'>"+userdata.username+"</b>";
          
          //Ocultar registerMCG
          document.querySelector("[data-title='registerMCG']").classList.add("hiddenElement");  
          
          //Ocultar loginMCG
          document.querySelector("[data-title='loginMCG']").classList.add("hiddenElement");
          
          const userMCG = {
            'userId':userdata.userId,
            'username':userdata.username
          }
          
          localStorage.setItem('userMCG',JSON.stringify(userMCG));
          
          //Cargar classes
          //loadClassesMCG()
        } else {
          mensajeSWAL(data.error)
        }
      })
      .catch(function(error) {
        console.log('Error:', error);
      
        //Oculat waitingMCG
        document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
      });
    //document.getElementsByClassName("icon-close")[0].click()
  }
}

//Función para hacer login en @MyClassGame
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
          '<input id="swal-input1" class="swal2-input" placeholder="Username">' +
          '<input type="password" id="swal-input2" class="swal2-input" placeholder="Password">',
      focusConfirm: false,
      preConfirm: () => {
          const user = {
              username: document.getElementById('swal-input1').value,
              password: document.getElementById('swal-input2').value
          }
          return user
      }
  })
  if (formValues) {
    
    //console.log(formValues)
    
    //Visualizar waitingMCG
    document.querySelector("[data-title='waitingMCG']").classList.remove("hiddenElement");
    
    // Objeto de datos que se enviará en la solicitud POST
    var userdata = formValues

    // Configurar opciones para la solicitud fetch POST
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userdata)
    };

    // Realizar la solicitud fetch POST
    fetch('https://genialmcg.glitch.me/login', options)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        //console.log(data); // Manejar la respuesta recibida del servidor
           
        if(!data.status){
          console.log("Credenciales válidas")
          
          //Visualizar logoutMCG
          document.querySelector("[data-title='logoutMCG']").classList.remove("hiddenElement");  
          
          //Visualizar usernameMCG
          document.querySelector("[data-title='usernameMCG']").classList.remove("hiddenElement");
          
          document.querySelector("[data-title='usernameMCG'] .genially-view-text").innerHTML="<b style='color:blue'>"+userdata.username+"</b>";
          //document.querySelector("#userId").textContent=userdata.userId;

          //Visualizar classesMCG
          document.querySelector("[data-title='classesMCG']").classList.remove("hiddenElement");
      
          //Visualizar adventuresMCG
          document.querySelector("[data-title='adventuresMCG']").classList.remove("hiddenElement");
          
          //Ocultar registerMCG
          document.querySelector("[data-title='registerMCG']").classList.add("hiddenElement");  
          
          //Ocultar loginMCG
          document.querySelector("[data-title='loginMCG']").classList.add("hiddenElement");
          
          const userMCG = {
            'userId':data.user.userId,
            'username':data.user.username
          }
          
          localStorage.setItem('userMCG',JSON.stringify(userMCG));

          //Ocultar waitingMCG
          document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
        } else {
          mensajeSWAL(data.error)
        }
      })
      .catch(function(error) {
        console.log('Error:', error);
      
        //Ocultar waitingMCG
        document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");
      
        alert("Error de conexión")
      });
  }
}

//Función de logout
function logoutMCG(){
  //Borrar 'userMCG'
  localStorage.removeItem('userMCG');
  //Ocultar logoutMCG
  document.querySelector("[data-title='logoutMCG']").classList.add("hiddenElement");
  //Ocultar classesMCG
  document.querySelector("[data-title='classesMCG']").classList.add("hiddenElement");
  //Ocultar adventuresMCG
  document.querySelector("[data-title='adventuresMCG']").classList.add("hiddenElement");
  //Ocultar usernameMCG
  document.querySelector("[data-title='usernameMCG']").classList.add("hiddenElement");
  //Visualizar registerMCG
  document.querySelector("[data-title='registerMCG']").classList.remove("hiddenElement");  
  //Visualizar loginMCG
  document.querySelector("[data-title='loginMCG']").classList.remove("hiddenElement");
}



function loadTeacherPage() {
  console.log("loadEventsTeachers")
   
  //registerMCG
  const registerButtons = document.querySelectorAll("[data-title='registerMCG']");
  registerButtons.forEach(function(element) { element.addEventListener("click", registerUser);});
  
  //loginMCG
  const loginButtons = document.querySelectorAll("[data-title='loginMCG']");
  loginButtons.forEach(function(element) { element.addEventListener("click", loginMCG);});
  
  //logoutMCG
  const logoutButtons = document.querySelectorAll("[data-title='logoutMCG']");
  logoutButtons.forEach(function(element) { element.addEventListener("click", logoutMCG);});

  //Ocultar waitingMCG
  document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");

  //Ocultar #loadEventsTeachers
  //document.querySelector("#loadEventsTeachers").style.display="none";

   if (localStorage.getItem('userMCG')){

    //Visualizar logoutMCG
    document.querySelector("[data-title='logoutMCG']").classList.remove("hiddenElement");  
    
    //Visualizar usernameMCG
    document.querySelector("[data-title='usernameMCG']").classList.remove("hiddenElement");

    let userMCG = JSON.parse(window.localStorage.getItem("userMCG"));
    
    document.querySelector("[data-title='usernameMCG'] .genially-view-text").innerHTML="<b style='color:blue'>"+userMCG.username+"</b>";

    //Visualizar classesMCG
    document.querySelector("[data-title='classesMCG']").classList.remove("hiddenElement");

    //Visualizar adventuresMCG
    document.querySelector("[data-title='adventuresMCG']").classList.remove("hiddenElement");
    
    //Ocultar registerMCG
    document.querySelector("[data-title='registerMCG']").classList.add("hiddenElement");  
    
    //Ocultar loginMCG
    document.querySelector("[data-title='loginMCG']").classList.add("hiddenElement");
    
  } else {
    
    //Ocultar logoutMCG
    document.querySelector("[data-title='logoutMCG']").classList.add("hiddenElement"); 

    //Ocultar usernameMCG
    document.querySelector("[data-title='usernameMCG']").classList.add("hiddenElement");

    //Ocultar classesMCG
    document.querySelector("[data-title='classesMCG']").classList.add("hiddenElement");

    //Ocultar adventuresMCG
    document.querySelector("[data-title='adventuresMCG']").classList.add("hiddenElement");

    //Visualizar registerMCG
    document.querySelector("[data-title='registerMCG']").classList.remove("hiddenElement");  

    //Visualizar loginMCG
    document.querySelector("[data-title='loginMCG']").classList.remove("hiddenElement");
    
  }
}
