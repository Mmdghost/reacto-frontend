import React, { useState } from 'react';
import {
  ChakraProvider, Box, Textarea, Button, VStack, Text, Spinner,
} from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [reponse, setReponse] = useState('');
  const [loading, setLoading] = useState(false);

  const envoyerMessage = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/chat', { message: input });
      setReponse(res.data.response);
    } catch (error) {
      setReponse("Erreur lors de l'appel à l'API.");
    }
    setLoading(false);
  };

  return (
    <ChakraProvider>
      <Box p={8} maxW="700px" mx="auto">
        <VStack spacing={4}>
          <Textarea
            placeholder="Pose ta question sur React.js..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            size="lg"
          />
          <Button colorScheme="blue" onClick={envoyerMessage}>
            Envoyer
          </Button>
          {loading ? (
            <Spinner />
          ) : (
            <Text whiteSpace="pre-wrap">{reponse}</Text>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
