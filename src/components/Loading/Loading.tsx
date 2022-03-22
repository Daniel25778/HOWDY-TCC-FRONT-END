import * as React from "react";
import { ChakraProvider, chakra, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const MotionBox = motion(chakra.div);

export default function Loading() {
  return (
    <ChakraProvider>
      <Container h="100vh" d="flex" alignItems="center" justifyContent="center">
        <MotionBox
          as="aside"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1
          }}
          padding="2"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          width="12"
          height="12"
          display="flex"
        />
      </Container>
    </ChakraProvider>
  );
}
