import React from 'react';
import { Card, Typography } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import { format } from 'date-fns';

export default function SortieCard ({ sortie }) {

  return <>
    <Card sx={{textAlign:"center", padding: '10px', backgroundColor: '#FDFD96'}}>
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
    </Card>
  </>;
};

// import React, { useState } from "react";
// import { Card, Typography, Pagination } from '@mui/material';
// import CachedIcon from '@mui/icons-material/Cached';
// import { format } from 'date-fns';
// import usePagination from './sortiepagination';

// export default function SortieCard ({ sortie }) {
//   let [page, setPage] = useState(1);
//   const PER_PAGE = 5;
  
//   const count = Math.ceil(sortie.length / PER_PAGE);
//   const _DATA = usePagination(sortie, PER_PAGE);

//   const handleChange = (e, p) => {
//     setPage(p);
//     _DATA.jump(p);
//   };
  
//   return <>
//     <Card sx={{textAlign:"center", padding: '10px', backgroundColor: '#FDFD96'}}>
//       {sortie.is_quickturn ? <CachedIcon /> : null}
//       <Typography sx={{fontWeight: 'bold'}}>
//         {sortie.callsign}
//       </Typography>
//       <Typography>
//         Tail: {sortie.tail_number}
//       </Typography>
//       <Typography sx={{color: 'green', fontWeight:'bold'}}>
//         {format(new Date(sortie.projected_launch), 'HH:mm')} - {format(new Date(sortie.projected_land), 'HH:mm')}
//       </Typography>
//         <Pagination count={count} page={page} color="primary" onChange={handleChange}/>
//     </Card>
//   </>;
// };
