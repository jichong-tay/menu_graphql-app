import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import MainMenu from "./MainMenu";
import SideMenu from "./SideMenu";

const GET_PRODUCTS = gql`
  query {
    menus {
      identifier
      label
      state
      startDate
      endDate
      menuSections {
        displayOrder
        section {
          identifier
          label
          description
          available
          items {
            id
            type
            identifier
            label
            description
            price
            available
          }
        }
      }
    }
  }
`;

const Menu = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        padding: 2,
      }}
    >
      <SideMenu
        menus={data.menus}
        currentSectionIndex={currentSectionIndex}
        onSectionChange={setCurrentSectionIndex}
      />
      <Container
        sx={{
          flexGrow: 1,
          paddingLeft: { xs: 0, sm: 2 },
          paddingTop: { xs: 2, sm: 0 },
          marginLeft: { sm: "240px" }, // Adjust main content to account for fixed SideMenu
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Menu
        </Typography>
        <MainMenu menus={data.menus} onSectionChange={setCurrentSectionIndex} />
      </Container>
    </Box>
  );
};

export default Menu;
