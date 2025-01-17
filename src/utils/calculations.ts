export const calculatePayment = (amount: number, fee: number, discount: number, allAmounts: number[]): number => {
  if (amount <= 0) return 0;

  const total = allAmounts.reduce((sum, curr) => sum + curr, 0);

  // Following the Excel formula:
  // amount - (discount * amount / total) + (fee * amount / total)
  const result = amount - (discount * amount) / total + (fee * amount) / total;

  // Floor to nearest 1 first, then to nearest 1000
  const flooredToOne = Math.floor(result);
  const flooredToThousand = Math.floor(flooredToOne / 1000) * 1000;

  // Return 0 if the result after flooring is 0
  return flooredToThousand === 0 ? 0 : flooredToThousand;
};
