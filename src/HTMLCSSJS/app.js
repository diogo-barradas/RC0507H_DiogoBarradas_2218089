(function() {
    'use strict';
    var lastId = 0;
    var presenteWrapper = document.getElementById("presente_lista");
    var btnSave = document.getElementById("presente_enviar");
    var removeIcon;
    var updateIcon;
    var presenteList;
  
    // Initialize presenteList 
    // Add event to save button
    // Render the list
  
    function init() {
  
      if (!!(window.localStorage.getItem('presenteList'))) {
        presenteList = JSON.parse(window.localStorage.getItem('presenteList'));
      } else {
        presenteList = [];
      }
      btnSave.addEventListener('click', saveTask);
      showList();
    }
  
    //End Init
  
    //CRUD task
  
    function showList() {
  
      if (!!presenteList.length) {
        getLastTaskId();
        for (var item in presenteList) {
          var task = presenteList[item];
          addTaskToList(task);
        }
        syncEvents();
      }
      
    }
  
    function saveTask(event) {
  
      var task = {
        taskId: lastId,
        PresenteNome: document.getElementById("presente_nome").value,
        PresenteAtual: document.getElementById("presente_dar").value,
        PresenteNivel: document.getElementById("presente_nivel").value
      };
      presenteList.push(task);
      syncTask();
      addTaskToList(task);
      syncEvents();
      lastId++;
    }
  
    function addTaskToList(task) {
  
      var removeIcon = document.createElement('span');
      var element = document.createElement('li');
      var updateIcon = document.createElement('span');
  
      removeIcon.innerHTML = "X";
      removeIcon.className = "remove_item clickeable";
      removeIcon.setAttribute("title", "Remove");
  
      updateIcon.innerHTML = "U";
      updateIcon.className = "update_icon clickeable";
      updateIcon.setAttribute("title", "Update");
  
  
      element.appendChild(removeIcon);
      element.appendChild(updateIcon);
      element.setAttribute("id", task.taskId);
      if(task.PresenteNivel == "Maroto")
      task.PresenteAtual = "Carvao";
      element.innerHTML += "Nome: " + task.PresenteNome + " | Presente: " + task.PresenteAtual + " | Comportamento: " + task.PresenteNivel;
      presenteWrapper.appendChild(element);
    }
  
    function updateTask(event) {
  
      var taskTag = event.currentTarget.parentNode;
      var taskId = taskTag.id;
      var taskToUpdate = findTask(taskId).task;
      var pos = findTask(taskId).pos;
      if (!!taskToUpdate) {
        //var des = prompt("Nome", taskToUpdate.PresenteNome); //Alterar o nome
        if(taskToUpdate.PresenteNivel == "Maroto")
        {
            alert("Meninos mal comportados nao recebem presentes!");
        }
        else
        {
        var presente_alterar = prompt("Presente", taskToUpdate.PresenteAtual); //Altera o presente
        if (presente_alterar === null)
        {
            return;
        }
        else if (presente_alterar === "")
        {
            return;
        }
        //taskToUpdate.PresenteNome = des;
        taskToUpdate.PresenteAtual = presente_alterar;
        presenteList[pos] = taskToUpdate;
        taskTag.lastChild.textContent = "Nome: " + taskToUpdate.PresenteNome + " | Presente: " + taskToUpdate.PresenteAtual  + " | Comportamento: " + taskToUpdate.PresenteNivel; //nao funfa
         }
        syncTask();
      }
    }
  
    function removeTask(event) {
  
      var taskToRemove = event.currentTarget.parentNode;
      var taskId = taskToRemove.id;
      presenteWrapper.removeChild(taskToRemove);
      presenteList.forEach(function(value, i) {
        if (value.taskId == taskId) {
          presenteList.splice(i, 1);
        }
      })
  
      syncTask();
    }
  
    // End CRUD
  
  
    //Common
  
    function syncTask() {
  
      window.localStorage.setItem('presenteList', JSON.stringify(presenteList));
      presenteList = JSON.parse(window.localStorage.getItem('presenteList'));
    }
  
    function getLastTaskId() {
      var lastTask = presenteList[presenteList.length - 1];
      lastId = lastTask.taskId + 1;
    }
  
    function syncEvents() {
  
      updateIcon = document.getElementsByClassName("update_icon");
      removeIcon = document.getElementsByClassName("remove_item");
      if (!!removeIcon.length) {
        for (var i = 0; i < removeIcon.length; i++) {
          removeIcon[i].addEventListener('click', removeTask);
        }
      }
      if (!!updateIcon.length) {
        for (var j = 0; j < updateIcon.length; j++) {
          updateIcon[j].addEventListener('click', updateTask);
        }
      }
    }
  
    function findTask(id) {
  
      var response = {
        task: '',
        pos: 0
      };
      presenteList.forEach(function(value, i) {
        if (value.taskId == id) {
          response.task = value;
          response.pos = i;
        }
      });
  
      return response;
    }
  
    //End Common
  
  
    init();
  
  
  })();