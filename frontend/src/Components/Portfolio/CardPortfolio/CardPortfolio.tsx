import React, { SyntheticEvent } from 'react'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio';

interface Props {
   deleteFromPortfolio: (e: SyntheticEvent) => void;
   portfolioValue: string;
}

const CardPortfolio = ({portfolioValue, deleteFromPortfolio}: Props) => {
  return (
    <>
        <h4>{portfolioValue}</h4>
        <DeletePortfolio deleteFromPortfolio={deleteFromPortfolio} symbol={portfolioValue} />
    </>
  )
}

export default CardPortfolio