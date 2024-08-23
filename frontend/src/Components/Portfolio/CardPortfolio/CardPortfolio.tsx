import React, { SyntheticEvent } from 'react'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio';
import { Link } from 'react-router-dom';

interface Props {
   deleteFromPortfolio: (e: SyntheticEvent) => void;
   portfolioValue: string;
}

const CardPortfolio = ({portfolioValue, deleteFromPortfolio}: Props) => {
  return (
     <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
        <Link to={`/company/${portfolioValue}`} className="pt-6 text-xl font-bold">{portfolioValue}</Link>
        <DeletePortfolio
           symbol={portfolioValue}
           deleteFromPortfolio={deleteFromPortfolio}
        />
     </div>
  );
}

export default CardPortfolio