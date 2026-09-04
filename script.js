const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskSearch = document.getElementById("taskSearch");
const taskFilter = document.getElementById("taskFilter");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const activeTasks = document.getElementById("activeTasks");

let tasks = JSON.parse(localStorage.getItem("devhubTasks")) || [];

function saveTasks() {
  localStorage.setItem("devhubTasks", JSON.stringify(tasks));
}

function renderTasks() {
  const searchText = taskSearch.value.toLowerCase();
  const filter = taskFilter.value;

  let filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(searchText);
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  taskList.innerHTML = "";

  if (filteredTasks.length === 0) {
    taskList.innerHTML = "<p>No tasks found.</p>";
  }

  filteredTasks.forEach(task => {
    const taskItem = document.createElement("div");
    taskItem.className = `task-item ${task.completed ? "completed" : ""}`;

    taskItem.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleTask(${task.id})">✓</button>
                <button class="edit-btn" onclick="editTask(${task.id})">✎</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">🗑</button>
            </div>
        `;

    taskList.appendChild(taskItem);
  });

  updateTaskStats();
}

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  const task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
}

function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);

  if (!task) {
    return;
  }

  const newText = prompt("Edit task:", task.text);

  if (newText === null) {
    return;
  }

  const updatedText = newText.trim();

  if (updatedText === "") {
    return;
  }

  task.text = updatedText;

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function updateTaskStats() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const active = total - completed;

  totalTasks.textContent = total;
  completedTasks.textContent = completed;
  activeTasks.textContent = active;
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addTask();
  }
});

taskSearch.addEventListener("input", renderTasks);
taskFilter.addEventListener("change", renderTasks);

const products = [
  {
    id: 1,
    name: "MacBook Air M3",
    category: "laptop",
    price: 154900,
    rating: 4.8,
    image: "https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/8/c/u/-original-imagypv6yyg96khh.jpeg?q=90",
  },
  {
    id: 2,
    name: "Dell Inspiron 15",
    category: "laptop",
    price: 87837,
    rating: 4.4,
    image: "https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/x/e/d/-original-imahg5fx6vyugqzh.jpeg?q=90"
  },
  {
    id: 3,
    name: "iPhone 16",
    category: "phone",
    price: 67900,
    rating: 4.7,
    image: "https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/n/q/h/-original-imahgfmzjj8gtqbc.jpeg?q=90"
  },
  {
    id: 4,
    name: "Samsung Galaxy S25",
    category: "phone",
    price: 69999,
    rating: 4.6,
    image: "https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/j/e/r/-original-imah8pdgedd5whgs.jpeg?q=90"
  },
  {
    id: 5,
    name: "Logitech MX Master 3S",
    category: "accessory",
    price: 6426,
    rating: 4.8,
    image: "https://rukminim2.flixcart.com/image/1536/1536/xif0q/mouse/z/y/m/-original-imahbg3ngqhnftfd.jpeg?q=90"
  },
  {
    id: 6,
    name: "EVOFOX Katana X2 Mechanical Keyboard",
    category: "accessory",
    price: 1999,
    rating: 4.5,
    image: "https://rukminim2.flixcart.com/image/1536/1536/xif0q/keyboard/gaming-keyboard/y/v/y/katana-x2-mechanical-evofox-original-imahdtfgjev35qvb.jpeg?q=90"
  },
  {
    id: 7,
    name: "HP Pavilion 14",
    category: "laptop",
    price: 75992,
    rating: 4.3,
    image: "https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/k/w/q/14-dv2041tu-laptop-hp-original-imahkf5p8pfmzsvb.jpeg?q=90"
  },
  {
    id: 8,
    name: "OnePlus 13",
    category: "phone",
    price: 56999,
    rating: 4.6,
    image: "https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/q/x/o/13-cph2649-oneplus-original-imah9by2nrzscpyh.jpeg?q=90"
  }
];

const productSearch = document.getElementById("productSearch");
const categoryFilter = document.getElementById("categoryFilter");
const sortProducts = document.getElementById("sortProducts");
const productList = document.getElementById("productList");

function renderProducts() {
  const searchText = productSearch.value.toLowerCase();
  const category = categoryFilter.value;
  const sort = sortProducts.value;

  const oldCards = [...productList.children];

  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchText);
    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "rating-high") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  if (sort === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const oldPositions = new Map();

  oldCards.forEach(card => {
    oldPositions.set(card.dataset.id, card.getBoundingClientRect());
  });

  productList.innerHTML = "";

  if (filteredProducts.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  filteredProducts.forEach(product => {
    const productCard = document.createElement("article");

    productCard.className = "product-card";
    productCard.dataset.id = product.id;

    productCard.innerHTML = `
            <div class="product-image">
    <img src="${product.image}" alt="${product.name}">
</div>
            <h3>${product.name}</h3>
            <p>${product.category.toUpperCase()}</p>
            <div class="product-info">
                <span class="price">₹${product.price.toLocaleString("en-IN")}</span>
                <span class="rating">⭐ ${product.rating}</span>
            </div>
        `;

    productList.appendChild(productCard);
  });

  const newCards = [...productList.children];

  newCards.forEach(card => {
    const oldPosition = oldPositions.get(card.dataset.id);

    if (!oldPosition) {
      card.animate(
        [
          {
            opacity: 0,
            transform: "scale(0.85)"
          },
          {
            opacity: 1,
            transform: "scale(1)"
          }
        ],
        {
          duration: 350,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)"
        }
      );

      return;
    }

    const newPosition = card.getBoundingClientRect();

    const deltaX = oldPosition.left - newPosition.left;
    const deltaY = oldPosition.top - newPosition.top;

    if (deltaX !== 0 || deltaY !== 0) {
      card.animate(
        [
          {
            transform: `translate(${deltaX}px, ${deltaY}px)`
          },
          {
            transform: "translate(0, 0)"
          }
        ],
        {
          duration: 600,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)"
        }
      );
    }
  });
}

productSearch.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
sortProducts.addEventListener("change", renderProducts);

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("contactName").value.trim();

  alert(`Thanks, ${name}! Your message has been received.`);

  contactForm.reset();
});

renderTasks();
renderProducts();