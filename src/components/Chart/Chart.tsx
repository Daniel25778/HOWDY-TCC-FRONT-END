import { Box, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

interface ChartProps {
    title: string;
    options;
    series;
}

export function Chart({ title, options, series }: ChartProps) {
    const Chart = dynamic(() => import('react-apexcharts'), {
        ssr: false, //server side rendering
    });

    return (
        <Box p={['6', '8']} bg="white" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
                {title}
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
        </Box>
    );
}
