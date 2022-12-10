// sidebar: show those task only which the user selects from the sidebar 

//tabEls: to change the color of the selected option
let tabEls=document.querySelectorAll('.task-tag'); 
//tagName:add eventHandler on all the category of the sidebar
let tagName=['.Today','.Tomorrow','.All','.Personal','.Work','.Food','.Health'];
tagName.forEach(tag => {   
    
    document.querySelector(tag).addEventListener('click',(e)=>{
        //remove highlight from all the tab 
        tabEls.forEach(element => {
            element.classList.remove('tab-select');
        });
        // add highlight to the selected tab only
        document.querySelector(tag).nextElementSibling.classList.add('tab-select');

        currentTab=tag.substring(1);
        //refresh the tasks to be shown
        displayTask();
        
    });

});
 
updateCount();
//update count of task in sidebar

function updateCount(){
    count=JSON.parse(localStorage.getItem('todos')).length;
    countTaskEl.innerHTML=`
        <h1>Total Tasks: ${count}</h1>
    `;

}