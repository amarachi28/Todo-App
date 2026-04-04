/*git add . 
git commit -m "describe what you changed"
git push
*/


document.addEventListener('DOMContentLoaded', () => {

   const taskInput = document.getElementById('task-input');
   const addTaskBtn = document.getElementById('add-task-btn');
   const taskList = document.getElementById('task-list');
   const emptyImage = document.querySelector('.empty-image');
   const todosContainer = document.querySelector('.todos-container');
   const progressbar = document.getElementById('progress');
   const progressNumber = document.getElementById('numbers');
/*
The getElementById variables live inside DOMContentLoaded — meaning they only run after the page is fully loaded. That's their relationship.
Also, These variables only run AFTER page loads — that's the connection
Then these variables get their OWN event listeners that let's tem perform a task.

*/

const toggleEmptyState = () => {
  emptyImage.style.display = taskList.children.length === 0? 'block' : 'none';//this removes empty image when there is a task list 
  todosContainer.style.width = taskList.children.length > 0 ?'100%' : '50%' //this ensures the container resizes based on the content.
}

const updateProgress = (checkCompletion = true) => {
  const totalTask = taskList.children.length;
  const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

  progressbar.style.width = totalTask ? `${(completedTasks / totalTask) * 100}%` : '0%';
progressNumber.textContent = `${completedTasks} / ${totalTask}`;
if(checkCompletion && totalTask > 0 && completedTasks === totalTask)  {
    Confetti();

}

};

const saveTaskToLocalStorage = () => {
const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
text: li.querySelector('span').textContent,
completed: li.querySelector('.checkbox').checked
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
};


const loadTaskFromLocalStorage = () => {
  const savedTasks = JSON.parse(localStorage.getItem('task')) || [];
  savedTasks.forEach(({ text, completed }) => addTask(text, completed, false));
  toggleEmptyState();
  updateProgress();
};

const addTask = (text, complete = false, checkCompletion = true) => {
  const taskText = text || taskInput.value.trim();
    if(!taskText) {
        return; 
    }

//designing the 'li' i.e. list items in the task list:



  const li = document.createElement('li');
  li.innerHTML = `
  <input type="checkbox" class="checkbox" ${complete ? 'checked' : ''}>
  <span>${taskText}</span>
  <div class="task-buttons">
  <button class= "edit-btn"><i class="fa-solid fa-pen">
  </i></button>
  <button class= "delete-btn"><i class="fa-solid fa-trash">
  </i></button>
  
  </div>
  `;


  const checkbox = li.querySelector('.checkbox');//this ensures proper functionality because it finds the check box and ensures that the checkbox isn't checked before editing. 
  const editBtn = li.querySelector('.edit-btn');

    if (complete){
      li.classList.add('completed');
      editBtn.disabled = true;
      editBtn.style.opacity = '0.5';
      editBtn.style.pointerEvents = 'none';

    }//this allows use check if a task has been completed

    checkbox.addEventListener('change', () => {
       const isChecked = checkbox.checked;
       li.classList.toggle('completed', isChecked);
       editBtn.disabled = isChecked;
       editBtn.style.opacity = isChecked ? '0.5' : '1';
       editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
       updateProgress();
       saveTaskToLocalStorage();

    });



  editBtn.addEventListener('click', () => {
  if(!checkbox.checked){
    taskInput.value = li.querySelector('span').textContent;
    li.remove();//This allows for if a task is removed, the existing list item will be removed using li.remove
    toggleEmptyState();
    updateProgress(false);
    saveTaskToLocalStorage();


  }

});

li.querySelector('.delete-btn').addEventListener('click', () => {
  li.remove();
  toggleEmptyState();
  updateProgress();
  saveTaskToLocalStorage();

});




  //li.textContent = taskText;
  taskList.appendChild(li);
  taskInput.value = '';
  toggleEmptyState();
  updateProgress(checkCompletion);
  saveTaskToLocalStorage();


};
//used to add a new function to the todo list
//MORE EXPLANATION OF THE CODE BELOW:

/**
 addTask is a variable & arrow function that has parameter called 'event' .  Once a user adds a task, the addTask function runs. Inside  addTask body,  there is a variable called taskText. 
taskText is a variable that holds/stores a copy of whatever the user typed, after trimming the spaces..trim() specifically removes spaces from the beginning and end of the text — not spaces in the middle.The if statement is what does the validation — not taskTex
The if statement that is attached to the taskText that will return/stop  if the user does not input a task text. However, if the user input a task text, javascript generate the html using all the codes in "const li":
 */


addTaskBtn.addEventListener('click',  () => addTask());
taskInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter'){
  e.preventDefault();
  addTask();
  }
});

loadTaskFromLocalStorage();
});

const Confetti = () => {

  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}