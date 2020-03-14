const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const loginDat = {
    email: form.email.value,
    password: form.password.value,
  };
  fetch('/user/log-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginDat),
  })
    .then((res) => res.json())
    .then((json) => {
      const { token } = json;
      localStorage.setItem('token', token);
      setTimeout(() => {
        window.location = '/';
      }, 1000);
    });
});
