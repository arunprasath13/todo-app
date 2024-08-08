document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-todo");
  const newTodoInput = document.getElementById("new-todo");
  const addCategoryInput = document.getElementById("add-category");
  const todoList = document.getElementById("todo-list");
  const categoryFilter = document.getElementById("category-filter");
  const sortOrder = document.getElementById("sort-order");
  
  const searchInput = document.getElementById("search-todo");

  const apiData = [
    { name: "Buy groceries", category: "personal" },
    { name: "Finish project report", category: "work" },
    { name: "Call mom", category: "personal" },
    { name: "Prepare presentation", category: "work" },
  ];

  let todos = [];

  const renderTodos = () => {
    todoList.innerHTML = "";
    const searchQuery = searchInput.value.trim().toLowerCase();

    const filteredTodos = todos.filter((todo) => {
      return (
        (categoryFilter.value === "" ||
          todo.category === categoryFilter.value) &&
        (searchQuery === "" || todo.name.toLowerCase().includes(searchQuery))
      );
    });

    const sortedTodos = filteredTodos.sort((a, b) => {
      if (sortOrder.value === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder.value === "category") {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

    sortedTodos.forEach((todo) => {
      const li = document.createElement("li");
      li.textContent = `${todo.name} (${todo.category})`;
      todoList.appendChild(li);
    });
  };

  const addTodo = () => {
    const name = newTodoInput.value.trim();
    const category = addCategoryInput.value.trim();

    if (name && category) {
      setTimeout(() => {
        todos.push({ name, category });
        newTodoInput.value = "";
        addCategoryInput.value = "";
        renderTodos();
      }, 1000); 
    } else {
      alert("Please provide both a task name and a category.");
    }
  };

  const fetchTodos = () => {
    setTimeout(() => {
      todos = apiData;
      renderTodos();
    }, 700);
  };

  addButton.addEventListener("click", addTodo);
  categoryFilter.addEventListener("change", renderTodos);
  sortOrder.addEventListener("change", renderTodos);
  searchInput.addEventListener("input", renderTodos);

  fetchTodos();
});
