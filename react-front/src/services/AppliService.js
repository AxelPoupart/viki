

const api = 'http://localhost:5000/content/applicationservice/';

exports.get_campuses = () => {
  let requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  }
  return fetch(api + 'newapp/campuses', requestOptions)
    .then(res => {
      return res.json()
    })
}

exports.get_domains = () => {
  let requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  }
  return fetch(api + 'newapp/domains', requestOptions)
    .then(res => res.json())
}

exports.create_app = (application) => {
  let requestOptions = {
    credentials: 'include',
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application)
  };
  return fetch(api + 'newapp/createapp', requestOptions)
}

exports.get_applications = () => {
  console.log('GET applications')
  let applications;
  let requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  }
  fetch(api + 'applications', requestOptions)
    .then(res => res.json())
    .then(res => {
      applications = res.applications
    })
}

exports.get_applicationById = (id) => {
  console.log('GET action by Id')
  let application;
  let requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  }
  fetch(api + `applications/${id}`, requestOptions)
    .then(res => res.json())
    .then(res => {
      application = res.application
    })
}

exports.get_applicationsByVm = (id) => {
  console.log('GET applications by User')
  let applications;
  let requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  }
  fetch(api + `applications/vm/${id}`, requestOptions)
    .then(res => res.json())
    .then(res => {
      applications = res.applications
    })
}

exports.get_applicationsBySearch = (term) => {
  console.log('GET applications by searching')
  let applications;
  let requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  }
  fetch(api + `applications/search/${term}`, requestOptions)
    .then(res => res.json())
    .then(res => {
      applications = res.applications
    })

}