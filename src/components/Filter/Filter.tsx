import { Flex,Text, Button, Menu, MenuItem, MenuList, MenuButton } from "@chakra-ui/react";
import { FaRegStar } from "react-icons/fa";
import { IoIosFitness, IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineTag } from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";

interface ActivitySelectFilterProps {
    orderByList: selectData[];
    maxPriceFilterList: selectData[];
    difficultyList: selectData[];
    setHookOrderBy: Dispatch<SetStateAction<string | number>>;
    setHookDifficulty: Dispatch<SetStateAction<string | number>>;
    setHookMaxPrice: Dispatch<SetStateAction<string | number>>;
}

interface selectData {
    label: number | string;
    value?: number | string;
}

export default function Filter({ orderByList,maxPriceFilterList,difficultyList,setHookOrderBy,setHookDifficulty,setHookMaxPrice,}: ActivitySelectFilterProps){
    function handleSetHookDifficult(value : string | number) {
        const orderBySelected: string | number = value;
        console.log("eefsdfdsf" + orderBySelected);
        setHookDifficulty(orderBySelected);
    }

    function handleSetHookOrderBy(value : string | number) {
        const orderBySelected: string | number = value;
        console.log("eefsdfdsf" + orderBySelected);
        setHookOrderBy(orderBySelected);
    }

    function handleSetHookMaxPrice(value : string | number) {
        const orderBySelected: string | number = value;
        console.log("eefsdfdsf" + orderBySelected);
        setHookMaxPrice(orderBySelected);
    }
    return(
        <>
        
        <Flex align="flex-start" flexDir={"column"}  gap="5">
        <Text fontWeight="bold">Filtros e ordem </Text>
            <Menu size="100%">
                
                <MenuButton>
                    <Button  w="100%" color="#303135" fontWeight="medium" leftIcon={<FaRegStar color="#FFD700" size="1.5rem"/>} justifyContent="space-between" rightIcon={<IoMdArrowDropdown/>}>Ordenar por</Button>
                </MenuButton>

                <MenuList>
                    {orderByList.map((item) => (
                        <MenuItem
                        onClick={() => handleSetHookOrderBy(item.label)}
                        >{item.label}</MenuItem>
                    ))}
                </MenuList>
            </Menu>

            <Menu size="100%">
                <MenuButton>
                    <Button  w="100%" color="#303135" fontWeight="medium" leftIcon={<IoIosFitness color="#FA383E" size="1.5rem"/>} justifyContent="space-between" rightIcon={<IoMdArrowDropdown/>}>Dificuldade</Button>
                </MenuButton>
                <MenuList>
                    {difficultyList.map((item) => (
                        <MenuItem
                        onClick={() => handleSetHookDifficult(item.value)}
                        >{item.label}</MenuItem>
                    ))}
                </MenuList>
            </Menu>

            <Menu size="100%">
                <MenuButton>
                    <Button w="123%" color="#303135" fontWeight="medium" leftIcon={<AiOutlineTag color="#29B995" size="1.5rem"/>} justifyContent="space-between" px="5" rightIcon={<IoMdArrowDropdown/>} textAlign="start">Preço</Button>
                </MenuButton>
                <MenuList>
                    {maxPriceFilterList.map((item) => (
                        <MenuItem
                        onClick={() => handleSetHookMaxPrice(item.label)}
                        >{item.label}</MenuItem>
                    ))}
                </MenuList>
            </Menu>
               
            
        </Flex>
        
        </>
    )
}