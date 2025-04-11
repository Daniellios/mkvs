import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea } from 'recharts';
import { enhancedData } from './utils/calculateZScore';
import { CustomDot } from './CustomDot';

function App() {
  return (
    <>
      <LineChart
        width={500}
        height={300}
        data={enhancedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />


        {enhancedData.map(({ name, pvIsExtreme, x2 }, index) => {
          if (pvIsExtreme) {
            return (
              <ReferenceArea
                key={`pv-highlight-${index}`}
                x1={name}
                x2={x2}
                fill="red"
                fillOpacity={0.2}
              />
            );
          }
          return null;
        })}

        {enhancedData.map(({ name, uvIsExtreme, x2 }, index) => {
          if (uvIsExtreme) {
            return (
              <ReferenceArea
                key={`uv-highlight-${index}`}
                x1={name}
                x2={x2}
                fill="red"
                fillOpacity={0.2}
              />
            );
          }
          return null;
        })}

        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          strokeWidth={2}
          dot={({ cx, cy, index }) => <CustomDot cx={cx} cy={cy} index={index} type='pvIsExtreme' baseColor='#8884d8' />}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={({ cx, cy, index }) => <CustomDot cx={cx} cy={cy} index={index} type='uvIsExtreme' baseColor='#82ca9d' />}
        />
      </LineChart>
    </>
  )
}

export default App
