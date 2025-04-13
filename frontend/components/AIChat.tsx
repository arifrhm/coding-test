import React, { useState, useCallback } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  useColorModeValue
} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import { askAI } from '../utils/api';

export const AIChat: React.FC = () => {
  // State hooks
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // UI hooks
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const answerBgColor = useColorModeValue('gray.50', 'gray.700');

  // Event handlers
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const response = await askAI(question);
      setAnswer(response.answer);
      setQuestion('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get AI response. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [question, toast]);

  const handleQuestionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  }, []);

  return (
    <Box
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      bg={bgColor}
    >
      <VStack spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="bold">
          AI Assistant
        </Text>
        <Text fontSize="sm" color="gray.600">
          Ask me about total sales, best performing reps, or regions!
        </Text>

        {answer && (
          <Box
            p={4}
            bg={answerBgColor}
            borderRadius="md"
          >
            <Text>{answer}</Text>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <InputGroup size="md">
            <Input
              value={question}
              onChange={handleQuestionChange}
              placeholder="Ask a question..."
              pr="4.5rem"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                type="submit"
                isLoading={isLoading}
                leftIcon={<FiSend />}
              >
                Ask
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </VStack>
    </Box>
  );
}; 