import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

export default function HoverRating(props) {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  if(props.status==="Answered"){
  return (
    <div>
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      
      {value !== null && (
        
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
    <form action='http://localhost:5000/RateTechSupport' method='post'>
      <input value={props.tech_id} name="tech_id" hidden="true"></input>
      <input value={value} name="rating" hidden="hidden"></input>
      <input value={props.msg_id} name="id" hidden="true"></input>
      <button type='submit'>submit</button></form>
      
    </div>
    
  );
      
    }
    else if(props.status==="Pending")
    {
      return <h6>Please await our response.</h6>
    }
    else{
      return <h6>thank you for rating us</h6>
    }
  }
