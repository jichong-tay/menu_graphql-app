import React, { useState } from "react";
import { Button, Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface AddButtonProps {
  productId: string;
  available: boolean;
  initialCount?: number;
}

const AddButton: React.FC<AddButtonProps> = ({
  available,
  initialCount = 0,
}) => {
  const [count, setCount] = useState(initialCount);

  const handleAddToCart = () => {
    if (available) {
      setCount(count + 1);
    }
  };

  const handleRemoveFromCart = () => {
    if (available) {
      setCount(count > 0 ? count - 1 : 0);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {count === 0 ? (
        <Button
          sx={{ whiteSpace: "nowrap" }}
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          disabled={!available}
        >
          {available ? "Add" : "Unavailable"}
        </Button>
      ) : (
        <>
          <IconButton
            color="primary"
            onClick={handleRemoveFromCart}
            disabled={!available}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1">{count}</Typography>
          <IconButton
            color="primary"
            onClick={handleAddToCart}
            disabled={!available}
          >
            <AddIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default AddButton;
