import React from 'react';
import Autocomplete from 'react-autocomplete';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

let flexContainer = {
    display: 'flex'
}

export default class PairAppMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            machine: "",
            service: ""
        }
    }

    componentDidMount() {
        this.setState({
            machine: this.props.pair.machine,
            service: this.props.pair.service
        })
    }
    render() {
        return (
            <div >
                <div>
                    <TextField
                        name="appCode"
                        type="text"
                        fullWidth
                        margin="normal"
                        variant="filled"
                        label="Service associé"
                        value={this.state.machine}
                    />
                </div>
                <div>
                    <TextField
                        name="appCode"
                        type="text"
                        fullWidth
                        margin="normal"
                        variant="filled"
                        label="Service associé"
                        value={this.state.service}
                    />
                </div>
            </div>
        )
    }
}
