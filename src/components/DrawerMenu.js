import React, { Component } from 'react';
import { Drawer } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Label } from 'reactstrap'
import GetAllLabels from './GetAllLabels';
import CreateLabel from './CreateLabel';
class DrawerMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            status: false,
            allLabels: [],
        }
        // this.labelToCards = React.createRef();

    }

    
    // getNewLabel = (newLabel) => {
    //     console.log("newnote==>", newLabel);

    //     this.labelToCards.current.displayCard(newLabel);
    // }

    handleLabelOpen = ()=>{
        this.setState({open:!this.state.open})
    }

    handleReminder = ()=>{
        // this.props.DrawerMenuToDashboard(true, false, false, false);
        this.props.props.history.push('/reminder');
    }

    handleArchived = ()=>{
        // this.props.DrawerMenuToDashboard(false, false, true, false);
        this.props.props.history.push('/archive');
    }

    handleTrash = ()=>{
        // this.props.DrawerMenuToDashboard(false, true, false, false);
        this.props.props.history.push('/trash');
    }
    handleNotes = ()=>{
        // this.props.DrawerMenuToDashboard(false, false, false, true);
        this.props.props.history.push('/dashboard');
    }

    // GetAllLabelToDrawerMenu = (allLabels) => {
    //     this.setState({
    //         allLabels:allLabels
    //     })

    // }

    render() {
        return (
            <div>
                <Drawer
                    variant="persistent"
                    open={this.props.appBarProps}
                    width={200}
                   
                >
                    <MenuItem onClick={this.handleNotes} className="links">
                    <img className="update-card-img"
                            src={require('../assets/img/notes.svg')}
                            alt="color picker" />
                    <span className="fundoo-text-sidebar">Notes</span>
                    </MenuItem>

                    <MenuItem onClick={this.handleReminder} className="links">
                    <img className="update-card-img"
                            src={require('../assets/img/reminder.svg')}
                            alt="reminder" />
                        <span className="fundoo-text-sidebar">Reminders</span>
                    </MenuItem>

                    <div style={{ borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey" }}>
                        <div style={{ marginRight: "218px", fontSize: "12px", marginBottom: "10px", marginTop: "10px", fontFamily: "arial" }}>
                            <Label className="fundoo-text-sidebar">Labels</Label>
                        </div>
                        <div>
                            <GetAllLabels
                            sidebarLabel = {true}
                            props={this.props.props}
                            />
                            <MenuItem
                            onClick={this.handleLabelOpen}
                            className="links"
                            >
                            <CreateLabel
                            sidebarLabel = {this.state.open}
                            />
                            </MenuItem>
                        </div>
                    </div>

                    <MenuItem onClick={this.handleArchived}
                    className="links">
                        <img className="update-card-img"
                            src={require('../assets/img/archived.svg')}
                            alt="color picker" />
                            <span className="fundoo-text-sidebar">Archive</span>
                    </MenuItem>

                    <MenuItem onClick={this.handleTrash}
                    className="links">
                    <img className="update-card-img"
                    src={require('../assets/img/trash.svg')}
                    alt="trash notes"
                    />
                    <span className="fundoo-text-sidebar">Trash</span>
                    </MenuItem>
                </Drawer>
            </div>
        )
    }
}

export default DrawerMenu