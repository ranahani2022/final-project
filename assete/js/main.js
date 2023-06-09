
  let tasks = [
  {
    'title': 'قراءة كتاب',
    'date': '20/30/2040',
    'isDone': true
  },
  {
    'title': 'انهاء المشروع النهائي',
    'date': '4/10/2040',
    'isDone': false
  },
  {
    'title': 'حل التحدي',
    'date': '20/8/2040',
    'isDone': false
  },
  ]

  function getTasksFromStorage(){
      let retrievedTasks = JSON.parse(localStorage.getItem('tasks'))
      tasks = retrievedTasks ?? []
  }
  getTasksFromStorage()


  function fillTasksOnThePage(){
    document.getElementById('tasks').innerHTML = ''
    let index = 0
    for (task of tasks){

        var content =
        `
            <div class="task ${task.isDone ? 'done' : ''}">
                <div class="tasks_info">
                <h2>${task.title}</h2>
                <span>
                    <i class="fa-solid fa-calendar-days"></i>
                ${task.date}
                </span>
                </div>

                <div class="tasks_action">
                <button
                    class="circular"
                    style="background-color: rgb(114, 0, 0); color: #fff" onClick="deleteTask(${index})"
                >
                    <i class="ri-delete-bin-6-line"></i>
                </button>
                ${task.isDone ? `
                    <button
                    class="circular"
                    style="background-color: rgb(118, 0, 101); color: #fff" onClick="toggleTaskCompletion(${index})"
                    >
                        <i class="fa-solid fa-close"></i>
                    </button>
                ` : `
                    <button
                    class="circular"
                    style="background-color: rgb(0, 150, 30); color: #fff" onClick="toggleTaskCompletion(${index})"
                    >
                        <i class="fa-solid fa-check"></i>
                    </button>
                `}

                <button
                    class="circular"
                    style="background-color: rgba(0, 16, 197, 0.692); color: #fff" onClick= "editTask(${index})"
                >
                    <i class="fa-solid fa-pen"></i>
                </button>
                </div>
            </div>
        `
        document.getElementById('tasks').innerHTML += content
        index ++
    }
  }
  fillTasksOnThePage()

  document.getElementById('addBtn').addEventListener('click' , function(){
    let now = new Date()
    let date = now.getDate() + '/' + (now.getMonth()+1) + '/' + now.getFullYear() + ' | ' + now.getHours() + ':' + now.getMinutes()
    let taskName = prompt('الرجاء إدخال عنوان المهمه')

    let taskObj = {
      'title': taskName,
      'date': date,
      'isDone': false
    }
    tasks.push(taskObj)
    storTasks()
    fillTasksOnThePage()
  })

//  this delete
    function deleteTask(index){
        let task = tasks[index]
        let isConfirm = confirm('هل انت متأكد من حذف  ' + task.title)
        if (isConfirm )
        {
            tasks.splice(index, 1)
            storTasks()
            fillTasksOnThePage()
        }
    }

//  this edit
    function editTask (index) {
        let task = tasks[index]
        let newTaskTitle = prompt('الرجاء تحديد عنوان المهمه الجديد' , task.title)
        task.title = newTaskTitle
        storTasks()
        fillTasksOnThePage()
    }

    function toggleTaskCompletion (index) {
        let task = tasks[index]
        task.isDone = !task.isDone
        storTasks()
        fillTasksOnThePage()
    }


//  functions local storage

    function storTasks(){
        let tasksString = JSON.stringify(tasks)
        localStorage.setItem('tasks' , tasksString)
    }

    storTasks()


