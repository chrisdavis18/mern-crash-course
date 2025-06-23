import React from 'react'
import { useState } from 'react'
import { Container, VStack, Heading, Box, useColorModeValue, Input, Button, useToast } from '@chakra-ui/react';
import { useProductStore } from '../store/product.js';

/**
 * A React component for creating a new product.
 *
 * This component provides a form with input fields for the product name, price,
 * and image URL. Users can input the details of a new product and submit it by
 * clicking the "Add Product" button. The component maintains the state of the 
 * new product using the `useState` hook, updating the state as the user types
 * into the input fields.
 *
 * The component is styled using Chakra UI, with a responsive container, 
 * headings, and inputs.
 *
 * @returns {ReactElement} A form for creating a new product.
 */

const CreatePage = () => {

    
    const [newProduct, setNewProduct] = useState({
      name: "",
      price: "",
      image: "",
    });

    const { createProduct } = useProductStore();
    const toast = useToast();


    const handleAddProduct = async () => {

        const { success, message } = await createProduct(newProduct);
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            })

            setNewProduct({name: "", price: "", image: ""});
        }
    }

    return (
        <Container maxW="container.sm">
            <VStack spacing={8}>
                <Heading as="h1" size="2xl" textAlign={"center"} mb={8}> Create New Product </Heading>
                <Box w='full' bg={useColorModeValue('white', 'gray.800')} p={6} rounded='lg' shadow='md'>
                    <VStack spacing={4}>
                        <Input 
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            variant='flushed'
                            name='name'
                        />
                        <Input 
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            variant='flushed'
                            type='number'
                            name='price'
                        />
                        <Input 
                            placeholder="Image URL"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            variant='flushed'
                            name='image'
                        />
                        <Button colorScheme='blue' w='full' onClick={handleAddProduct}> Add Product </Button>

                    </VStack>
                </Box>
            </VStack>
        </Container>
    )

}

export default CreatePage