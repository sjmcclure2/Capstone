import React from 'react';
import { Typography, Grid } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import { format } from 'date-fns';

export default function SortieCard ({ sortie }) {
  return <>
      <Grid item sx={{textAlign:"center", padding: '10px', backgroundColor: '#FDFD96', flex: '0 0 auto', WebkitOverflowScrolling : 'touch'}}>
        {sortie.is_quickturn ?
          <>
            <CachedIcon />
            <i>Quick Turn</i>
          </> :
          <Typography>&nbsp;</Typography>}
        <Typography sx={{fontWeight: 'bold'}}>
          {sortie.callsign}
        </Typography>
        <Typography>
          Tail: {sortie.tail_number}
        </Typography>
        <Typography sx={{color: 'green', fontWeight:'bold'}}>
          {format(new Date(sortie.projected_launch), 'HH:mm')} - {format(new Date(sortie.projected_land), 'HH:mm')}
        </Typography>
      </Grid>
    </>;
};
