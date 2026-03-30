/*git add . 
git commit -m "describe what you changed"
git push
*/


document.addEventListener('DOMContentLoaded', () => {

   const taskInput = document.getElementById('task-input');
   const addTaskBtn = document.getElementById('add-task-btn');
   const taskList = document.getElementById('task-list');
   const emptyImage = document.querySelector('.empty-image');
/*
The getElementById variables live inside DOMContentLoaded — meaning they only run after the page is fully loaded. That's their relationship.
Also, These variables only run AFTER page loads — that's the connection
Then these variables get their OWN event listeners that let's tem perform a task.

*/

const toggleEmptyState = () => {
  emptyImage.style.display = taskList.children.length === 0? 'block' : 'none';//this removes empty image when there is a task list 
}

const addTask = (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if(!taskText) {
        return; 
    }

//designing the 'li' i.e. list items in the task list:



  const li = document.createElement('li');
  li.innerHTML = `
  <input type="checkbox" class="checkbox">
  <span>${taskText}</span>
  <div class="task-buttons">
  <button class= "edit-btn"><i class="fa-solid fa-pen">
  </i></button>
  <button class= "delete-btn"><i class="fa-solid fa-trash">
  </i></button>
  
  </div>
  `;


  //li.textContent = taskText;
  taskList.appendChild(li);
  taskInput.value = '';
  toggleEmptyState();


};
//used to add a new function to the todo list
//MORE EXPLANATION OF THE CODE BELOW:

/**
 addTask is a variable & arrow function that has parameter called 'event' .  Once a user adds a task, the addTask function runs. Inside  addTask body,  there is a variable called taskText. 
taskText is a variable that holds/stores a copy of whatever the user typed, after trimming the spaces..trim() specifically removes spaces from the beginning and end of the text — not spaces in the middle.The if statement is what does the validation — not taskTex
The if statement that is attached to the taskText that will return/stop  if the user does not input a task text. However, if the user input a task text, javascript generate the html using all the codes in "const li":
 */


addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter'){
    addTask(e);
  }
});

});