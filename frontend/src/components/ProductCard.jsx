import React, { useState } from 'react'
import { Box, Heading, HStack, Icon, IconButton, Image, Text, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button, useToast } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useProductStore } from '../store/product.js';



/**
 * A React component for displaying a product card.
 * 
 * This component displays the product image, name, price and provides buttons to edit and delete the product.
 * When the edit button is clicked, a modal is displayed with input fields for editing the product details.
 * When the delete button is clicked, the product is deleted.
 * 
 * The component uses the `useProductStore` hook to get the `deleteProduct` and `updateProduct` functions.
 * The component also uses the `useToast` hook to display success or error messages when the product is updated or deleted.
 * 
 * @param {Object} product - The product details to display.
 * 
 * @returns {ReactElement} A React component displaying the product card.
 */
const ProductCard = ({product}) => {

    const [ updatedProduct, setUpdatedProduct ] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")
    const { onOpen, isOpen, onClose } = useDisclosure();
    const { deleteProduct, updateProduct } = useProductStore()
    const toast = useToast();
    
    const handleDeleteProduct = async (id) => {
        const { success, message } = await deleteProduct(id);
        onClose();
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }
    }


    /**
     * Handles the update of a product.
     * 
     * @param {string} id - The id of the product to update.
     * @param {Object} updatedProduct - The updated product details.
     * 
     * This function calls the `updateProduct` function from the `productStore` and handles the response.
     * If the update is successful, it displays a success toast message.
     * If the update fails, it displays an error toast message.
     * It also closes the modal.
     */
    const handleUpdateProduct = async (id, updatedProduct) => {
        const { success, message } = await updateProduct(id, updatedProduct);
        onClose();
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }
    }

    return (
        <Box
            shadow={"lg"}
            overflow="hidden"
            rounded="lg"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: 'xl' }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} w={"full"} h={48} objectFit={"cover"} />

            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue'>
                        Edit
                    </IconButton>
                    <IconButton icon={<DeleteIcon />} colorScheme='red' onClick={() => handleDeleteProduct(product._id)} >
                    
                        Delete
                    </IconButton>
                </HStack>

            </Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input 
                                placeholder="Product Name"
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                            />
                            <Input 
                                placeholder="Price"
                                type='number'
                                name='price'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                            />
                            <Input 
                                placeholder="Image URL"
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                            Update 
                        </Button>
                        <Button variant='ghost' onClick={onClose}> Cancel </Button>
                    </ModalFooter>

                
                </ModalContent>


            </Modal>

        </Box>
    )
    }

    export default ProductCard