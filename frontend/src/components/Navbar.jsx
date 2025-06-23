import React from 'react'
import { Container, Flex, HStack, Text, Button, useColorMode} from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';




/**
 * A Chakra UI based navigation bar component.
 *
 * This component displays the brand name on the left side and a button to create a new product and a button to toggle the color mode on the right side.
 *
 * The button to create a new product is a link to the '/create' page.
 *
 * The button to toggle the color mode shows an icon representing the current color mode (light or dark).
 *
 * The component uses the `useColorMode` hook from Chakra UI to get the current color mode and to toggle it.
 */
const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode()
    
    
    return (
        <Container maxW="1140px" px="4">
            <Flex h="16" alignItems="center" justifyContent="space-between" flex-direction={{base: "column", md: "row"}}>
                <Text
                    bgGradient='linear(to-r, cyan.400, blue.500)'
                    bgClip='text'
                    fontSize={{ base: "22", sm: "28"}}
                    fontWeight='bold'
                    textAlign='center'
                    textTransform='uppercase'
                >
                    <Link to='/'> Product Store </Link>
                </Text>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to='/create'> 
                        <Button>
                            <PlusSquareIcon />
                        </Button> 
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <IoMoon /> : <LuSun size={20} />}

                        </Button>
                </HStack>
            </Flex>
        </Container>
  )
}

export default Navbar