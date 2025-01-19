import React from "react";
import { Tabs, Tab, Box, useMediaQuery, useTheme } from "@mui/material";

interface SideMenuProps {
  menus: {
    menuSections: {
      section: {
        id: string;
        label: string;
        items: {
          id: string;
          identifier: string;
          label: string;
          description: string;
          price: number;
        }[];
      };
      displayOrder: number;
    }[];
  }[];
  currentSectionIndex: number;
  onSectionChange: (index: number) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({
  menus,
  currentSectionIndex,
  onSectionChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    onSectionChange(newValue);

    // Scroll to the corresponding section
    const targetId = `section-${newValue}`;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "240px" },
        flexShrink: 0,
        boxSizing: "border-box",
        padding: 2,
        position: { xs: "relative", sm: "fixed" },
        height: { xs: "auto", sm: "100vh" },
        overflowY: { xs: "visible", sm: "auto" },
      }}
    >
      <Tabs
        value={currentSectionIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        orientation={isMobile ? "horizontal" : "vertical"}
      >
        {menus.map((menu) =>
          menu.menuSections
            .slice()
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((menuSection) => (
              <Tab
                key={menuSection.section.id}
                label={menuSection.section.label}
              />
            ))
        )}
      </Tabs>
    </Box>
  );
};

export default SideMenu;
