import React from 'react'
import StockCommentForm from './StockCommentForm/StockCommentForm'
import { CommentPostAPI } from '../../Services/CommentService';
import { toast } from 'react-toastify';

type Props = {
    stockSymbol: string
}

type StockCommnetFormInputs = {
   title: string;
   content: string;
};

const StockComment = ({stockSymbol}: Props) => {
    const handleStockComment = (e: StockCommnetFormInputs) => {
        CommentPostAPI(e.title, e.content, stockSymbol)
            .then((res) => {
                if(res){
                    toast.success("Comment created successfully!");
                }
            })
            .catch((e) => {
                toast.warning(e)
            })
    }
  return (
    <StockCommentForm symbol={stockSymbol} handleStockComment={handleStockComment}/>
  )
}

export default StockComment