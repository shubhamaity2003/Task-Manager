const API = "https://task-manager-backend-z7l5.onrender.com";
const token = localStorage.getItem("token");

let currentEditId = null;

if (!token) {
  alert("Session expired. Login again.");
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

async function fetchTasks() {
  const res = await fetch(API, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    alert("Unauthorized. Please login again.");
    logout();
    return;
  }

  const tasks = await res.json();

  const container = document.getElementById("taskList");
  container.innerHTML = "";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task-card";
    div.innerHTML = `
      <h4>${task.title}</h4>
      ${task.description ? `<p>${task.description}</p>` : ""}
      <div class="task-actions">
        <button onclick="openEdit('${task._id}', '${task.title}', '${task.description || ""}')">
          ✏️
        </button>
        <button onclick="deleteTask('${task._id}')">🗑</button>
      </div>
    `;
    container.appendChild(div);
  });
}
async function loadUser() {
  const res = await fetch("http://localhost:5000/api/user/me", {
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (res.ok) {
    const user = await res.json();
    document.getElementById("username").innerText = `Hi, ${user.name}`;
  }
}

loadUser();

async function addTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title, description })
  });

  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  fetchTasks();
}

function openEdit(id, title, description) {
  currentEditId = id;
  document.getElementById("editTitle").value = title;
  document.getElementById("editDescription").value = description;
  document.getElementById("editModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

async function updateTask() {
  const title = document.getElementById("editTitle").value;
  const description = document.getElementById("editDescription").value;

  await fetch(`${API}/${currentEditId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title, description })
  });

  closeModal();
  fetchTasks();
}

fetchTasks();
