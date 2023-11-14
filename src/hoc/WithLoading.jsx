import Loading from "../components/Loading"
import { Button } from "@mui/material";

const WithLoading = (Component) => ({ isLoading, ...rest }) =>
   isLoading
      ? <Loading />
      : <Component { ...rest } />


export const WithLoadingButton = WithLoading(Button);