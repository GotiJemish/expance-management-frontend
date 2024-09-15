import React, { useState, useEffect } from 'react';
import { Badge, ProgressBar } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';

const Chart = ({ alltns }) => {
  const category = ['salary', 'tip', 'project', 'food', 'movies', 'bills', 'medical', 'fee', 'tax'];

  // Define an array of colors for the charts
//   const chartColors = ['#FF5733', '#FFC300', '#36A2EB', '#4BC0C0', '#9966FF', '#FF66CC', '#FF6633', '#669900', '#2a9d8f'];

  const totaltns = alltns.length;
  const totalincometns = alltns.filter((dataoftns) => dataoftns.type === 'income');
  const totalexpensetns = alltns.filter((dataoftns) => dataoftns.type === 'expense');
  const totalincomepercent = (totalincometns.length / totaltns) * 100;
  const totalexpensepercent = (totalexpensetns.length / totaltns) * 100;

  const totalturnover = alltns.reduce((acc, dataoftns) => acc + dataoftns.amount, 0);
  const incometurnover = alltns.filter((dataoftns) => dataoftns.type === 'income').reduce((acc, dataoftns) => acc + dataoftns.amount, 0);
  const expenseturnover = alltns.filter((dataoftns) => dataoftns.type === 'expense').reduce((acc, dataoftns) => acc + dataoftns.amount, 0);
  const incometoper = (incometurnover / totalturnover) * 100;
  const expencetoper = (expenseturnover / totalturnover) * 100;

  const [chartData, setChartData] = useState({
    no_of_income: [0],
    no_of_expanse: [0],
    incomeperc: [0],
    expenceperc: [0],
    options: {
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: '#fff',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: '#fff',
              strokeWidth: '67%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },
            dataLabels: {
              show: true,
              name: {
                offsetY: -15,
                show: true,
                fontSize: '15px',
              },
              value: {
                formatter: function (val) {
                  return parseFloat(val).toFixed(2)+ '%';; // Display values with 2 decimal places
                },
                offsetY: -5,
                color: '#111',
                fontSize: '20px',
                show: true,
              },
            },
          },
        },
      // Gradient colors for the income chart
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,// Use the array of colors here
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        // lineCap: 'round',
      },
      labels: [''],
    },
  });

  useEffect(() => {
    setChartData({
      ...chartData,
      no_of_income: [totalincomepercent],
      no_of_expanse: [totalexpensepercent],
      incomeperc: [incometoper],
      expenceperc: [expencetoper],
    });
  }, [alltns, chartData]);

  // ... rest of the code ...

  return (
    <div className=''>
      <div className='row'>
      <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>Total Transactions: {totaltns}</div>
            <div className='card-body d-flex'>
              <ReactApexChart options={{ ...chartData.options, labels: ['Income Transection'], colors: ['#52b788'] }} series={chartData.no_of_income} type="radialBar" height={275} />

              {/* Change the color for the expense chart */}
              <ReactApexChart options={{ ...chartData.options, labels: ['Expense Transection'], colors: ['#ba181b'] }} series={chartData.no_of_expanse} type="radialBar" height={275} />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>
              Total Turnover : {totalturnover}
            </div>
            <div className='card-body' style={{ display: 'flex', justifyContent: 'space-between' }}>
              <ReactApexChart options={{ ...chartData.options, labels: ['Income'], colors: ['#52b788'] }} series={chartData.incomeperc} type="radialBar" height={275} />

              {/* Change the color for the expense chart */}
              <ReactApexChart options={{ ...chartData.options, labels: ['Expense'], colors: ['#ba181b'] }} series={chartData.expenceperc} type="radialBar" height={275} />
            </div>
          </div>
        </div>
      </div>

      <div className='row m-3'>
        <div className='col-md-6 text-center'>
          <h4>Categorywise Income</h4>
          {category.map((catdata) => {
            const amount = alltns.filter((dataoftns) => dataoftns.type === 'income' && dataoftns.category === catdata).reduce((acc, dataoftns) => acc + dataoftns.amount, 0);
            return (
              amount > 0 && (
                <div className='card m-2' key={catdata}>
                  <div className='card-body'>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className='text-success'>{catdata} </div>
                    <div><Badge bg="success">{((amount / incometurnover) * 100).toFixed(2)}%</Badge></div>

                    </div>
                    
                    <ProgressBar variant='success' now={((amount / incometurnover) * 100).toFixed(2)} />
                  </div>
                </div>
              )
            );
          })}
        </div>

        <div className='col-md-6 text-center'>
          <h4>Categorywise Expense</h4>
          {category.map((catdata) => {
            const amount = alltns.filter((dataoftns) => dataoftns.type === 'expense' && dataoftns.category === catdata).reduce((acc, dataoftns) => acc + dataoftns.amount, 0);
            return (
              amount > 0 && (
                <div className='card m-2' key={catdata}>
                  <div className='card-body'>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className='text-danger'>{catdata}</div>
                    <div><Badge bg='danger'>{((amount / expenseturnover) * 100).toFixed(2)}%</Badge></div>
                    </div>
                  
                    <ProgressBar variant='danger' now={((amount / expenseturnover) * 100).toFixed(2)} />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Chart;


