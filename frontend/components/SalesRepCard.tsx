import { Box, Badge, Text, VStack, HStack, Heading, useColorModeValue } from '@chakra-ui/react';
import { SalesRep } from '../types';

interface SalesRepCardProps {
  salesRep: SalesRep;
  onClick?: () => void;
}

export const SalesRepCard: React.FC<SalesRepCardProps> = ({ salesRep, onClick }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const totalValue = salesRep.deals.reduce((sum, deal) => sum + deal.value, 0);
  const closedWonValue = salesRep.deals
    .filter(deal => deal.status === 'Closed Won')
    .reduce((sum, deal) => sum + deal.value, 0);

  return (
    <Box
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      bg={bgColor}
      shadow="sm"
      cursor={onClick ? 'pointer' : 'default'}
      onClick={onClick}
      _hover={{ shadow: onClick ? 'md' : 'sm' }}
      transition="all 0.2s"
    >
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <Heading size="md">{salesRep.name}</Heading>
          <Badge colorScheme="blue">{salesRep.role}</Badge>
        </HStack>

        <Text color="gray.600">{salesRep.region}</Text>

        <HStack wrap="wrap" spacing={2}>
          {salesRep.skills.map((skill, index) => (
            <Badge key={index} colorScheme="green" variant="subtle">
              {skill}
            </Badge>
          ))}
        </HStack>

        <Box>
          <Text fontWeight="bold">Deals Summary</Text>
          <HStack spacing={4} mt={2}>
            <VStack align="start">
              <Text fontSize="sm" color="gray.600">Total Pipeline</Text>
              <Text fontWeight="semibold">${totalValue.toLocaleString()}</Text>
            </VStack>
            <VStack align="start">
              <Text fontSize="sm" color="gray.600">Closed Won</Text>
              <Text fontWeight="semibold" color="green.500">
                ${closedWonValue.toLocaleString()}
              </Text>
            </VStack>
          </HStack>
        </Box>

        <Box>
          <Text fontWeight="bold">Clients ({salesRep.clients.length})</Text>
          <VStack align="stretch" mt={2} spacing={2}>
            {salesRep.clients.map((client, index) => (
              <HStack key={index} justify="space-between">
                <Text fontSize="sm">{client.name}</Text>
                <Badge size="sm" colorScheme="purple">{client.industry}</Badge>
              </HStack>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}; 