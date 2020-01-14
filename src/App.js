import React from 'react'
import Routes from './routes'
import { SnackbarProvider } from "notistack";


const App = () => {
  return(
    <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    autoHideDuration={2400}
  >
    <Routes/>
    </SnackbarProvider>

  )
}

export default App