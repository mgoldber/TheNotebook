import React from 'react';
import Field from '../Field';

class CreateNote extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        // 1. Get the contents of the note as well as the user who created it
        const note = Object.assign({}, this.state);
        note.author = this.props.user._id;
        // 2. Post that to our back end to create a note
        fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(note)
        })
        .then(this.props.onCreate)
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <div className="formBox addNote">
                <h2>Add a Note</h2>
                <form onSubmit={this.handleSubmit}>
                    <Field
                        type="text"
                        name="title"
                        label="Enter the title of your note: "
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <Field
                        type="text"
                        name="description"
                        label="Enter a description of your note: "
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <button>Create Note</button>
                </form>
            </div>
        );
    }
}

export default CreateNote;