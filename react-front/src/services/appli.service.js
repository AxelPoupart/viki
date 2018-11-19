

export default class AppService {

    constructor() {

        this.state = {
            api: 'http://localhost:5000/content/newapp/'
        }
    }
    
    
    get_campuses() {
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



}