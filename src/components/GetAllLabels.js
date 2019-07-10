import React, { Component } from 'react'
import LabelService from '../services/LabelServices';
import { MenuItem } from '@material-ui/core';
import Check from '@material-ui/icons/Check'

const LabelServices = new LabelService();
export default class GetAllLabels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allLabels: [],
            mouseOver:false,
        }
    }

    componentDidMount() {
        LabelServices.getLabels()
            .then(allLabels => {
                this.setState({ allLabels: allLabels.data.data.details })
                console.log("this data", this.state.allLabels);
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleMounseEvent = (labelId) =>{
        this.setState({
            mouseOver:!this.state.mouseOver,
            labelId : labelId,
        })
    }

    handleDeleteLabel =(labelId)=>{
        this.setState({
            labelId:labelId
        })

        var labelData = {
            'id' : labelId,
        }

        LabelServices.deleteNoteLabel(labelData.id)
        .then(() => {
            LabelServices.getLabels()
            .then(allLabels => {
                this.setState({ allLabels: allLabels.data.data.details })
                console.log("this data", this.state.allLabels);
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(error =>{
            console.log(error);
            
        })
    }

    render() {
        const labels = this.state.allLabels.map((key) => {
            return (
                this.props.sidebarLabel ?
                <MenuItem key={key.id}>
                    <img className="update-card-img"
                        src={require('../assets/img/label.svg')}
                        alt="label"
                        
                    />
                    <span className="fundoo-text-sidebar">{key.label}</span>

                </MenuItem>
                :
                this.props.editLabels ?
                <div className="edit-label-dialog" key={key.id}>
                    {!this.state.mouseOver ?
                    <div className="edit_label_gray">
                    <img className="update-card-img"
                        src={require('../assets/img/edit_label_gray.png')}
                        alt="label"
                        onMouseOver = {() => this.handleMounseEvent(key.id)}
                    />
                    </div>
                    :
                    (this.state.labelId === key.id) ?
                    <div className="delete_label_gray" key={key.id}>
                    <img className="update-card-img"
                        src={require('../assets/img/delete_grey.png')}
                        alt="label"
                        onMouseLeave ={this.handleMounseEvent}
                        onClick={() => this.handleDeleteLabel(key.id)}
                    />
                    </div>
                    :
                    <div className="edit_label_gray">
                    <img className="update-card-img"
                        src={require('../assets/img/edit_label_gray.png')}
                        alt="label"
                        onMouseOver = {() => this.handleMounseEvent(key.id)}
                    />
                    </div>
                    }
                    <div>
                    <span className="label-text">{key.label}</span>
                    </div>
                    <div>
                        <Check/>
                    </div>
                </div>
                
                :
                this.props.createLabelNoteCreate && 
                <div key={key.id}>
                <span>{key.label}</span>
                </div>
            )
        })
        return (
            <div>
                {labels}
            </div>
        )
    }
}
