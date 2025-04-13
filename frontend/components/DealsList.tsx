import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Box,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { Deal } from '../types';

interface DealsListProps {
  deals: Deal[];
}

const getStatusColor = (status: Deal['status']) => {
  switch (status) {
    case 'Closed Won':
      return 'green';
    case 'Closed Lost':
      return 'red';
    case 'In Progress':
      return 'yellow';
    default:
      return 'gray';
  }
};

export const DealsList: React.FC<DealsListProps> = ({ deals }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      overflowX="auto"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      bg={bgColor}
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Client</Th>
            <Th>Sales Rep</Th>
            <Th isNumeric>Value</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {deals.map((deal, index) => (
            <Tr key={index}>
              <Td>
                <Text fontWeight="medium">{deal.client}</Text>
              </Td>
              <Td>{deal.sales_rep}</Td>
              <Td isNumeric>
                <Text fontWeight="medium">
                  ${deal.value.toLocaleString()}
                </Text>
              </Td>
              <Td>
                <Badge colorScheme={getStatusColor(deal.status)}>
                  {deal.status}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}; 