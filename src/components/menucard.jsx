import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Pizza, Utensils } from 'lucide-react';

const MenuCard = () => {
  const pizzas = [
    {
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella, basil',
      prices: { S: 8.99, M: 10.99, L: 12.99 }
    },
    {
      name: 'Pepperoni Pizza',
      description: 'Classic pepperoni, mozzarella',
      prices: { S: 10.99, M: 12.99, L: 14.99 }
    },
    {
      name: 'Veggie Delight Pizza',
      description: 'Bell peppers, mushrooms, onions',
      prices: { S: 9.99, M: 11.99, L: 13.99 }
    },
    {
      name: 'BBQ Chicken Pizza',
      description: 'Grilled chicken, BBQ sauce',
      prices: { S: 12.99, M: 14.99, L: 16.99 }
    }
  ];

  const sides = [
    { name: 'Extra Cheese', price: 1.50 },
    { name: 'Garlic Bread', price: 3.99 },
    { name: 'Soda (Coke, Sprite, Fanta)', price: 1.99 },
    { name: 'Chocolate Lava Cake', price: 4.99 }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <CardTitle className="text-3xl font-bold text-center">Our Menu</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Pizza Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Pizza className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-semibold">Pizzas</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">Available in Small (10"), Medium (12"), Large (14")</p>
          <div className="space-y-6">
            {pizzas.map((pizza, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{pizza.name}</h3>
                    <p className="text-sm text-gray-600">{pizza.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">S: ${pizza.prices.S}</p>
                    <p className="text-sm">M: ${pizza.prices.M}</p>
                    <p className="text-sm">L: ${pizza.prices.L}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sides Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Utensils className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-semibold">Sides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sides.map((side, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-800">{side.name}</span>
                <span className="font-semibold">${side.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCard;