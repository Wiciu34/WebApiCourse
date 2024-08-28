import { useEffect, useState } from "react";
import { CompanyCashFlow } from "../../company";
import { useOutletContext } from "react-router-dom";
import { getCashFlowStatement } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormatting";

type Props = {};

const config = [
   {
      label: "Date",
      render: (company: CompanyCashFlow) => company.date,
   },
   {
      label: "Operating Cashflow",
      render: (company: CompanyCashFlow) =>
         formatLargeMonetaryNumber(company.operatingCashFlow),
   },
   {
      label: "Investing Cashflow",
      render: (company: CompanyCashFlow) =>
         formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
   },
   {
      label: "Financing Cashflow",
      render: (company: CompanyCashFlow) =>
         formatLargeMonetaryNumber(
            company.netCashUsedProvidedByFinancingActivities
         ),
   },
   {
      label: "Cash At End of Period",
      render: (company: CompanyCashFlow) =>
         formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
   },
   {
      label: "CapEX",
      render: (company: CompanyCashFlow) =>
         formatLargeMonetaryNumber(company.capitalExpenditure),
   },
   {
      label: "Issuance Of Stock",
      render: (company: CompanyCashFlow) =>
         formatLargeMonetaryNumber(company.commonStockIssued),
   },
   {
      label: "Free Cash Flow",
      render: (company: CompanyCashFlow) =>
         formatLargeMonetaryNumber(company.freeCashFlow),
   },
];

const CashFlowStatement = (props: Props) => {
   const ticker = useOutletContext<string>();
   const [cashFlow, setCashFlow] = useState<CompanyCashFlow>();

   useEffect(() => {
      const getCompanyCashFlowStatement = async () => {
         const result = await getCashFlowStatement(ticker);
         setCashFlow(result?.data);
      };
      getCompanyCashFlowStatement();
   }, []);
   return (
      <>
         {cashFlow ? (
            <>
               <Table config={config} data={cashFlow} />
            </>
         ) : (
            <><Spinner/></>
         )}
      </>
   );
};

export default CashFlowStatement;