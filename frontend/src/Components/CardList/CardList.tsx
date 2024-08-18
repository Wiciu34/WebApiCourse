import React from 'react'
import Card from '../Card/Card'

interface Props {}

const CardList: React.FC<Props> = (props) : JSX.Element => {
  return (
     <div>
        <Card companyName="Apple" tricker="AAPL" price={100} />
        <Card companyName="Microsoft" tricker="MSFT" price={200} />
        <Card companyName="Tesla" tricker="TSLA" price={300} />
     </div>
  );
}

export default CardList