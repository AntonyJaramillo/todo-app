import { Box} from "@mui/material";

export const PageTitle = ({ children}) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ color: "#fff", fontFamily: "Roboto" }}
    >
      <h1>
        {children} 
      </h1>
    </Box>
  );
};
