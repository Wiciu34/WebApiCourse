import React, { SyntheticEvent } from 'react'
import CardPortfolio from '../CardPortfolio/CardPortfolio';

interface Props {
   portfolioValues: string[];
   deleteFromPortfolio: (e: SyntheticEvent) => void;
}

const ListPortfolio = ({portfolioValues, deleteFromPortfolio}: Props) => {
  return (
    <>
        <h3>My Portfolio</h3>
        <ul>
            {portfolioValues && 
                portfolioValues.map((portfolioValue) => {
                    return <CardPortfolio portfolioValue={portfolioValue} deleteFromPortfolio={deleteFromPortfolio}/>
                })
            }
        </ul>
    </>
  )
}

export default ListPortfolio