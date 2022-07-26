import { task_records } from './taskArray.js' //Importa el arreglo desde archivo externo
const html = document.querySelector('.table_body') //Establece donde se agregará el contenido en el html
const numberReg = document.querySelector('.number_reg') //Es Donde se insertara numero de registros en el html
const numberOk = document.querySelector('.number_ok') //Es Donde se insertara numero de registros realizados en el html
let template = '' //Acá se agrega en cada ciclo del bucle la información que será incorporada en el HTML
let maxId = 1 //Establece el id de nueva tarea
const btn = document.querySelector('button') //Este es el boton para agregar tarea
let statusCheck = '' //Esta es la variable que agrega el tick a Checkbox

/***********************Cuenta los elementos que se encuentran OK**********************************/
const cuentaOK = function () {
  numberOk.innerHTML = task_records.filter(({ state }) => state === true).length
}
/***********************Aca se confecciona el elemento que sera impreso en el HTML**********************************/
const printHtml = function (idPrint, taskPrint, statusPrint) {
  template += `<tr>
  <td class="task_id task_list">${idPrint}</td>
  <td class="task_task task_list">${taskPrint}</td>
  <td class="task_ok task_list">
    <input class = "check_ok" id="c${idPrint}" type="checkbox" id="cbox" value="True" ${statusPrint}/>
  </td>
  <td class="title_del task_list">
    <img  id="${idPrint}"
      src="assets/img/x_small.png"
      alt="Letra X de color blanco dentro de un circulo de color rojo"
    />
  </td>
</tr>`
}
/**************************************Carga la informacion del arreglo en el HTML************************************/
const dataLoad = function (idSearch, taskSearch, stateSearch) {
  statusCheck = ''
  //Revisa si la tarea esta realizada la cuenta y agrega elemento al template para que aparezca tickeada
  if (stateSearch === true) {
    statusCheck = 'checked'
    //En caso contrario no agrega nada en el template
  } else statusCheck === ''
  //Esto Obtiene el valor maximo del id y se suma 1 para tener el id del proximo registro
  if (idSearch >= maxId) {
    maxId = idSearch + 1
  }
  printHtml(idSearch, taskSearch, statusCheck)
}
/*************************************************Recorre los elementos***********************************************/
const setview = function () {
  //Valida que existan elementos en el array antes de leerlo
  //if (task_records.length > 0) {
  //Resetea los parametros para iniciar cargar nuevos datos
  template = ''
  maxId = 1 //Resetea el maxid en 1 para que verifique posteriormente el valor mayor de id disponible
  //Comienza el for
  for (let task of task_records) {
    //Recopila la información en cada ciclo
    dataLoad(task.id, task.task, task.state)
  }
  //Se Pasa la información recopilada en el bucle (fuera de este) al HTML
  html.innerHTML = template
  numberReg.innerHTML = task_records.length //Cuenta los elementos en el array
  //Cuenta los elementos que se encuentran OK
  cuentaOK()
}
/*************************************************Agregar nueva tarea***********************************************/
const enterTask = function () {
  //Selecciona el input de la nueva tarea
  const newTask = document.querySelector('.new_task')
  //Validar que no este vacia
  if (newTask.value === '') {
    alert('Debes ingresar la tarea')
    return
    //Ingresa nueva tarea
  } else {
    task_records.push({ id: maxId, task: newTask.value, state: 'FALSE' })
    //Resetea el elemento tarea
    newTask.value = ''
    setview()
    listenTask()
    listenTask_ok()
  }
}
/**************************************************Boton Agregar tarea**********************************************/
btn.addEventListener('click', () => {
  enterTask()
})
/************************************************Buscar y escuchar Boton para eliminar*******************************************/
const listenTask = function () {
  document.querySelectorAll('img').forEach((item) => {
    item.addEventListener('click', (e) => {
      delete_task(e.target.id)
    })
  })
}
/*************************************Buscar y escuchar checkbox para marcar que se realizo*******************************************/
const listenTask_ok = function () {
  document.querySelectorAll('.check_ok').forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target.checked) {
        task_records[Number(e.target.id.slice(1) - 1)].state = true
      } else {
        task_records[Number(e.target.id.slice(1) - 1)].state = false
      }
      console.log(task_records)
      cuentaOK()
    })
  })
}
/************************************************Elimina registros*******************************************/
function delete_task(id_listen) {
  const indexTask = task_records.findIndex(
    (tasItems) => tasItems.id == id_listen
  )
  task_records.splice(indexTask, 1)
  setview()
  listenTask()
  listenTask_ok()
}
setview()
listenTask()
listenTask_ok()
