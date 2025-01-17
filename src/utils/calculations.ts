export const calculatePayment = (input: number, fee: number, discount: number, userInputs: number[]): number => {
  // Input validation
  if (input < 0 || fee < 0 || discount < 0) {
    return 0;
  }

  const sumInputs = userInputs.reduce((sum, current) => sum + current, 0);

  // Guard against division by zero
  if (sumInputs === 0) {
    return 0;
  }

  // Ensure discount doesn't exceed total sum
  const safeDiscount = Math.min(discount, sumInputs);

  // Calculate adjustments with safe values
  const discountAdjustment = (safeDiscount * input) / sumInputs;
  const feeAdjustment = (fee * input) / sumInputs;

  // Prevent negative results
  const result = Math.max(0, Math.floor((input - discountAdjustment + feeAdjustment) / 1000) * 1000);

  return result;
};
