import React, { useState } from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";
import AddButton from "./AddButton";
import ProductDetailModal from "./ProductDetailModal";

interface ProductProps {
  identifier: string;
  label: string;
  description: string;
  price: number;
  pictureUrl: string;
  available: boolean;
}

const Product: React.FC<ProductProps> = ({
  identifier,
  label,
  description,
  price,
  pictureUrl,
  available,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          marginBottom: 2,
          overflow: "hidden",
          cursor: "pointer",
          opacity: available ? 1 : 0.5,
        }}
        onClick={handleOpen}
      >
        <Box
          component="img"
          src={pictureUrl}
          alt={label}
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              component="div"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                height: 60,
                paddingBottom: 1,
              }}
            >
              {description}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Typography variant="body1" color="text.primary">
              ${price.toFixed(2)}
            </Typography>
            <Box onClick={(e) => e.stopPropagation()}>
              <AddButton productId={identifier} available={available} />
            </Box>
          </Box>
        </CardContent>
      </Card>
      {available && (
        <ProductDetailModal
          open={open}
          onClose={handleClose}
          product={{ label, description, price, pictureUrl }}
        />
      )}
    </>
  );
};

export default Product;
