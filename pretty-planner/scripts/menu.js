const menuBtn = document.querySelector(".menu-btn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.addEventListener("click", () => {
  const isOpen = sideMenu.classList.toggle("open");
  menuBtn.textContent = isOpen ? "×" : "⋯";
});

const links = sideMenu.querySelectorAll("a");
links.forEach(link => {
  link.addEventListener("click", () => {
    sideMenu.classList.remove("open");
    menuBtn.textContent = "⋯";
  });
});

document.addEventListener("click", (event) => {
  if (!sideMenu.contains(event.target) && !menuBtn.contains(event.target)) {
    sideMenu.classList.remove("open");
    menuBtn.textContent = "⋯";
  }
});
