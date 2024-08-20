import React, { SyntheticEvent } from "react";
import "./Card.css"
import { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";

interface Props {
    id: string;
    searchResult: CompanySearch;
    onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<Props>  = ({id, searchResult, onPortfolioCreate}) : JSX.Element => {
  return (
     <div className="card">
        <img src="https://pobierak.jeja.pl/images/4/a/5/181296_to-uczucie-kiedy-twoje-obrazki-i.jpg" alt='Image' />
        <div className='details'>
            <h2>{searchResult.name} ({searchResult.symbol})</h2>
            <p>{searchResult.currency}</p>
        </div>
        <p className='info'>
            {searchResult.exchangeShortName} - {searchResult.stockExchange}
        </p>
        <AddPortfolio 
            onPortfolioCreate={onPortfolioCreate} 
            symbol={searchResult.symbol}
        />
     </div>
  );
}

export default Card