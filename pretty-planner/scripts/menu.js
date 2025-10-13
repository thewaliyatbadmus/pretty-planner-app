const menuBtn = document.querySelector(".menu-btn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.toggle("open");
  menuBtn.textContent = sideMenu.classList.contains("open") ? "×" : "⋯";
});

const links = sideMenu.querySelectorAll("a");
links.forEach(link => {
  link.addEventListener("click", () => {
    sideMenu.classList.remove("open");
    menuBtn.textContent = "⋯";
  });
});

