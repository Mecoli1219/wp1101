// var allData = {
//     todoData: [
//         {
//             id: 0,
//             done: false,
//             detail: "first todo"
//         },
//         {
//             id: 1,
//             done: false,
//             detail: "second todo"
//         },
//         {
//             id: 2, 
//             done: true,
//             detail: "third todo"
//         },
//     ],
//     next_id: 3,
//     state: "all",
// }
var allData = {
    todoData: [],
    next_id: 0,
    state: "all",
}

const InitiateList = () => {
    const list = document.getElementById("todo-list")
    list.innerHTML = ""
    listenFooter()
    updateTotal()
}

const listenFooter = () =>{
    const all = document.getElementById("all-button")
    const active = document.getElementById("active-button")
    const complete = document.getElementById("complete-button")
    all.addEventListener("click", changeState(all, "all"))
    active.addEventListener("click", changeState(active, "active"))
    complete.addEventListener("click", changeState(complete, "complete"))
    const clear = document.getElementById("clear")
    clear.addEventListener("click", deleteComplete)
}

const deleteComplete = (event)=>{
    const done_filtered = allData.todoData.filter((data)=>{return data.done})
    done_filtered.map((data)=>{
        const {id} = data
        const liNode = document.getElementById(`li-${id}`)
        liNode.remove()
    })
    const filtered = allData.todoData.filter((data)=>{
        return !data.done
    })
    allData.todoData = filtered
    updateTotal()
}

const changeState = (node, state) => {
    return ()=>{
        allData.state = state
        node.focus()
        updateList()
    }
}

const updateList = () => {
    const {state} = allData
    allData.todoData.map((data)=>{
        const Node = document.getElementById(`li-${data.id}`)
        if (data.done === true){
            if (state === "all" || state === "complete"){
                Node.style.display = "flex"
            }else{
                Node.style.display = "none"
            }
        }else{
            if (state === "all" || state === "active"){
                Node.style.display = "flex"
            }else{
                Node.style.display = "none"
            }
        }
    })
}

const changeTodoStatus = (event) => {
    const node = event.currentTarget
    const {id, checked} = node
    const h1Node = document.getElementById(`h1-${id}`)
    if (checked){
        h1Node.style.textDecoration = "line-through"
        h1Node.style.opacity = 0.5
    }else{
        h1Node.style.textDecoration = ""
        h1Node.style.opacity = 1
    }
    const index = allData.todoData.findIndex(obj => obj.id === id * 1);
    allData.todoData[index].done = checked
    updateTotal()
}

const handleKeyUp =(event) => {
    const {code, target} = event
    var {next_id} = allData
    if (code !== "Enter"){
        return
    }
    if (target.value.trim() === ''){
        alert('Add Something!')
        return
    }
    const todo = {id: next_id, done:false, detail:target.value}
    allData.todoData = [...allData.todoData, todo]
    allData.next_id += 1
    target.value = "" 
    addTodo(todo)
}

const addTodo = (data) => {
    const list = document.getElementById("todo-list")
    const liNode = document.createElement("li")
    liNode.className = "todo-app__item"
    liNode.id = `li-${data.id}`
    const labelNode = document.createElement("label")
    labelNode.htmlFor = data.id
    const divNode = document.createElement("div")
    divNode.className = "todo-app__checkbox"
    const inputNode = document.createElement("input")
    inputNode.type = "checkbox"
    inputNode.id = data.id
    inputNode.checked = data.done
    const h1Node = document.createElement("h1")
    h1Node.className = "todo-app__item-detail"
    h1Node.innerText = data.detail
    h1Node.id = `h1-${data.id}`
    const imgNode = document.createElement("img")
    imgNode.className = "todo-app__item-x"
    imgNode.alt = "x"
    imgNode.src = "./img/x.png"
    imgNode.id = data.id
    if (data.done === true){
        h1Node.style.textDecoration = "line-through"
        h1Node.style.opacity = 0.5
    }
    if (allData.state === "complete"){
        liNode.style.display = "none"
    }
    divNode.appendChild(inputNode)
    divNode.appendChild(labelNode)
    liNode.appendChild(divNode)
    liNode.appendChild(h1Node)
    liNode.appendChild(imgNode)
    list.appendChild(liNode)
    inputNode.addEventListener("click", changeTodoStatus)
    imgNode.addEventListener("click", deleteTodo)
    updateTotal()
}

const updateTotal = () => {
    const total = allData.todoData.filter((todoObj)=>{
        return !todoObj.done
    }).length
    const footNode = document.getElementById("todo-footer")
    const listNode = document.getElementById("todo-list")
    if (allData.todoData.length === 0){
        footNode.style.display = "none"
        listNode.style.display = "none"
    }else{
        footNode.style.display = "flex"
        listNode.style.display = "block"
    }
    const totalNode = document.getElementById("todo-app__total")
    totalNode.innerText = `${total} left`
    const done_num = allData.todoData.filter((data)=>{return data.done}).length
    const clearNode = document.getElementById("clear")
    const pNode = document.getElementById("p")
    if (done_num === 0){
        clearNode.style.display = "none"
        pNode.style.display = "block"
    }else{
        clearNode.style.display = "block"
        pNode.style.display = "none"
    }
}

const deleteTodo = (event) => {
    const node = event.currentTarget
    const {id} = node
    const liNode = document.getElementById(`li-${id}`)
    liNode.remove()
    const filtered = allData.todoData.filter((data)=>{
        return data.id !== id*1
    })
    allData.todoData = filtered
    updateTotal()
}

const todo_input = document.getElementById("todo-input")
todo_input.addEventListener("keyup", handleKeyUp)

InitiateList()