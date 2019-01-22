import React from 'react';
import Autocomplete from 'react-autocomplete';
import { get_vms } from '../../services/vmService';

let menu = {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '90%',
    position: 'static',
    overflow: 'scroll',
    maxHeight: '150px'
}

export default class PairAppMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            machine: "",
            service: "",
            machines: []
        }
        this.handleChange.bind(this);
        this.handleSelect.bind(this)
    }

    getMachines(callback) {
        get_vms()
            .then(machines => this.setState({ machines: machines }, callback))
    }

    componentDidMount() {
        this.getMachines(() => {
            console.log(this.props.pair)
            this.setState({
                machine: this.props.pair.machine!=undefined ? this.props.pair.machine : this.state.machines.find(item => item._id === this.props.pair.machineId).label,
                service: this.props.pair.service ? this.props.pair.service : this.props.pair.runningService
            })
        });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value }, () => { this.props.updatePairedMachine(this.props.index, this.state.machine, this.state.service); })
    }

    handleSelect = (value) => {
        this.setState({ machine: value }, () => {
            this.props.updatePairedMachine(this.props.index, this.state.machine, this.state.service);
        })
    }

    render() {
        return (
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }} >
                <div style={{ width: '100%' }}>
                    <Autocomplete
                        name='machine'
                        items={this.state.machines}
                        getItemValue={(item) => item.label}
                        renderItem={(item, isHighlighted) =>
                            <div key={this.state.machines.indexOf(item)} style={{ background: isHighlighted ? '#eee' : 'white' }}>
                                {item.label}
                            </div>
                        }
                        shouldItemRender={(item, value) => (item.label.length < 3 && item.label.toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.label.toLowerCase().indexOf(value.toLowerCase()) > -1 && value.length > 2)}
                        value={this.state.machine}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                        menuStyle={menu}
                        inputProps={{ name: 'machine', placeholder: 'Machine associée', size: '30' }}
                    />
                </div>
                <div style={{ width: '100%' }}>
                    <input
                        name="service"
                        type="text"
                        margin="normal"
                        placeholder="Service associé"
                        value={this.state.service}
                        onChange={this.handleChange}
                        style={{ width: '80%' }}
                    />
                </div>
            </div>
        )
    }
}
