//Cargar sweetalert2.min.js
(function (d) { 
var js, id = "genially-embed-js", ref = d.getElementsByTagName("script")[0];
if (d.getElementById(id)) { return; }
js = d.createElement("script"); 
js.id = id; 
js.async = true; 
js.src = "https://myclassgame.github.io/mcgapi/sweetalert2.min.js"; 
ref.parentNode.insertBefore(js, ref); }
(document));

function prova(){
  alert("Cómo estás?")
}

function postBadge(e){
  fetch('https://juantoman-json-server.glitch.me/badges', {
    method: 'POST',
    body: JSON.stringify({
      name: "Badge1",
      description: "Badge1",
      "XP": 100
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
    alert(e.target.closest(".genially-animated-wrapper").id)
  });
}

function dataElement(e){
  const parser = new DOMParser();
  const h=e.currentTarget.parentNode.getAttribute('data-title')
  const htmlDoc = parser.parseFromString(h, 'text/html');
  const type = htmlDoc.querySelector('.mcgType').innerText;
  const XP = htmlDoc.querySelector('.mcgXP').innerText.substring(3).trim();
  console.log( type + ": " + XP )
  fetch('https://juantoman-json-server.glitch.me/badges', {
    method: 'POST',
    body: JSON.stringify({
      name: "Prueba",
      description: type,
      "XP": XP
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
    alert(e.target.closest(".genially-animated-wrapper").id)
  });
}

function showStudentData(studentCreds) {
    const student=studentCreds;    
    let id=student.studentCode;
    let url='https://www.myclassgame.es/studentData/'+id;
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if ( data.alias == studentCreds.alias) {
            localStorage.setItem('mcgStudentCreds', JSON.stringify(studentCreds));
            localStorage.setItem('mcgStudentData', JSON.stringify(data));
            Swal.fire({
                title: '<span style="color:yellow;">@</span><span style="color:red;">My</span><span style="color:blue;">Class</span><span style="color:lime;">Game</span>',
                background: '#268bd2',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Logout',
                cancelButtonColor: '#0f0',
                imageUrl: 'https://www.myclassgame.es/images/@mcgnb.png',
                imageWidth: 75,
                imageHeight: 75,
                imageAlt: '@MyClassGame',
                html:
                    '<div class="mcgStudentData">' +
                    '<h2>' + data.studentName + '</h2>' +
                    '<h4> ('+ data.alias + ') </h4>' +
                    '<h4 class="mcgData">' + data.XP + ' XP</h4>' +
                    '<h4 class="mcgData">' + data.HP + ' HP</h4>' +
                    '<h4 class="mcgData">' + data.coins + ' Monedas</h4>' +
                    '<h4 class="mcgData">Nivel: ' + data.level + '</h4>' +
                    '</div>',
                focusConfirm: false
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.setItem('mcgStudentCreds', '');
                }
            })
        } else {
            Swal.fire({
                icon: 'warning',
                html:
                    '<div class="mcgStudentData">' +
                    '<h2>Alias o Código incorrectos</h2>' +
                    '</div>',
                background: '#268bd2',
                confirmButtonColor: '#d33',
            })
            localStorage.setItem('mcgStudentCreds', '');
        }
    })
    .catch((err) => console.log(err));
}

//Mensaje SweetAlert
async function SA() {
    if ( ! localStorage.getItem('mcgStudentCreds')) {
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
                '<input id="swal-input1" class="swal2-input" placeholder="Alias">' +
                '<input id="swal-input2" class="swal2-input" placeholder="StudentCode">',
            focusConfirm: false,
            preConfirm: () => {
                const student = {
                    alias: document.getElementById('swal-input1').value,
                    studentCode: document.getElementById('swal-input2').value
                }
                return student
            }
        })
        if (formValues) {
            showStudentData(formValues)
        }
    } else {
        showStudentData(JSON.parse(localStorage.getItem('mcgStudentCreds')))
    }
}

//Crear clase 
async function createClass() {
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
          '<input id="swal-input1" class="swal2-input" placeholder="Nombre clase">',
      focusConfirm: false,
      preConfirm: () => {
          const clase = {
              className: document.getElementById('swal-input1').value
          }
          return clase
      }
  })
  if (formValues) {
      console.log(formValues)
      // Objeto de datos que se enviará en la solicitud POST
      var data = formValues

      // Configurar opciones para la solicitud fetch POST
      var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      // Realizar la solicitud fetch POST
      fetch('https://genialmcg.glitch.me/classes', options)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data); // Manejar la respuesta recibida del servidor
        })
        .catch(function(error) {
          console.log('Error:', error);
        });
  }
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
          '<input id="swal-input2" class="swal2-input" placeholder="Password">',
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
    fetch('https://genialmcg.glitch.me/users', options)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data); // Manejar la respuesta recibida del servidor
        if(!data.status){
          document.querySelector("[data-title='usernameMCG'] .genially-view-text").innerHTML="<b style='color:blue'>"+userdata.username+"</b>";
          localStorage.setItem('userIdMCG',userdata.id);
        }
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
    document.getElementsByClassName("icon-close")[0].click()
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
          '<input id="swal-input2" class="swal2-input" placeholder="Password">',
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
        console.log(data); // Manejar la respuesta recibida del servidor
        if(!data.status){
          console.log("Credenciales válidas")
          document.querySelector("[data-title='usernameMCG'] .genially-view-text").innerHTML="<b style='color:blue'>"+userdata.username+"</b>";
          //document.querySelector("[data-title='loginMCG'] .genially-view-text").innerHTML="<b>LOGOUT</b>";
          localStorage.setItem('userIdMCG',userdata.id);
        }
      })
      .catch(function(error) {
        console.log('Error:', error);
        alert("Error de conexión")
      });
    document.getElementsByClassName("icon-close")[0].click()
  }
}

//Función para cargar los eventos MCG en Genially
function loadMCGEvents(){
  //registerMCG
  const registerButtons = document.querySelectorAll("[data-title='registerMCG']");
  registerButtons.forEach(function(element) { element.addEventListener("click", registerUser);});
  
  //loginMCG
  const loginButtons = document.querySelectorAll("[data-title='loginMCG']");
  loginButtons.forEach(function(element) { element.addEventListener("click", loginMCG);});
}
