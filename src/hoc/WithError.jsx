import Error from "../components/Error";
import Table from "../components/Table"

const WithError = (Component) => ({error, ...props}) =>
   error
      ? <Error error={error} />
      : <Component {...props} />

export const WithErrorTable = WithError(Table);