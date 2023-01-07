inputBox = document.getElementById('inputBox');
addBtn = document.getElementById('addBtn');

task_count = 0;

inputBox.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        addTaskFunc();
    }
})

function doneTask(task, done) {
    var selDoneTask = document.getElementById(task.id);
    var selCheckBtn = document.getElementById(done.id);

    if (selCheckBtn.checked === true) {
        selDoneTask.style.textDecoration = 'line-through';
    }
    else {
        selDoneTask.style.textDecoration = 'none';
    }
}

function editTask(task, edit) {
    var editBtnText = document.getElementById(edit.id);
    var selEditTask = document.getElementById(task.id);

    selEditTask.addEventListener('keydown', function(event){
        if(event.keyCode===13){
            if (editBtnText.innerText === "Edit") {
                selEditTask.style.color = '#FFEB3B';
                selEditTask.focus();
                selEditTask.style.pointerEvents = 'all';
                editBtnText.innerText = "Save";
            }
            else {
                selEditTask.style.pointerEvents = 'none';
                selEditTask.style.color = 'white';
                editBtnText.innerText = "Edit";
                selEditTask.blur();
            }
        }
    })

    if (editBtnText.innerText === "Edit") {
        selEditTask.style.color = '#FFEB3B';
        selEditTask.focus();
        selEditTask.style.pointerEvents = 'all';
        editBtnText.innerText = "Save";
    }
    else {
        selEditTask.style.pointerEvents = 'none';
        selEditTask.style.color = 'white';
        editBtnText.innerText = "Edit";
    }
}

function delTask(task) {
    todoList = document.getElementById('todo-list');
    var delTask = document.getElementById(task.id);
    todoList.removeChild(delTask);
}

function addTaskFunc() {
    if (inputBox.value === "") {
        alert("Please Enter your Task");
    }
    else {
        todoList = document.getElementById('todo-list');

        task_count = task_count + 1;

        var div = document.createElement('div');
        div.className = "task-box";
        div.id = `task${task_count}`;

        var inputCheck = document.createElement('input');
        inputCheck.type = "checkbox";
        inputCheck.id = `checkbox${task_count}`;
        inputCheck.className = "checkBox";
        div.appendChild(inputCheck);

        var inputText = document.createElement('input');
        inputText.type = "text";
        inputText.id = `t${task_count}`;
        inputText.className = "inputTaskBox";
        inputText.value = inputBox.value;
        div.appendChild(inputText);

        var editBtn = document.createElement('button');
        editBtn.id = `e${task_count}`;
        editBtn.className = "editBtn";
        editBtn.setAttribute('onclick', `editTask(${inputText.id}, ${editBtn.id})`);
        var editTextNode = document.createTextNode('Edit');
        editBtn.appendChild(editTextNode);
        div.appendChild(editBtn);

        var delBtn = document.createElement('button');
        delBtn.id = `d${task_count}`;
        delBtn.className = "delBtn";
        delBtn.setAttribute('onclick', `delTask(${div.id})`);
        var delTextNode = document.createTextNode('Delete');
        delBtn.appendChild(delTextNode);
        div.appendChild(delBtn);

        inputCheck.setAttribute('onclick', `doneTask(${inputText.id}, ${inputCheck.id})`);

        todoList.appendChild(div);

        inputBox.value = "";
        inputBox.focus();
    }
}

addBtn.addEventListener('click', addTaskFunc);