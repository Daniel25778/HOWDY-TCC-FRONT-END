import Chart from "react-apexcharts"


export default function ChartWeb(){

    const options = {};
    const series =  [
    ]

    return(
        <>
        
            <Chart type="area" 
                   height={160}
                   options={options}
                   series={series}
            >

            </Chart>
        
        </>
       
    );
}