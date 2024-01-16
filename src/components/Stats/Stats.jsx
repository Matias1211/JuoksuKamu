import React from 'react';
import styles from './Stats.module.scss';
import { ResponsiveContainer, Line, LineChart, Pie, PieChart, XAxis, YAxis, Tooltip } from 'recharts';
import { LabelList, Legend, Cell } from 'recharts';
import randomColor from 'randomcolor';

function Stats(props) {
  // Laske juoksujen määrä kullekin kuukaudelle
  const yearlyData = props.data.reduce((result, item) => {
    const year = new Date(item.date).getFullYear();
    const month = new Date(item.date).getMonth();
    const monthYearKey = `${year}-${month}`;

    const existingData = result.find((entry) => entry.monthYearKey === monthYearKey);
    if (existingData) {
      existingData.count += 1;
    } else {
      result.push({ monthYearKey, count: 1 });
    }

    return result;
  }, []);

  // Laske juoksujen määrä kullekin tyypille
  const typeData = props.data.reduce((result, item) => {
    const existingData = result.find((entry) => entry.type === item.type);
    if (existingData) {
      existingData.count += 1;
    } else {
      result.push({ type: item.type, count: 1 });
    }

    return result;
  }, []);

  // Generoi satunnaiset värit piirakkakaavion osioille
  const pieColors = randomColor({
    count: typeData.length,
    seed: 'seed',
    luminosity: 'dark',
  });

  return (
    <div className={styles.stats}>
      <h2>Tilastot</h2>

      {/* Vuosittainen juoksumääräviivakaavio */}
      <h3>Vuosittainen juoksumäärä</h3>
      <ResponsiveContainer height={350}>
        <LineChart data={yearlyData}>
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
          <XAxis dataKey="monthYearKey" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>

      {/* Juoksutyypin jakautumispiirakka */}
      <h3>Juoksutyyppien jakautuminen</h3>
      <ResponsiveContainer height={350}>
        <PieChart>
          <Pie
            data={typeData}
            dataKey="count"
            nameKey="type"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            <LabelList dataKey="count" position="inside" formatter={(value) => value} />
            {typeData.map((entry, index) => (
              <Cell key={entry.type} fill={pieColors[index % pieColors.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip formatter={(value) => value} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Stats;


