const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const signupDat = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value,
    address: form.address.value,
  };
  console.log(JSON.stringify(signupDat));
  fetch('/user/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupDat),
  })
    .then((res) => res.json())
    .then();
});
