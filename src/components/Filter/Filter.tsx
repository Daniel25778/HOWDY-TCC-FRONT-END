import { Flex,Text, Button, Menu, MenuItem, MenuList, MenuButton } from "@chakra-ui/react";
import { FaRegStar } from "react-icons/fa";
import { IoIosFitness, IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineTag } from "react-icons/ai";


export default function Filter(){
    return(
        <>
        
        <Flex align="flex-start" flexDir={"column"} h="20%" w="13%" gap="5">
       
            <Menu size="100%">
            <Text fontWeight="bold">Filtros e ordem </Text>
            <MenuButton>
                <Button  w="100%" color="#303135" fontWeight="medium" leftIcon={<FaRegStar color="#FFD700" size="1.5rem"/>} justifyContent="space-between" rightIcon={<IoMdArrowDropdown/>}>Ordenar por</Button>
            </MenuButton>

            <MenuButton>
                <Button  w="100%" color="#303135" fontWeight="medium" leftIcon={<IoIosFitness color="#FA383E" size="1.5rem"/>} justifyContent="space-between" rightIcon={<IoMdArrowDropdown/>}>Dificuldade</Button>
            </MenuButton>

            <MenuButton>
            <Button w="123%" color="#303135" fontWeight="medium" leftIcon={<AiOutlineTag color="#29B995" size="1.5rem"/>} justifyContent="space-between" px="5" rightIcon={<IoMdArrowDropdown/>} textAlign="start">Preço</Button>
            </MenuButton>
            
                <MenuList>
                     <MenuItem>Data</MenuItem>
                     <MenuItem>Idioma</MenuItem>
                     <MenuItem>Avalição</MenuItem>
                </MenuList>
               
            </Menu>
            
        </Flex>
        
        </>
    )
}