

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
      fetch(api + `application/${id}`, requestOptions)
          .then(res => res.json())
          .then(res => {
            application = res.application
          })
  }

  function get_applicationsByUser(id) {
      console.log('GET action by User')
      let applications;
      let requestOptions = {
          credentials: 'include',
          method: 'GET',
          headers: { "Content-Type": "application/json" },
      }
      fetch(api + `applications/user/${id}`, requestOptions)
          .then(res => res.json())
          .then(res => {
            applications = res.applications
          })
  }

  function get_actionsByAppli(id) {
      console.log('GET action by Appli')
      let actions;
      let requestOptions = {
          credentials: 'include',
          method: 'GET',
          headers: { "Content-Type": "application/json" },
      }
      fetch(api + `actions/appli/${id}`, requestOptions)
          .then(res => res.json())
          .then(res => {
              actions = res.actions
          })
  }

  function get_actionsBySearch(term) {
      console.log('GET action by searching')
      let actions;
      let requestOptions = {
          credentials: 'include',
          method: 'GET',
          headers: { "Content-Type": "application/json" },
      }
      fetch(api + `actions/search/${term}`, requestOptions)
          .then(res => res.json())
          .then(res => {
              actions = res.actions
          })

  }


  function post_action(action) {
      console.log('POST action')
      let requestOptions = {
          credentials: 'include',
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: {
              action
             }
      }
      fetch(api + `actions/add`, requestOptions)
          .then(res => {
              console.log(res)
              res.json()
          })
          .then(res => console.log(res))
  }

export { post_action, get_actionsBySearch, get_actionsByAppli, get_actionsByUser, get_actionById, get_actions }
