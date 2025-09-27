import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


const Chart = ({data}) => {
    // Calcular el valor máximo para crear ticks enteros
    const maxValue = data.length > 0 ? Math.max(...data.map(item => item.value)) : 0;
    const ticks = [];
    for (let i = 0; i <= maxValue; i++) {
        ticks.push(i);
    }

        return (
            <div>
                <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="producto" className='text-xs' />
                    <YAxis type="number" domain={[0, maxValue]} ticks={ticks} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#6c5a5a" />
                </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }

export default Chart;