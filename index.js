const todos = getSavedTodos()

let filters = {
	searchText: '',
	showAll: false
}

// initial render
renderToDos(todos, filters)
generateSummaryDOM(todos)


//  add new task button
document.querySelector('button').addEventListener('click', function(e){
	
	generateNewTodoDOM(todos) 
	saveTodos(todos)
	generateSummaryDOM(todos)
	renderToDos(todos, filters)

})

document.querySelector('#search-form').elements.searchText.value = ''

document.querySelector('#search-form').addEventListener('submit', function(e){
	e.preventDefault()

	filters.searchText = e.target.elements.searchText.value

	e.target.elements.searchText.value = ''

	renderToDos(todos, filters)

})

document.querySelector('#show').addEventListener('change', function(e){
	filters.showAll = e.target.checked
	document.querySelector('#body').innerHTML = ''
	renderToDos(todos, filters)
})


document.querySelector('#delete-all').addEventListener('click', function(e){
	localStorage.clear()
	location.reload()
	renderToDos(todos, filters)
})










