const API = "https://task-manager-backend.onrender.com/api/auth";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert(data.msg || "Login failed");
  }
}

async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Registration successful. Please login.");
    window.location.href = "index.html";
  } else {
    alert(data.msg || "Registration failed");
  }
}
