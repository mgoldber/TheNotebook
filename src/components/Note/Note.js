import React from 'react';

const Note = ({_id, title, description, author, onDelete, user}) => {
  const deleteNote = (e) => {
    e.preventDefault();
    fetch(`/api/notes/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => onDelete());
  }

  return <li>
    <strong>{ title }</strong> - { description }&nbsp;

    { author === user._id ?
      <a href='#' className="deleteButton" onClick={deleteNote}>delete <span class="x">&#215;</span></a> :
      null
    }
  </li>
}

export default Note;