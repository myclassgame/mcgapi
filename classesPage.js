//Función para cargar los eventos de la página de clases
async function loadClassesPage(){
  
  //newclassMCG
  document.querySelector("[data-title='newclassMCG']").addEventListener("click", newclassMCG);
  
  //Ocultar waitingMCG
  document.querySelector("[data-title='waitingMCG']").classList.add("hiddenElement");   
    
  //Visualizar usernameMCG
  document.querySelector("[data-title='usernameMCG']").classList.remove("hiddenElement");
  
  //Ocultar classMCG
  document.querySelector("[data-title='classMCG']").classList.add("hiddenElement"); 

  let userMCG = JSON.parse(window.localStorage.getItem("userMCG"));
  
  document.querySelector("[data-title='usernameMCG'] .genially-view-text").innerHTML="<b style='color:blue'>"+userMCG.username+"</b>";
  
  //Cargar classes
  setTimeout(loadClassesMCG, 3000)

  //Ocultar myclassesMCG
  document.querySelector("[data-title='myclassesMCG']").classList.add("hiddenElement");

  //Visualizar lcg
  //document.querySelector("[data-title='lcg']").classList.remove("hiddenElement");
    
}

//Cargar clases
async function loadClassesMCG() {
  //Ocultar lcg
  //document.querySelector("[data-title='lcg']").classList.add("hiddenElement"); 
  
  //Datos userMCG
  let userMCG = JSON.parse(window.localStorage.getItem("userMCG"));
  let userId=userMCG.userId;
  
  //Visualizar waitingMCG
  document.querySelector("[data-title='waitingMCG']").classList.remove("hiddenElement");
  
  // Realizar la solicitud fetch POST
  fetch('https://genialmcg.glitch.me/classes/?userId='+userId)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data); // Manejar la respuesta recibida del servidor
      const classMCG = document.querySelector("[data-title='classMCG']");
      
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
        const classBtn = classMCG.cloneNode(true);
        classBtn.addEventListener("click", loadClassMCG)
        classBtn.querySelector('span span').textContent = element.className;
        classBtn.querySelector('.color1').style.fill = element.color;
        classBtn.id=element.classId;
        classBtn.classList.remove("hiddenElement");
        classBtn.setAttribute("data-title", "classButton"); 
        //Inserta la copia del objeto en el div de destino
        myclassesMCG.appendChild(classBtn);
      })

      postitMCG.appendChild(myclassesMCG);
      //Visualizar postitMCG
      /*postitMCG.style.opacity=1;
      postitMCG.style.visibility="visible";
      postitMCG.style.transition="all 0s ease-in-out";*/

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

//Cargar clase
function loadClassMCG(e){
  console.log(e.currentTarget.id);
  localStorage.setItem('classIdMCG',e.currentTarget.id);
  document.querySelector("[data-title='myclassMCG']").click();
  document.querySelector("#myclassesMCG").remove();
}

//Crear clase 
async function newclassMCG() {
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
      
      //Datos userMCG
      let userMCG = JSON.parse(window.localStorage.getItem("userMCG"));
      data.userId=userMCG.userId;
    
      //Crear classId
      data.classId = generarClaveAleatoria()
      data.color = randomPastelColor()

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
          // Crea una copia del objeto
          const classBtn = document.querySelector("[data-title='classMCG']")
          const nclassBtn = classBtn.cloneNode(true);
          nclassBtn.addEventListener("click", loadClassMCG)
          nclassBtn.querySelector('span span').textContent = data.className;
          nclassBtn.querySelector('.color1').style.fill = data.color;
          nclassBtn.id=data.classId;
          nclassBtn.setAttribute("data-title", "classButton"); 
          //Inserta la copia del objeto en el div de destino
          document.querySelector("#myclassesMCG").appendChild(nclassBtn);
        })
        .catch(function(error) {
          console.log('Error:', error);
        });
  }
}