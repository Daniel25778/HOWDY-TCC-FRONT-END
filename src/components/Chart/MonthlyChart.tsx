import { Box, Text } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

interface ChartProps {
    title: string;
    series;
}

export function MonthlyChart({ title, series }: ChartProps) {
    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            foreColor: '#29B995',
        },
        grid: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            enabled: true,
        },
        xaxis: {
            type: 'category',
            axisBorder: {
                color: 'black',
            },
            axisTicks: {
                color: 'black',
            },
            categories: [
                'Há 1 mês',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                'Há 22 dias',
                '',
                '',
                '',
                '',
                '',
                '',
                'Há 15 dias',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                'Há 7 dias',
                '',
                '',
                '',
                '',
                '',
                'Hoje',
            ],
        },
        colors: ['#6A7DFF'],
        fill: {
            opacity: 0.3,
            type: 'gradient',
            gradient: {
                shade: 'dark',
                opacityFrom: 0.7,
                opacityTo: 0.3,
            },
        },
    };

    const Chart = dynamic(() => import('react-apexcharts'), {
        ssr: false, //server side rendering
    });

    return (
        <Box p={['6', '8']} bg="white" borderRadius={8} pb="4" mt="9" boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)">
            <Text fontSize="lg" mb="4">
                {title}
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
        </Box>
    );
}
