import * as React from 'react';
import { Box, Card, Paper, Stack, Divider} from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function FlyingSchedule () {
  return(
    <Box>
      <Card sx={{textAlign: 'center'}}>
        <h1>Mon, 2 May 2022</h1>
        <Stack 
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            justifyContent='center'
        >          
          <Item>Reaper - 130 <br/> 0700-0945 <br/> 59-0001</Item>
          <Item>Reaper - 130 <br/> 0700-0945 <br/> 85-0080</Item>
          <Item>Reaper - 130 <br/> 0700-0945 <br/> 59-0001</Item>
          <Item>Reaper - 130 <br/> 0700-0945 <br/> 59-0001</Item>
          <Item>Reaper - 130 <br/> 0700-0945 <br/> 59-0001</Item>
        </Stack>  
      </Card>
    </Box>
  )
}

export default FlyingSchedule;