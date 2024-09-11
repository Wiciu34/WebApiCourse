import React, { SyntheticEvent } from 'react'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio';
import { Link } from 'react-router-dom';
import { PortfolioGet } from '../../../Models/Portfolio';

interface Props {
   deleteFromPortfolio: (e: SyntheticEvent) => void;
   portfolioValue: PortfolioGet;
}

const CardPortfolio = ({portfolioValue, deleteFromPortfolio}: Props) => {
  return (
     <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
        <Link to={`/company/${portfolioValue}/company-profile`} className="pt-6 text-xl font-bold">{portfolioValue.symbol}</Link>
        <DeletePortfolio
           symbol={portfolioValue.symbol}
           deleteFromPortfolio={deleteFromPortfolio}
        />
     </div>
  );
}

export default CardPortfolio