import React from "react";
import "./Card.css"

interface Props {
    companyName: string;
    tricker: string;
    price: number;
}

const Card: React.FC<Props>  = ({companyName, tricker, price}) : JSX.Element => {
  return (
     <div className="card">
        <img src="https://pobierak.jeja.pl/images/4/a/5/181296_to-uczucie-kiedy-twoje-obrazki-i.jpg" alt='Image' />
        <div className='details'>
            <h2>{companyName} ({tricker})</h2>
            <p>${price}</p>
        </div>
        <p className='info'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, laboriosam?
        </p>
     </div>
  );
}

export default Card