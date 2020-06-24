import React from 'react';
import { useContext } from 'context';
import denominate from './denominate';

interface DenominateType {
  value: string;
  showLastNonZeroDecimal?: boolean;
  showErd?: boolean;
  decimals?: number;
}

const Denominate = ({
  value,
  showLastNonZeroDecimal = false,
  showErd = true,
  decimals,
}: DenominateType) => {
  const {
    config: { denomination, decimals: configDecimals },
  } = useContext();

  decimals = decimals !== undefined ? decimals : configDecimals;

  const denominatedValue = denominate({
    input: value,
    denomination,
    decimals,
    showLastNonZeroDecimal,
  });

  const valueParts = denominatedValue.split('.');
  const hasNoDecimals = valueParts.length === 1;
  const isNotZero = denominatedValue !== '0';

  if (decimals > 0 && hasNoDecimals && isNotZero) {
    let zeros = '';

    for (let i = 1; i <= decimals; i++) {
      zeros = zeros + '0';
    }

    valueParts.push(zeros);
  }

  return (
    <span data-testid="denominateComponent">
      <span className="int-amount">{valueParts[0]}</span>
      {valueParts.length > 1 && <span className="decimals">.{valueParts[1]}</span>}
      {showErd && <span className="symbol">&nbsp;ERD</span>}
    </span>
  );
};

export default Denominate;