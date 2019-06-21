import React, { Component } from 'react'
import { Card, CardText, CardBody, CardTitle, CardLink, Label } from 'reactstrap'
import NoteServices from '../services/NoteService';


const addNotes = new NoteServices().addNotes;
class CreateNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            description: '',
            title: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleToggleOpen = (e) =>{
        this.setState({open : true})
        this.setState({ description: null});
        this.setState({ title: null});
    }

    handleToggle = (e) => {
        this.setState({ open: !this.state.open });
        try {
            if (this.state.description !==null && this.state.title !== null) {
                var data = {
                    'title': this.state.title,
                    'description': this.state.description
                }
                let formData = new FormData();    //formdata object
                formData.append('title',this.state.title);   //append the values with key, value pair
                formData.append('description',this.state.description);
                //console.log(data);
                addNotes(data)
            }
        } catch {

        }
    }
    render() {
        const { description, title } = this.state;
        return (!this.state.open ?
            <div className="take-note-div">
                <Card className="take-note-card " >
                    <CardBody className="card-body-text">
                        <CardText>
                            <input
                                type="text"
                                className="take-note-input"
                                placeholder="Take a note..."
                                onClick={this.handleToggleOpen}
                            />
                        </CardText>
                        <CardText>
                            <CardLink ><i className="fa fa-pencil fa-fw fa-lg " aria-hidden="true"></i></CardLink>
                            <CardLink ><i className="fa fa-check-square-o fa-fw fa-lg " aria-hidden="true"></i></CardLink>
                        </CardText>
                    </CardBody>
                </Card>
            </div>
            :
            <div className="take-note-div-desc">
                <Card className="take-note-card-description ">
                    <CardBody className="card-body-desc">
                        <CardTitle>
                            <input type="text"
                                className="take-note-input"
                                placeholder="Title"
                                name="title"
                                value={title}
                                onChange={this.handleChange}
                            />
                        </CardTitle>
                        <CardText>
                            <textarea
                                className="take-note-input note-description"
                                rows="5"
                                placeholder="Take a note"
                                name="description"
                                value={description}
                                onChange={this.handleChange}
                            />
                        </CardText>
                    </CardBody>
                    <CardBody className="card-bottom">
                        <CardText>
                            <CardLink ><i className="fa fa-bell-o fa-fw fa-lg" aria-hidden="true"></i></CardLink>
                            <CardLink ><i className="fa fa-user-plus fa-fw fa-lg" aria-hidden="true"></i></CardLink>
                            <CardLink ><img className="img" src={require('../assets/img/color.svg')} alt="color picker" /></CardLink>
                            <CardLink ><i className="fa fa-archive fa-fw fa-lg" aria-hidden="true"></i></CardLink>
                            <CardLink ><i className="fa fa-picture-o fa-fw fa-lg" aria-hidden="true"></i></CardLink>
                            <CardLink ><i className="fa fa-check-square-o fa-fw fa-lg" aria-hidden="true"></i></CardLink>
                            <CardLink ></CardLink>
                            <CardLink ></CardLink>
                        </CardText>

                        <CardText>
                            <CardLink
                            className="close-btn"
                            onClick={this.handleToggle}
                            >
                            <Label>Close</Label>
                        </CardLink>
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
export default CreateNote;

