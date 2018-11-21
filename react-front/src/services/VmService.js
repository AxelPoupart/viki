

const api = 'http://localhost:5000/content/vmservice/';


function get_vms() {
  console.log('GET vms')
  let vms;
  let requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  }
  fetch(api + 'vms', requestOptions)
    .then(res => res.json())
    .then(res => {
      vms = res.vms
    })
  }

  function get_vmById(id) {
      console.log('GET vm by Id')
      let vm;
      let requestOptions = {
          credentials: 'include',
          method: 'GET',
          headers: { "Content-Type": "application/json" },
      }
      fetch(api + `vms/${id}`, requestOptions)
          .then(res => res.json())
          .then(res => {
            vm = res.vm
          })
  }

  function get_vmsByAppli(id) {
      console.log('GET vms by applications')
      let vms;
      let requestOptions = {
          credentials: 'include',
          method: 'GET',
          headers: { "Content-Type": "application/json" },
      }
      fetch(api + `vms/appli/${id}`, requestOptions)
          .then(res => res.json())
          .then(res => {
            vms = res.vms
          })
  }

  function get_vmsBySearch(term) {
      console.log('GET vms by searching')
      let vms;
      let requestOptions = {
          credentials: 'include',
          method: 'GET',
          headers: { "Content-Type": "application/json" },
      }
      fetch(api + `vms/search/${term}`, requestOptions)
          .then(res => res.json())
          .then(res => {
            vms = res.vms
          })
  }


  function post_vm(vm) {
      console.log('POST action')
      let requestOptions = {
          credentials: 'include',
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: {
            vm
             }
      }
      fetch(api + `vms/add`, requestOptions)
          .then(res => {
              console.log(res)
              res.json()
          })
          .then(res => console.log(res))
  }

export { post_vm, get_vmsBySearch, get_vmsByAppli, get_vmById, get_vms }
