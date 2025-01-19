import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

interface ProductDetailModalProps {
  open: boolean;
  onClose: () => void;
  product: {
    label: string;
    description: string;
    price: number;
    pictureUrl: string;
  };
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.5 } },
};

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  open,
  onClose,
  product,
}) => {
  if (!open) return null;

  return (
    <motion.div
      className="backdrop"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300, // Ensure the modal is on top of other content
      }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        variants={modalVariants}
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "20px",
          width: "90%",
          maxWidth: "500px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          {product.label}
        </Typography>
        <Box
          component="img"
          src={product.pictureUrl}
          alt={product.label}
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            marginBottom: 2,
          }}
        />
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {product.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetailModal;
