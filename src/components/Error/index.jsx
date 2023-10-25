const Error = ({ error }) => {
   const messageError = (error && error.message) ? error.message : 'Error';

   return (
      <div>
         <p>{messageError}</p>
      </div>
   )
}

export default Error;