import React from 'react'

export default class newApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      campuses: [],
      domains: [],
      subDomains: {},
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

  componentWillMount() {
    //TODO: have a GET request to the server to get an updated list of campuses, domains and subdomains
    // the subdomains are dynamic depending on what domain the user selected
    this.setState({
      campuses: ['Gif', 'Metz', 'Rennes'],
      domains: ['Domain 1', 'Domain 2', 'Domain 3'],
      subDomains: {
        'Domain 1': ['subDomain1 1', 'subDomain1 2', 'subDomain1 3'],
        'Domain 2': ['subDomain2 1', 'subDomain2 2', 'subDomain2 3'],
        'Domain 3': ['subDomain3 1', 'subDomain3 2', 'subDomain3 3']
      }
    })
  }

  handleSubmit(event) {
    this.setState({
      newApplication:{
        appCode: this.refs.appCode.value,
        appLabel: this.refs.appLabel.value,
        appCampus: this.refs.appCampus.value,
        appDomain: this.refs.appDomain.value,
        appSubDomain: this.refs.appSubDomain.value
      }
    }, ()=>{
      console.log(this.state.newApplication)
    });
    event.preventDefault();
  }

  render() {
    // Declaring options
    let campusesOptions = this.state.campuses.map(campus => {
      return <option key={campus} value={campus}>{campus}</option>
    })
    let domainsOptions = this.state.domains.map(domain => {
      return <option key={domain} value={domain}>{domain}</option>
    })
    let subDomainOptions = this.state.subDomains['Domain 1'].map(subDomain => {
      return <option key={subDomain} value={subDomain}>{subDomain}</option>
    })

    // Update subdomains depending on the selected domain
    let updateSubDomains = () => {
      console.log('Update')
      subDomainOptions = this.state.subDomains[this.refs.appDomain.value].map(subDomain => {
        return <option key={subDomain} value={subDomain}>{subDomain}</option>
      })
      console.log(subDomainOptions)
    }
    // Return the application form
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Code de l'application</label><br />
            <input type="text" ref="appCode" />
          </div>
          <div>
            <label>libellé de l'application</label><br />
            <input type="text" ref="appLabel" />
          </div>
          <div>
            <label>Campus de rattachement</label><br />
            <select ref="appCampus">
              {campusesOptions}
            </select>
          </div>
          <div>
            <label>Domaine de l'application</label><br />
            <select ref="appDomain" onChange={updateSubDomains}>
              {domainsOptions}
            </select>
          </div>
          <div>
            <label>Sous domaine</label><br />
            <select ref="appSubDomain">
              {subDomainOptions}
            </select>
          </div>
          <input type='submit' value='Submit'/>
        </form>
      </div>
    )
  }
}
