import React, { SyntheticEvent } from 'react'

interface Props {
   deleteFromPortfolio: (e: SyntheticEvent) => void;
   symbol: string;
}

const DeletePortfolio = ({deleteFromPortfolio, symbol}: Props) => {
  return (
     <form onSubmit={deleteFromPortfolio}>
        <input hidden={true} value={symbol} />
        <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500">
           X
        </button>
     </form>
  );
}

export default DeletePortfolio