import Table from "../components/Table"
import { Alert } from "@mui/material";

const WithError = (Component) => ({error, ...props}) => {
   const messageError = (error && error.message) ? error.message : 'Error';
   return (
      error
         ? <Alert severity="error">{messageError}</Alert>
         : <Component {...props} />
   )
}

export const WithErrorTable = WithError(Table);