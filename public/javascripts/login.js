const form = document.querySelector('form')

form.addEventListener('submit', e => {
  e.preventDefault()
  const loginDat = {
    email: form.email.value,
    password: form.password.value
  }
  console.log(JSON.stringify(loginDat))
  fetch('/user/log-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginDat)
  })
    .then(res => res.json())
    .then(json => {
      const { token } = json // look at json, take key 'token', assign to var 'token'

      localStorage.setItem('token', token)
      console.log('before:', localStorage.getItem('token'))
      setTimeout(() => {
        window.location = '/'
        console.log('after', localStorage.getItem('token'))
      }, 5000)
    })
})
