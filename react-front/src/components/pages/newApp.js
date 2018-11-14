import React from 'react'

let api = 'http://localhost:5000/AppCreation/'

export default class newApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      campuses: [],
      domains: [],
      subDomains: {},
      subDomainOptions: [],
      newApplication: {
        appCode: '',
        appLabel: '',
        appCampus: '',
        appDomain: '',
        appSubDomain: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  get_campuses() {
    let campuses;
    let requestOptions = {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    }
    fetch(api + 'campuses', requestOptions)
      .then(res => res.json())
      .then(res => {
        campuses = res.campuses
      })
      .then(() => {
        this.setState({ campuses: campuses })
      })
  }

  get_domains() {
    let domains = [], subDomains = {};
    let requestOptions = {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    }
    fetch(api + 'domains', requestOptions)
      .then(res => res.json())
      .then(res => {
        for (var key in res.domains) {
          domains.push(res.domains[key])
        };
        subDomains = res.subDomains;
      }
      )
      .then(() => {
        this.setState({
          domains: domains,
          subDomains: subDomains
        }, () => {
          this.setState({ subDomainOptions: this.state.subDomains[this.state.domains[0]] })
        })
      })
  }

  componentDidMount() {
    //TODO: have a GET request to the server to get an updated list of campuses, domains and subdomains
    // the subdomains are dynamic depending on what domain the user selected
    this.get_campuses()
    this.get_domains()
  }

  handleSubmit(event) {
    this.setState({
      newApplication: {
        appCode: this.refs.appCode.value,
        appLabel: this.refs.appLabel.value,
        appCampus: this.refs.appCampus.value,
        appDomain: this.refs.appDomain.value,
        appSubDomain: this.refs.appSubDomain.value
      }
    }, () => {
      let requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.newApplication)
      };
      fetch(api + 'newapp', requestOptions)
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            alert(res.msg)
          } else {
            alert(res.msg)
          }
        })
    });
    event.preventDefault();
  }

  // Update subdomains depending on the selected domain
  updateSubDomains = () => {
    let selectedDomain = this.refs.appDomain.value
    let subDomainOptions = this.state.subDomains[selectedDomain]
    this.setState({ subDomainOptions: subDomainOptions })
  }

  render() {
    // Declaring options
    let campusesOptions = this.state.campuses.map(campus => {
      return <option key={campus} value={campus}>{campus}</option>
    })
    let domainsOptions = this.state.domains.map(domain => {
      return <option key={domain} value={domain}>{domain}</option>
    })
    let subDomainOptions = this.state.subDomainOptions.map(subDomain => {
      return <option key={subDomain} value={subDomain}>{subDomain}</option>
    })

    // Return the application form
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Code de l'application</label><br />
            <input type="text" ref="appCode" />
          </div>
          <div className="form-group">
            <label>libellé de l'application</label><br />
            <input type="text" ref="appLabel" />
          </div>
          <div className="form-group">
            <label>Campus de rattachement</label><br />
            <select ref="appCampus">
              {campusesOptions}
            </select>
          </div>
          <div className="form-group">
            <label>Domaine de l'application</label><br />
            <select ref="appDomain" onChange={this.updateSubDomains}>
              {domainsOptions}
            </select>
          </div>
          <div className="form-group">
            <label>Sous domaine</label><br />
            <select ref="appSubDomain">
              {subDomainOptions}
            </select>
          </div><br />
          <input className="btn btn-primary" type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}