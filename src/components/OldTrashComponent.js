import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Container } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.min.css';
import { Chip, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreOptions from './MoreOptions';
import GetNote from '../services/NoteServices';

const NoteService = new GetNote();
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing(1),
    },
}));

function searchingFor(search) {
    return function (x) {
        return x.title.includes(search) || x.description.includes(search)
    }
}

class RemindersDisplayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteId: '',
            title: '',
            description: '',
            modal: false,
            allNotes: [],
            isTrashed: true,
        }
    }



    componentDidMount(){
        NoteService.getTrashNotes()
        .then(response => {
            // console.log("trash notes ", response);
            this.setState({
                allNotes: response.data.data.data
            })
            
        })
    }

    getUpdateNotes(){
        NoteService.getTrashNotes()
        .then(response => {
            console.log("getALl notes in trash component ", response);
            this.setState({
                allNotes: response.data.data.data
            })
            
        })
    }

    handleToggleOpen = (id, oldTitle, oldDescription) => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            noteId: id,
            title: oldTitle,
            description: oldDescription
        }));

        console.log("id ......", id);
        console.log("note id ......", this.state.noteId);

        //update existing Note
        try {
            if (this.state.modal && (this.state.description !== oldTitle || this.state.title !== oldDescription)) {
                var data = {
                    'noteId': this.state.noteId,
                    'title': this.state.title,
                    'description': this.state.description
                }
                let formData = new FormData();    //formdata object
                formData.append('noteId', this.state.noteId);
                formData.append('title', this.state.title);   //append the values with key, value pair
                formData.append('description', this.state.description);

                console.log("get all note data", data);

                NoteService.updateNote(data)
                    .then(response => {
                        console.log("uddate note function", response);
                        this.getUpdateNotes();
                    })
                    .catch(err => {
                        console.log("Eroorrrrrr....", err);
                    })
            }
        } catch {

        }
    }

    handleClose = () => {
        this.setState({
            modal: false
        })
    }

    handleDeleteChip = (noteId) => {
        var note = {
            'noteIdList': [noteId],
            'reminder': []
        }

        NoteService.removeReminderNotes(note)
            .then(response => {
                console.log("update reminder >>>", response);
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    handleDelete = (noteId) => {
        var note = {
            'noteIdList': [noteId],
            'isDeleted': true
        }

        NoteService.deleteForeverNote(note)
            .then(response => {
                this.getUpdateNotes();
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    handleRestore = (noteId) => {
        var note = {
            'noteIdList': [noteId],
            'isDeleted': false
        }

        NoteService.trashNote(note)
            .then(response => {
               
                NoteService.getAllNotes()
                .then(response => {
                    console.log("trash notes ", response);
                    this.setState({
                        allNotes: response.data.data.data
                    })
                    this.props.ReminderComponentToAllNotes(this.state.allNotes)
                })
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        var listgridvalue = this.props.listGridView;
        const listgridview = listgridvalue ? "list-view" : "default-view";
        const modalbottom = listgridvalue ? "list-view-bottom" : "card-bottom";
        const allTrash = this.state.allNotes.filter(searchingFor(this.props.searchNote)).map(key => {
            return (
                (key.isDeleted === true)&&
                    <div key={key.id} className={listgridview}>
                        <div>
                            <Container className="card-margin" >
                                <Card className="take-note-user-card-description "
                                    onChange={() => this.handleColorChanger(key.color, key.id)}
                                    style={{ backgroundColor: key.color }}>
                                    <CardBody className="user-card-body-desc">
                                        <CardTitle>
                                            <input
                                                type="text"
                                                className="take-note-input"
                                                placeholder="Title"
                                                value={key.title}
                                                onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
                                                readOnly
                                                style={{ backgroundColor: key.color }}
                                            />
                                        </CardTitle>
                                        <textarea
                                            className="take-note-input note-description"
                                            rows="5"
                                            placeholder="Take a note"
                                            value={key.description}
                                            onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
                                            readOnly
                                            style={{ backgroundColor: key.color }}
                                        />

                                        {(key.reminder.length > 0) &&
                                            <div>
                                                <Chip
                                                    // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                                                    label={key.reminder.toString().substring(0, 24)}
                                                    onDelete={() => this.handleDeleteChip(key.id)}
                                                    className={useStyles.chip}
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            </div>
                                        }
                                    </CardBody>
                                    <CardBody >
                                        <div className={modalbottom}>
                                            
                                            <MoreOptions
                                                toolsPropsToMoreOptions={this.handleDelete}
                                                moreOptionsToTrashNotes={this.handleRestore}
                                                noteID={key.id}
                                                id="color-picker"
                                                isTrashed={true}
                                                >
                                            </MoreOptions>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Container>
                        </div>

                        {(this.state.noteId === key.id) &&
                            <div key={key.id} >
                                <Dialog
                                    key={key.id}
                                    open={this.state.modal}
                                    onClose={this.handleClose}
                                    aria-labelledby="responsive-dialog-title"
                                    className="dialog-bottom-icons"
                                >

                                    <Card className="take-note-user-card-dialog"
                                        onChange={() => this.handleColorChanger(key.color, key.id)}
                                        style={{ backgroundColor: key.color }}>
                                        <CardBody className="user-card-body-desc">
                                            <CardTitle>
                                                <textarea
                                                    style={{ backgroundColor: key.color }}
                                                    type="text"
                                                    className="take-note-input"
                                                    placeholder="Title"
                                                    name="title"
                                                    value={this.state.title}
                                                    readOnly
                                                    rows="2"
                                                />
                                            </CardTitle>
                                            <textarea
                                                style={{ backgroundColor: key.color }}
                                                className="take-note-input note-description"
                                                rows="5"
                                                placeholder="Take a note"
                                                name="description"
                                                value={this.state.description}
                                                readOnly                                            />

                                            {(key.reminder.length > 0) &&
                                                <div>
                                                    <Chip
                                                        // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                                                        label={key.reminder.toString().substring(0, 24)}
                                                        onDelete={() => this.handleDeleteChip(key.id)}
                                                        className={useStyles.chip}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </div>
                                            }
                                        </CardBody>
                                            <div
                                                className="modal-footer-note"
                                            >
                                                
                                                <MoreOptions
                                                toolsPropsToMoreOptions={this.handleDelete}
                                                moreOptionsToTrashNotes={this.handleRestore}
                                                noteID={key.id}
                                                id="color-picker"
                                                isTrashed={true}
                                                >
                                            </MoreOptions>
                                            </div>
                                    </Card>
                                </Dialog>
                            </div>}
                    </div>
            )
        })
        return (
            <div className="all-trash">
                {allTrash}
            </div>
        )
    }
}

export default RemindersDisplayComponent