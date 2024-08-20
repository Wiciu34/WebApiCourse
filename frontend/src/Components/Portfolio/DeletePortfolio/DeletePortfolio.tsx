import React, { SyntheticEvent } from 'react'

interface Props {
   deleteFromPortfolio: (e: SyntheticEvent) => void;
   symbol: string;
}

const DeletePortfolio = ({deleteFromPortfolio, symbol}: Props) => {
  return (
    <form onSubmit={deleteFromPortfolio}>
        <input hidden={true} value={symbol} />
        <button type='submit'>X</button>
    </form>
  )
}

export default DeletePortfolio