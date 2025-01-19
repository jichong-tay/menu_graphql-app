import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import Product from "./Product";
import { getRandomImage } from "../utils/getRandomImage";

interface MainMenuProps {
  menus: {
    menuSections: {
      section: {
        id: string;
        label: string;
        description: string;
        available: string;
        items: {
          id: string;
          identifier: string;
          label: string;
          description: string;
          price: number;
          available: string;
        }[];
      };
      displayOrder: number;
    }[];
  }[];
  onSectionChange: (index: number) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ menus, onSectionChange }) => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [assignedImages, setAssignedImages] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(
              entry.target as HTMLElement
            );
            if (index !== -1) {
              onSectionChange(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [onSectionChange]);

  const getImageForProduct = (productId: string) => {
    if (!assignedImages[productId]) {
      const randomImage = getRandomImage();
      setAssignedImages((prevImages) => ({
        ...prevImages,
        [productId]: randomImage,
      }));
      return randomImage;
    }
    return assignedImages[productId];
  };

  return (
    <Grid container spacing={4}>
      {menus.map((menu, menuIndex) =>
        menu.menuSections
          .slice()
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((menuSection, sectionIndex) => {
            const sectionAvailable = menuSection.section.available === "Y";
            return (
              <React.Fragment
                key={`${menuIndex}-${menuSection.section.id || sectionIndex}`}
              >
                {/* Section Anchor */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    opacity: sectionAvailable ? 1 : 0.5,
                  }}
                >
                  <Box
                    id={`section-${sectionIndex}`}
                    ref={(el: HTMLElement | null) =>
                      (sectionRefs.current[sectionIndex] = el)
                    }
                    sx={{ marginBottom: 0 }}
                  >
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      {menuSection.section.label}
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    {menuSection.section.description}
                  </Typography>
                </Grid>

                {/* Section Items */}
                {menuSection.section.items.map((item) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={item.id}
                    sx={{
                      opacity:
                        sectionAvailable && item.available === "Y" ? 1 : 0.5,
                    }}
                  >
                    <Product
                      identifier={item.identifier}
                      label={item.label}
                      description={item.description}
                      price={item.price}
                      pictureUrl={getImageForProduct(item.id)}
                      available={sectionAvailable && item.available === "Y"}
                    />
                  </Grid>
                ))}
              </React.Fragment>
            );
          })
      )}
    </Grid>
  );
};

export default MainMenu;
