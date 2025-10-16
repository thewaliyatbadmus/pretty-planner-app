const form = document.getElementById('signupForm');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => menu.classList.toggle('show'));
document.querySelectorAll('.menu a').forEach(link =>
  link.addEventListener('click', () => menu.classList.remove('show'))
);

function showPopup(message, type) {
  const popup = document.createElement('div');
  popup.className = `popup ${type}`;
  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2500);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d).{6,}$/;

  if (!name || !email || !password) {
    showPopup('Please fill in all fields.', 'error');
    return;
  }

  if (!emailPattern.test(email)) {
    showPopup('Please enter a valid email address.', 'error');
    return;
  }

  if (!passwordPattern.test(password)) {
    showPopup('Password must include at least one number.', 'error');
    return;
  }

  showPopup('Signup successful!', 'success');
  form.reset();
});

