const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList  = document.querySelector('.collection');
const clearBtn  = document.querySelector('.clear-tasks');
const filter    = document.querySelector('#filter');


loadEventListeners();

 function loadEventListeners(){
 
    document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
     form.addEventListener('submit', addTask);
     taskList.addEventListener('click', removeTask);
     filter.addEventListener('keyup', filterTasks);
     clearBtn.addEventListener('click', removeAllTasks);
 }


  function  getTasks(){
  
    let tasks;

    if (localStorage.getItem("tasks")===null) {
      
       tasks = [];
    }
    else{

      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task){

      const li = document.createElement('li');

  // adding class to li element 

  li.className = 'collection-item';

  // appending text child to the li element 

  li.appendChild(document.createTextNode(task));

  // creating link element 

  const link = document.createElement('a');

  // adding class to the link element 

  link.className  = 'delete-item secondary-content';

  // adding textelement to the link tag 

  link.innerHTML = '<i class="fa fa-remove"></i>';

  // adding link to li 

  li.appendChild(link);

  // now adding li to ul 

  taskList.appendChild(li);



    });


  }

 function addTask(e){


  if (taskInput.value=='') {
    
     window.alert('Form can not be submitted empty');
     return false;
  }


  // creating li element 

  const li = document.createElement('li');

  // adding class to li element 

  li.className = 'collection-item';

  // appending text child to the li element 

  li.appendChild(document.createTextNode(taskInput.value));

  // creating link element 

  const link = document.createElement('a');

  // adding class to the link element 

  link.className  = 'delete-item secondary-content';

  // adding textelement to the link tag 

  link.innerHTML = '<i class="fa fa-remove"></i>';

  // adding link to li 

  li.appendChild(link);

  // now adding li to ul 

  taskList.appendChild(li);

  
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value= '';


  e.preventDefault();


 }



 function storeTaskInLocalStorage(task){

  let tasks;

  if (localStorage.getItem("tasks")===null) {
    
     tasks = [];
  }
  else{

    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

 }




 function removeTask(e){

 if (confirm('Are You sure?')) {
   
      if(e.target.parentElement.classList.contains('delete-item')){

     e.target.parentElement.parentElement.remove();


     removeTaskFromLocalStorage(e.target.parentElement.parentElement);
   }
 }

 }

 function removeTaskFromLocalStorage(taskItem){
  
  let tasks;

  if (localStorage.getItem("tasks")===null) {

    tasks = [];
     
  }
  else{

     tasks = JSON.parse(localStorage.getItem("tasks"));

  }


  tasks.forEach(function(task,index){

     if (taskItem.textContent===task) {
       
       tasks.splice(index, 1);
    }

     localStorage.setItem("tasks", JSON.stringify(tasks));


  });

    


 }


 function filterTasks(e){

       const text = e.target.value.toLowerCase();

        document.querySelectorAll('.collection-item').forEach(function(task){

        const item = task.firstChild.textContent;

        if((item.toLowerCase().indexOf(text) != -1)){


          task.style.display = 'block';

        }
        else{

          task.style.display = 'none';
        }



        });

   
        

 }





function removeAllTasks(){

 
if (confirm('Are You Sure?')) {
  
    taskList.innerHTML = '';


 clearAllTasksFromLocalStorage();


}

}



function clearAllTasksFromLocalStorage(){


  localStorage.clear();
}