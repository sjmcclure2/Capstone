import { Card, Box, Typography, IconButton, Tooltip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { notes } from '../mockData';
import { format } from 'date-fns';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function Notes(props) {
  const tail = props.tail;
  const [notess, setNotes] = useState(notes);
  const [jobs, setJobs] = useState();  

  // Fetch request to get notes and jcn's associated with them

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
        {notess.map(note => (
          note.jcn === tail.driver_jcn.jcn ? 
          <Box>
            <Typography
              color='secondary'
            >
              <i><small>{format(new Date(), 'P, p')}</small></i>
            </Typography>
            <Typography
              sx={{
                paddingBottom: '5px'
              }}
            >
              {note.note} 
              <IconButton>
                <EditOutlinedIcon
                  fontSize='small'
                />
              </IconButton>
            </Typography>
          </Box>
        : null  
      ))}
          <Tooltip title="Add">
            <IconButton>
              <AddOutlinedIcon/>
            </IconButton>
          </Tooltip>
      </Card>
      <Typography
        variant='h5'
      >
        Open JCNs/Notes
      </Typography>
      <Card
        elevation={0}
        sx={{
          padding: '10px',
          backgroundColor: '#ded9cc'
        }}
      >
        <Typography
          color='secondary'
        >
          <i><small>{format(new Date(), 'P, p')}</small></i>
        </Typography>
        <Typography
          sx={{
            paddingBottom: '5px'
          }}
        >
          Notes loop here 
          <Tooltip title="Edit">
          <IconButton>
            <EditOutlinedIcon
              fontSize='small'
            />
          </IconButton>
          </Tooltip>
        </Typography>
        <Tooltip title="Add">
            <IconButton>
              <AddOutlinedIcon/>
            </IconButton>
          </Tooltip>
      </Card>
    </Box>
  )
}