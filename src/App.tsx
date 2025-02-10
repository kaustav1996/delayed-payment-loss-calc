import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, IndianRupee, Percent, Calendar, Users } from 'lucide-react';

interface FormData {
  premiumAmount: number;
  investmentPercentage: number;
  numberOfPolicies: number;
  returnRate: number;
  delayDays: number;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    premiumAmount: 10000,
    investmentPercentage: 30,
    numberOfPolicies: 100,
    returnRate: 8,
    delayDays: 30,
  });

  const calculateLoss = (day: number) => {
    const Pi = (formData.premiumAmount * formData.investmentPercentage) / 100;
    const r = formData.returnRate / 100;
    const loss = formData.numberOfPolicies * Pi * (Math.pow(1 + r/365, day) - 1);
    return parseFloat(loss.toFixed(2));
  };

  const chartData = useMemo(() => {
    return Array.from({ length: formData.delayDays }, (_, i) => ({
      day: i + 1,
      loss: calculateLoss(i + 1),
    }));
  }, [formData]);

  const totalLoss = calculateLoss(formData.delayDays);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const formatRupees = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-18">
        <div className="text-center mb-18">
          <h1 className="text-4xl font-semibold text-primary-dark mb-4">
            Money Lost Over Delayed Payments
          </h1>
          <p className="text-lg text-secondary">
            Calculate and visualize the opportunity cost of delayed premium payments
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-semibold text-primary mb-8 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-accent" />
              Input Parameters
            </h2>
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                  <IndianRupee className="w-4 h-4 text-secondary" />
                  Premium Amount Per Policy
                </label>
                <input
                  type="number"
                  name="premiumAmount"
                  value={formData.premiumAmount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                  <Percent className="w-4 h-4 text-secondary" />
                  Investment Percentage
                </label>
                <input
                  type="number"
                  name="investmentPercentage"
                  value={formData.investmentPercentage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                  <Users className="w-4 h-4 text-secondary" />
                  Number of Policies
                </label>
                <input
                  type="number"
                  name="numberOfPolicies"
                  value={formData.numberOfPolicies}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                  <Percent className="w-4 h-4 text-secondary" />
                  Expected Return Rate (%)
                </label>
                <input
                  type="number"
                  name="returnRate"
                  value={formData.returnRate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  Delay in Days
                </label>
                <input
                  type="number"
                  name="delayDays"
                  value={formData.delayDays}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
            </div>

            <div className="mt-8 p-6 bg-accent-light rounded-xl">
              <h3 className="text-lg font-medium text-primary mb-2">Total Accumulated Loss</h3>
              <p className="text-3xl font-semibold text-accent">{formatRupees(totalLoss)}</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-semibold text-primary mb-8">Accumulated Loss Over Time</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 60,
                    bottom: 40
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="day" 
                    label={{ 
                      value: 'Days', 
                      position: 'bottom',
                      offset: 20
                    }}
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis 
                    label={{ 
                      value: 'Loss (₹)', 
                      angle: -90, 
                      position: 'insideLeft',
                      offset: -40
                    }}
                    tick={{ fill: '#6B7280' }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatRupees(value), 'Loss']}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend 
                    verticalAlign="top"
                    height={36}
                  />
                  <Bar 
                    name="Accumulated Loss"
                    dataKey="loss" 
                    fill="#00AD6A"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;