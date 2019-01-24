import React from 'react';
import Autocomplete from 'react-autocomplete';
import MachineDetail from './machineDetail';

let menu = {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '90%',
    position: 'static',
    maxHeight: '150px',
    maxWidth: '10px',
    overflow: 'auto'
}

export default class AppliSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            open: false,
            selectedMachine: {}
        }
        this.handleChange.bind(this);
        this.handleSelect.bind(this);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSelect = (value) => {
        this.setState({ selectedMachine: this.props.machines.find(item => item.label === value) }, () => this.setState({ open: true }))
    }

    handleClose() {
        this.setState({ open: false, selectedMachine: {} })
    }

    render() {
        let diag = this.state.open ? (<MachineDetail history={this.props.history} machine={this.state.selectedMachine} open={this.state.open} onClose={this.handleClose.bind(this)}/>) : null
        return (
            <div style={{ margin: '20px', display: 'flex', flexDirection: 'column', width: '100%' }} >
                <div style={{ alignSelf: 'center' }}>
                    <Autocomplete
                        name='searchTerm'
                        items={(this.props.machines) ? this.props.machines : []}
                        getItemValue={(item) => item.label}
                        renderItem={(item, isHighlighted) =>
                            <div key={this.props.machines.indexOf(item)} style={{ background: isHighlighted ? '#eee' : 'white', margin: '5px' }}>
                                {item.label}
                            </div>
                        }
                        shouldItemRender={(item, value) => value.length > 2 && item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        value={this.state.searchTerm}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                        menuStyle={menu}
                        inputProps={{ name: 'searchTerm', placeholder: 'Chercher une machine', size: '40' }}
                    />
                </div>
                {diag}
            </div>
        )
    }
}
