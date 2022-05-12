import React from 'react';
import {  Box, Card, IconButton, Tooltip, Typography } from '@mui/material';
import { format } from 'date-fns';

import AddNote from './modals/addnote';
import EditNote from './modals/editnote';

export default function Notes(props) {
  const tail = props.tail;

  return (
    <Box>
      <Card 
        elevation={0}
        sx = {{
          padding: '10px',
          marginBottom: '10px',
          backgroundColor: '#ded9cc',
          borderBottomStyle: 'groove'
        }}
      >
        {tail.driver.notes.map(note => ( 
          <Box
            key={note.id}
          >
            <Typography
              color='secondary'
            >
              <i><small>{format(new Date(note.updated_at), 'P, p')}</small></i>
            </Typography>
            <Typography
              sx={{
                paddingBottom: '2px'
              }}
            >
              {note.note} 
              <IconButton>
                <EditNote tail={tail} note={note}/>
              </IconButton>
            </Typography>
          </Box> 
      ))}
          <Tooltip title="Add">
            <IconButton>
              <AddNote tail={tail}/>
            </IconButton>
          </Tooltip>
      </Card>
    </Box>
  )
}