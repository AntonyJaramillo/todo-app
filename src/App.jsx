
import { Box, Container } from "@mui/material";
import { PageTitle } from "./components/PageTitle";
import { AppHeader } from "./components/AppHeader";
import { Toaster } from "react-hot-toast";
import { AppContent } from "./components/AppContent";

function App() {
  return (
    <>
      <Box sx={{backgroundColor:"#1f242d", minHeight: "100vh" , paddingTop:"30px"}}>
        <Container maxWidth="md" >
          <PageTitle>TODO LIST</PageTitle>
          <AppHeader />
          <AppContent/>
        </Container>
        <Toaster position="bottom-right" reverseOrder={false} />
      </Box>
    </>
  );
}

export default App;
