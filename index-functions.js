function getSavedTodos(){

	const data = localStorage.getItem('todos')

	if(data != null){
		return JSON.parse(data)
	}else{
		return []
	}

}


function renderToDos(todos, filters){


	document.querySelector('#ul-body').innerHTML = ''

	const filteredTodos = todos.filter(function(todo){

		let searchByText = todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
		let searchByStatus = !filters.showAll || !todo.complete
		// debugger
		return searchByText && searchByStatus
	})

	document.querySelector('#ul-body').innerHTML = ''

	filteredTodos.forEach(function (todo){

		document.querySelector('#ul-body').appendChild(generateTodoDOM(todo))

	})

}


function generateSummaryDOM(todos){

	const summaryEl = document.createElement('h2')

	const remaining = todos.filter(function(todo){
		return !todo.complete
	})

	document.querySelector('#remaining').innerHTML = ''

	summaryEl.textContent = `You have ${remaining.length} unfinished task/s.`
	document.querySelector('#remaining').append(summaryEl)

}


// Remove task card
function removeTask(id){

	const todoIndex = todos.findIndex(function (todo){
		return todo.uuid === id
	})

	if(todoIndex > -1){
		todos.splice(todoIndex, 1)
	}

}


// Change task card status
function updateTaskStatus(id, status){

	let data = []

	const todoIndex = todos.findIndex(function (todo){
		data = todo
		return todo.uuid === id
	})

	if(todoIndex > -1){
		if(status){			
			data.complete = true
		}else{
			data.complete = false
		}
	}

}


// Change task card status
function updateTaskTitle(id, title){

	let data = []

	const todoIndex = todos.findIndex(function (todo){
		data = todo
		return todo.uuid === id
	})

	if(todoIndex > -1){
		if(status){			
			data.title = title
		}else{
			data.title = title
		}
	}

}


function generateTodoDOM(todo){

	// Task Card
	const card = document.createElement('li')
	// Task Card add class attribute
	card.classList.add("card")

	// Task Card checkbox function
	const card_function = document.createElement('input')
	card_function.setAttribute('type', 'checkbox')

	if(todo.complete){
		card_function.setAttribute('checked', 'checked')
	}

	card_function.addEventListener('change', function (e){

		//check
		if(e.target.checked){
			//update status
			updateTaskStatus(todo.uuid, e.target.checked)
		}else{
			updateTaskStatus(todo.uuid, e.target.checked)
		}

		// save
		saveTodos(todos)
		// render
		generateSummaryDOM(todos)
		renderToDos(todos, filters)
	})

	// Task remove button
	const rmv_btn = document.createElement('button')
	rmv_btn.textContent = 'x'
	rmv_btn.addEventListener('click', function (){
		// remove
		removeTask(todo.uuid)
		// save
		saveTodos(todos)
		// render
		generateSummaryDOM(todos)
		renderToDos(todos, filters)
	})

	// Task Card content
	// const card_content = document.createElement('span')
	const card_content = document.createElement('input')
	card_content.setAttribute('type', 'text')
	card_content.setAttribute('value', todo.title)
	card_content.classList.add("card_text_container")
	card_content.addEventListener('keypress', function (e){
		if(e.key == "Enter"){
			updateTaskTitle(todo.uuid, e.target.value)
			// save
			saveTodos(todos)
			// render
			generateSummaryDOM(todos)
			renderToDos(todos, filters)
		}
	})

	card.appendChild(rmv_btn)
	card.appendChild(card_content)
	card.appendChild(card_function)

	return card
	
}

function generateNewTodoDOM(todos){

	document.querySelector('#ul-body').innerHTML = ''

	// Task Card
	const card = document.createElement('li')
	// Task Card add class attribute
	card.classList.add("card")

	// Tasl Card checkbox function
	const card_function = document.createElement('input')
	card_function.setAttribute('input', 'checkbox')

	// Task remove button
	const rmv_btn = document.createElement('button')
	rmv_btn.textContent = 'x'

	// Task Card content
	const card_content = document.createElement('span')
	card_content.classList.add("card_text_container")
	card_content.textContent = 'New Task'

	// Create new object record
	const task = {
		uuid: uuidv4(),
		title: 'New Task',
		complete: false
	}

	// Added to the current array list
	todos.push(task)

	card.appendChild(rmv_btn)
	card.appendChild(card_content)
	card.appendChild(card_function)

	document.querySelector('#ul-body').appendChild(card)
	
}

function saveTodos(todos) {
	localStorage.setItem('todos', JSON.stringify(todos))
}