
const submitBtnEL=document.querySelector('.add-task-btn');
const taskNameEl=document.querySelector('.task-name');
const taskDateEl=document.querySelector('.task-date');
const taskCategoryEl=document.querySelector('.task-category');
const userNameEl=document.querySelector('.user-name');
const countTaskEl=document.querySelector('.taskcount');
let userName=localStorage.getItem('username')||'';
userNameEl.value=userName;

// initialize the list with data from localstorge if any 
let todoList=JSON.parse(localStorage.getItem('todos'))|| [];

let currentTab="All";
//Display task stored in localstorage on load
displayTask();
// For setting username in welcome screen
userNameEl.addEventListener('change',(e)=>{
    userName=e.target.value;
    if(userName)
        userName=userName+" !!";
    localStorage.setItem('username',userName);
    userNameEl.value=userName;
});

//For adding task on submit
submitBtnEL.addEventListener('click',(e)=>{
    e.preventDefault();
    todoNew={
        content:taskNameEl.value,
        dueDate:taskDateEl.value,
        category:taskCategoryEl.value,
        taskDone:false,
        createdAt:new Date().getTime(),
    };
    todoList.push(todoNew);
    localStorage.setItem('todos',JSON.stringify(todoList));
    //reset input fields
    taskNameEl.value='';
    taskDateEl.value='';
    taskCategoryEl.value='';
    //show data after adding new task
    displayTask();
    updateCount();

});

//Function to show the todo tasks according to the selected criteria 

function displayTask(){

    //add the task by creating new elements 
    const showTodoEl=document.querySelector('.show-todo');
    showTodoEl.innerHTML='';

    todoList.forEach(element => {
        const divP=document.createElement('div');
        divP.classList.add('show-task-item');
        const label=document.createElement('label');
        const labelDiv=document.createElement('div');
        labelDiv.classList.add('task-mark');
        const checkbox=document.createElement('input'); //
        checkbox.type='checkbox';
        const img=document.createElement('img');
        img.src="./images/circle-white.svg";
        label.appendChild(labelDiv);
        labelDiv.appendChild(checkbox);
        checkbox.checked=element.taskDone;
        labelDiv.appendChild(img);
        divP.appendChild(label);

        const div=document.createElement('div');
        div.classList.add('show-task-data');
        const divOne=document.createElement('div');
        divOne.classList.add('task-content');
        const input=document.createElement('input');
        input.type='text';
        input.value=element.content;
        input.setAttribute('readonly',true);
        
        let divTwo=document.createElement('div');
        let spanOne=document.createElement('span');
        spanOne.classList.add('show-task-date');
        spanOne.innerHTML=element.dueDate;
        let spanTwo=document.createElement('span');
        spanTwo.classList.add('show-task-category');
        spanTwo.innerHTML=element.category;
        div.appendChild(divOne);
        div.appendChild(divTwo);
        divOne.appendChild(input);
        divTwo.appendChild(spanOne);
        divTwo.appendChild(spanTwo);
        divP.appendChild(div);

        divTwo=document.createElement('div');
        divTwo.classList.add('show-task-control');
        spanOne=document.createElement('span');
        spanOne.classList.add('edit-task')
        spanTwo=document.createElement('span');
        spanTwo.classList.add('delete-task');
        const editTask=document.createElement('button'); //
        editTask.type='submit';
        editTask.innerHTML='Edit';
        const deleteTask=document.createElement('button');
        deleteTask.type='submit';   //
        deleteTask.innerHTML='Delete';
        divP.appendChild(divTwo);
        divTwo.appendChild(spanOne);
        divTwo.appendChild(spanTwo);
        spanOne.appendChild(editTask);
        spanTwo.appendChild(deleteTask);

        if(element.taskDone){
            divP.classList.add('bg-low')
            input.classList.add('strike');
            img.classList.add('bg-red');
        }else{
            divP.classList.remove('bg-low')
            input.classList.remove('strike');
            img.classList.remove('bg-red');
        }

        //Based on selected tab from sidebar the task will be shown
        //currentTab holds the selected tab value
        if(currentTab=='All'){
            divP.classList.remove('hide');
        }
        else if(currentTab=='Today'){
            today=new Date().getDate();
            elDate=new Date(element.dueDate).getDate();
            if(today==elDate){
                divP.classList.remove('hide');
            }else{
                divP.classList.add('hide');
            }

        }else if(currentTab=='Tomorrow'){
            tomorrow=new Date(+new Date() +86400000); 
            tomorrow=tomorrow.getDate();
            elDate=new Date(element.dueDate).getDate();
            if(tomorrow==elDate){
                divP.classList.remove('hide');
            }else{
                divP.classList.add('hide');
            }
        }
        else{
            if(element.category==currentTab ){
                divP.classList.remove('hide');
            }else{
                divP.classList.add('hide');
            }
        } 
        
        showTodoEl.appendChild(divP);

        //checkbox event when task is done 
        checkbox.addEventListener('change',(e)=>{
            element.taskDone=e.target.checked;
            localStorage.setItem('todos',JSON.stringify(todoList));
            displayTask();

        });
        // edit event to edit and save the task
        editTask.addEventListener('click',(e)=>{
            input.removeAttribute('readonly');
            editTask.innerHTML='Save';
            input.focus();
            editTask.addEventListener('click',(e)=>{
                editTask.innerHTML='Edit';
                input.setAttribute('readonly',true);
                element.content=input.value;
                localStorage.setItem('todos',JSON.stringify(todoList));
                this.removeEventListener('click',arguments.callee,false);
                displayTask();

            });
        });
        //delete event to delete the task
        deleteTask.addEventListener('click',(e)=>{
            todoList = todoList.filter(t => t != element);
            localStorage.setItem('todos', JSON.stringify(todoList));
            displayTask();
            updateCount();
        });

        
        


    });
    

}