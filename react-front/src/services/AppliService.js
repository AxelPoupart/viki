const api = 'content/applicationservice/';

function get_campuses() {
  let requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  }
  return fetch(api + 'newapp/campuses', requestOptions)
    .then(res => {
      return res.json()
    })
}

function get_domains() {
  let requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  }
  return fetch(api + 'newapp/domains', requestOptions)
    .then(res => res.json())
}

function create_app(application) {
  let requestOptions = {
    credentials: 'include',
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application)
  };
  return fetch(api + 'newapp/createapp', requestOptions)
}

function get_applications() {
  console.log('GET applications')
  let applications;
  let requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  }
  return fetch(api + 'applications', requestOptions)
    .then(res => res.json())
    .then(res => {
      applications = res.applications
    })
}

function get_applicationById(id) {
  console.log('GET action by Id')
  let application;
  let requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  }
  return fetch(api + `applications/${id}`, requestOptions)
    .then(res => res.json())
    .then(res => {
      application = res.application
    })
}

function get_applicationsByVm(id) {
  console.log('GET applications by User')
  let applications;
  let requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  }
  return fetch(api + `applications/vm/${id}`, requestOptions)
    .then(res => res.json())
    .then(res => {
      applications = res.applications
    })
}

function get_applicationsBySearch(term) {
  console.log('GET applications by searching')
  let applications;
  let requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  }
  return fetch(api + `applications/search/${term}`, requestOptions)
    .then(res => res.json())
    .then(res => {
      applications = res.applications
    })
}


function post_application(application) {
  console.log('POST action')
  let requestOptions = {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(application)
  }
  return fetch(api + `applications/add`, requestOptions)
    .then(res => {
      console.log(res)
      res.json()
    })
    .then(res => console.log(res))
}

export {
  post_application,
  get_applicationsBySearch,
  get_applicationsByVm,
  get_applicationById,
  get_applications,
  get_campuses,
  get_domains,
  create_app
}