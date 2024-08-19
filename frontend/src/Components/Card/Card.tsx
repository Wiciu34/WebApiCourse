import React from "react";
import "./Card.css"
import { CompanySearch } from "../../company";

interface Props {
    id: string;
    searchResult: CompanySearch;
}

const Card: React.FC<Props>  = ({id, searchResult}) : JSX.Element => {
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
     </div>
  );
}

export default Card