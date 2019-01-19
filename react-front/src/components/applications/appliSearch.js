import React from 'react';
import { Link } from "react-router-dom";
import Autocomplete from 'react-autocomplete';

let menu = {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '90%',
    position: 'static',
    maxHeight: '150px',
}

export default class AppliSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            appList: []
        }
        this.handleChange.bind(this);
        this.handleSelect.bind(this)
    }

    handleChange = (event) => {

        this.setState({ [event.target.name]: event.target.value })
    }

    handleSelect = (value) => {
        alert(`This action should redirect to ${value} application page`)
    }

    loadApplications = () => {
        let apps = this.props.importApps();
        this.setState({ appList: apps });
    }

    render() {
        return (
            <div style={{ margin: '20px', display: 'flex', flexDirection: 'column', width: '100%' }} >
                <div style={{alignSelf:'center'}}>
                    <Autocomplete
                        name='searchTerm'
                        items={this.props.apps}
                        getItemValue={(item) => item.label}
                        renderItem={(item, isHighlighted) =>
                            <div key={this.props.apps.indexOf(item)} style={{ background: isHighlighted ? '#eee' : 'white', margin:'5px' }}>
                                <Link to='#'>{item.label}</Link>
                            </div>
                        }
                        shouldItemRender={(item, value) => value.length > 2 && (item.label.toLowerCase().indexOf(value.toLowerCase()) > -1 || (item.comment && item.comment.toLowerCase().indexOf(value.toLowerCase()) > -1))}
                        value={this.state.searchTerm}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                        menuStyle={menu}
                        inputProps={{ name: 'searchTerm', placeholder: 'Chercher une application' }}
                    />
                </div>
            </div>
        )
    }
}
