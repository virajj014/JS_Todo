
    const showaddtask = () => {
        // alert("hello");
        document.querySelector('.blurbgaddtask').style.display = "block";
    }

    const addtaskerror = document.querySelector('#addtaskerror');
    const addtasktoloaclstorage = () => {
        // alert("add task btn clicked");
        const taskname = document.querySelector('#addtaskname').value;
        // alert(taskname);

        if (taskname.length == 0) {
            addtaskerror.style.display = "block"
        }
        else {
            addtaskerror.style.display = "none"
            let tasks = localStorage.getItem("tasks");
            if (tasks == null) {
                tasks = []
            }
            else {
                tasks = JSON.parse(tasks);
            }


            const task = {
                taskname: taskname,
                taskid: Date.now()
            }

            // alert(task.taskid + " " + task.taskname);
            tasks.push(task);
            // console.log(tasks);
            localStorage.setItem("tasks", JSON.stringify(tasks))
            showalltasks();
            document.querySelector('.blurbgaddtask').style.display = "none";
        }
    }


    const showalltasks = () => {
        // alert("show all tasks");
        let alltaskscontainer = document.querySelector('#alltaskscontainer');
        let tasksfrom_ls = localStorage.getItem("tasks");
        // console.log(tasksfrom_ls);

        if (tasksfrom_ls == null) {
            tasksfrom_ls = [];
        }

        else {
            tasksfrom_ls = JSON.parse(tasksfrom_ls);
        }

        // console.log(tasksfrom_ls);


        let taskhtmlcode = '';

        tasksfrom_ls.forEach((task, index) => {
            console.log(task.taskname);

            taskhtmlcode += `
        <div class="task">
            <p class="task-text">
                <span class="task-sno">${index + 1}</span>
                <span class="task-name">${task.taskname}</span>
            </p>


            <div class="task-edit-delete">
                <buton class="icon" onclick="deletetask('${task.taskid}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>

                </buton>
                <buton class="icon" onclick="showedittask('${task.taskid}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </buton>
            </div>
        </div>
        `
        });

        alltaskscontainer.innerHTML = taskhtmlcode;

    }



    const deletetask = (taskid) => {
        // alert("delete task " + taskid);
        let tasksfrom_ls = localStorage.getItem('tasks');

        if (tasksfrom_ls == null) {
            tasksfrom_ls = [];
        }
        else {
            tasksfrom_ls = JSON.parse(tasksfrom_ls);
        }

        tasksfrom_ls.forEach((task, index) => {
            if (task.taskid == taskid) {
                tasksfrom_ls.splice(index, 1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasksfrom_ls));
        showalltasks();
    }

    const showedittask = (taskid) => {


        let edittaskcont = document.querySelector('#edittaskcont');
        edittaskcont.innerHTML = `
        <h2>Edit Task</h2>
            <label>Enter Task Name</label>
            <input type="text" id="edittaskname" placeholder="Please Enter a Task Name" >

            <button id="edittaskbtn" onclick="edittask('${taskid}')">Add Task</button>
        `
        // alert("edit task "+ taskid);
        document.querySelector('.blurbgedittask').style.display = "block";
        // let edittaskname = document.querySelector('#edittaskname').value;
        let tasksfrom_ls = localStorage.getItem('tasks');

        if (tasksfrom_ls == null) {
            tasksfrom_ls = [];
        }
        else {
            tasksfrom_ls = JSON.parse(tasksfrom_ls);
        }

        // console.log(tasksfrom_ls);

        tasksfrom_ls.forEach((task) => {
            if (task.taskid == taskid) {
                // console.log(task);
                document.querySelector('#edittaskname').value = task.taskname;
            }
        })
    }


    const edittask = (taskid) => {
        // alert("edit task " + taskid);
        let edittaskname = document.querySelector('#edittaskname').value;


        let tasksfrom_ls = localStorage.getItem('tasks');

        if (tasksfrom_ls == null) {
            tasksfrom_ls = [];
        }
        else {
            tasksfrom_ls = JSON.parse(tasksfrom_ls);
        }

        // console.log(tasksfrom_ls);

        tasksfrom_ls.forEach((task) => {
            if (task.taskid == taskid) {
                // console.log(task);
                task.taskname = edittaskname;
            }
        })

        // console.log(tasksfrom_ls);
        localStorage.setItem('tasks', JSON.stringify(tasksfrom_ls));
        showalltasks();
        document.querySelector('.blurbgedittask').style.display = "none";

    }



    addEventListener('load', showalltasks)
