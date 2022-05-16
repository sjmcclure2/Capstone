import React, { useEffect, useState } from 'react';
import {  Box, Card, IconButton, Tooltip, Typography } from '@mui/material';
import { format } from 'date-fns';

import AddNote from './modals/addnote';
import EditNote from './modals/editnote';

export default function Notes(props) {
  const tail = props.tail;
  const [ notes, setNotes ] = useState(props.tail.driver.notes)

  useEffect(() => {}, [notes]);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  }

  const updateNote = (idToUpdate, updatedNote) => {
    const indexToUpdate = notes.findIndex(note => note.id === idToUpdate);
    const updatedNotes = notes.slice();
    updatedNotes.splice(indexToUpdate, 1, updatedNote);
    setNotes(updatedNotes);
  }

  return (
    <Box>
      <Card elevation={0} sx = {{padding: '10px', marginBottom: '10px', backgroundColor: '#ded9cc', borderBottomStyle: 'groove'}}>
        {notes.map(note => ( 
          <Box key={note.id}>
            <Typography color='secondary'>
              <i><small>{format(new Date(note.updated_at), 'P, p')}</small></i>
            </Typography>
            <Typography sx={{paddingBottom: '2px'}}>
              {note.note} 
              <IconButton>
                <EditNote note={note} updateNote={updateNote}/>
              </IconButton>
            </Typography>
          </Box> 
      ))}
          <Tooltip title="Add">
            <IconButton>
              <AddNote tail={tail} addNote={addNote}/>
            </IconButton>
          </Tooltip>
      </Card>
    </Box>
  )
}