import { Typography } from "@mui/material";

const Counter = ({count}) =>
   <Typography variant="h6" mt={4} mb={2} textAlign={'center'} >
      Total records - {count}
   </Typography>

export default Counter;