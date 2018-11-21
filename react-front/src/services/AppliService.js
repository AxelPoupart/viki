

const api = 'http://localhost:5000/content/applicationservice/';

function get_campuses() {
  console.log('GET campuses')
  let campuses;
  let requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  }
  fetch(this.api + 'campuses', requestOptions)
    .then(res => res.json())
    .then(res => {
      campuses = res.campuses
    })
}

function get_applications() {
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

  function get_applicationById(id) {
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

  function get_applicationsByVm(id) {
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

  function get_applicationsBySearch(term) {
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


  function post_application(application) {
      console.log('POST action')
      let requestOptions = {
          credentials: 'include',
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: {
            application
             }
      }
      fetch(api + `applications/add`, requestOptions)
          .then(res => {
              console.log(res)
              res.json()
          })
          .then(res => console.log(res))
  }

export { post_application, get_applicationsBySearch, get_applicationsByVm, get_applicationById, get_applications, get_campuses }
