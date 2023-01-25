// get form data on button click
// store data in a global array
// create a function to display all the data from the arrayto our entry list


let taskList = []
let badlist = []

const hrsPerWeek = 24*7

document.querySelector("#form-submit").addEventListener("click",
(e) =>{
    e.preventDefault()
    const task = document.querySelector(".task-input").value
    const hr = document.querySelector(".hrs-input").value


    const obj = {
        task,
        hr,
    }

    const TotalAllocatedHrs = totalTaskHours()
    if(TotalAllocatedHrs + hr > hrsPerWeek) {
        return alert("Sorry, you do not have enough time to add more tasks this week")
        
    }

    taskList.push(obj)
    displayTasks()
    totalTaskHours()

})

const displayTasks = () =>{
    let str = ""

    taskList.map((item, i) =>{
        str += `
            <tr>
            <td>${i + 1}</td>
            <td>${item.task}</td>
            <td>${item.hr} hrs</td>
            <td class="text-end">
            <button onclick="deleteTask(${i})" class = "btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            <button onclick="markAsNotToDo(${i})" class="btn btn-success"><i class="fa-solid fa-right-long"></i></button>
            </td>
            </tr>
        `
    })

    document.querySelector("#task-list").innerHTML = str
}

const displayBadTasks = () =>{
    let str = ""

    badlist.map((item, i) =>{
        str += `
            <tr>
            <td>${i + 1}</td>
            <td>${item.task}</td>
            <td>${item.hr} hrs</td>
            <td class="text-end">
            <button onclick="markAsToDo(${i})" class = "btn btn-warning"><i class="fa-solid fa-left-long"></i></button>
            <button onclick="deleteBadTask(${i})" class = "btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </td>
            </tr>
        `
    })

    document.querySelector("#bad-task").innerHTML = str
    totalBadTaskHours()
}

const markAsNotToDo = (i) =>{
    const item = taskList.splice(i, 1)
    badlist.push(item[0])

    displayTasks()
    displayBadTasks()

}

const markAsToDo = (i) =>{
    const item = badlist.splice(i,1)
    taskList.push(item[0])

    displayTasks()
    displayBadTasks()
}

const deleteTask = (i) =>{
    if(window.confirm("Are you sure you want to delete this task?")){
        taskList = taskList.filter((item, index) => index !== i)

        displayTasks()
        totalTaskHours()
    }
}

const deleteBadTask = (i) =>{
    if(window.confirm("Are you sure you want to delete this task?")){
        badlist = badlist.filter((item, index) => index !== i)
        displayBadTasks()
        totalTaskHours()
    }
}

const totalBadTaskHours = () =>{
    const total = badlist.reduce((a, i) => a + Number(i.hr), 0 )  //(Number(i.hr))---------> change string to number
    document.querySelector("#totalBadHrs").innerText = total

    return total
}

const totalTaskHours =() => {
    const total = taskList.reduce((a, i) => a + Number(i.hr), 0)
    document.querySelector("#totalHrs").innerText = total +
    totalBadTaskHours()
    return total
}
