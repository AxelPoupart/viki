import React from 'react';
import Autocomplete from 'react-autocomplete';

import { TextField, Divider } from '@material-ui/core';

let menu = {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '90%',
    position: 'static',
    overflow: 'scroll',
    maxHeight: '150px',
  }

export default class PairAppMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            machine: "",
            service: ""
        }
        this.handleChange.bind(this);
        this.handleSelect.bind(this)
    }

    componentDidMount() {
        this.setState({
            machine: this.props.pair.machine,
            service: this.props.pair.service
        })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value }, () => {this.props.updatePairedMachine(this.props.index, this.state.machine, this.state.service);})
    }

    handleSelect = (value) => {
        this.setState({ machine: value }, () => {
            this.props.updatePairedMachine(this.props.index, this.state.machine, this.state.service);
        })
    }

    render() {
        return (
            <div style={{marginTop:'20px'}} >
                <div>
                    <Autocomplete
                        name='machine'
                        items={this.props.machines}
                        getItemValue={(item) => item.label}
                        renderItem={(item, isHighlighted) =>
                            <div key={this.props.machines.indexOf(item)} style={{ background: isHighlighted ? '#eee' : 'white' }}>
                                {item.label}
                            </div>
                        }
                        shouldItemRender={(item, value) => (item.label.length < 3 && item.label.toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.label.toLowerCase().indexOf(value.toLowerCase()) > -1 && value.length > 2)}
                        value={this.state.machine}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                        menuStyle={menu}
                        inputProps={{name: 'machine', placeholder:'Machine associée'}}
                    />
                </div>
                <div>
                    <TextField
                        name="service"
                        type="text"
                        fullWidth
                        margin="normal"
                        variant="filled"
                        placeholder="Service associé"
                        value={this.state.service}
                        onChange={this.handleChange}
                    />
                </div>
                <Divider />
            </div>
        )
    }
}
