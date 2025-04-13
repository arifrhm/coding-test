import { useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  SimpleGrid,
  Spinner,
  Center,
  VStack,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getSalesReps, getAllDeals } from '../utils/api';
import { SalesRepCard } from '../components/SalesRepCard';
import { DealsList } from '../components/DealsList';
import { AIChat } from '../components/AIChat';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);

  const { data: salesRepsData, isLoading: isLoadingReps } = useQuery({
    queryKey: ['salesReps'],
    queryFn: getSalesReps
  });

  const { data: dealsData, isLoading: isLoadingDeals } = useQuery({
    queryKey: ['deals'],
    queryFn: getAllDeals
  });

  if (isLoadingReps || isLoadingDeals) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const totalValue = dealsData?.deals.reduce((sum, deal) => sum + deal.value, 0) || 0;
  const closedWonValue = dealsData?.deals
    .filter((deal) => deal.status === 'Closed Won')
    .reduce((sum, deal) => sum + deal.value, 0) || 0;
  const closedWonPercentage = ((closedWonValue / totalValue) * 100).toFixed(1);

  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading size="2xl" mb={2}>Sales Dashboard</Heading>
        <Text color="gray.600">
          Track sales performance and team metrics
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
          <Text fontSize="lg" color="gray.600">Total Pipeline Value</Text>
          <Heading size="lg">${totalValue.toLocaleString()}</Heading>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
          <Text fontSize="lg" color="gray.600">Closed Won Value</Text>
          <Heading size="lg" color="green.500">
            ${closedWonValue.toLocaleString()}
          </Heading>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
          <Text fontSize="lg" color="gray.600">Win Rate</Text>
          <Heading size="lg" color="blue.500">{closedWonPercentage}%</Heading>
        </Box>
      </SimpleGrid>

      <Tabs index={selectedTab} onChange={setSelectedTab}>
        <TabList>
          <Tab>Sales Representatives</Tab>
          <Tab>All Deals</Tab>
          <Tab>AI Assistant</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {salesRepsData?.salesReps.map((rep) => (
                <SalesRepCard key={rep.id} salesRep={rep} />
              ))}
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <DealsList deals={dealsData?.deals || []} />
          </TabPanel>

          <TabPanel>
            <AIChat />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
} 