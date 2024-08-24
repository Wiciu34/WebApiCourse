import IncomeStatement from "../../Components/IncomeStatement/IncomeStatement";
import RatioList from "../../Components/RatioList/RatioList";
import Table from "../../Components/Table/Table";
import { testIncomeStatementData } from "../../Components/Table/tableTestData";

type Props = {}

const config = [
   {
      label: "Marker Cap",
      render: (company: any) => {
         return company.marketCapTTM;
      },
      subTitle: "Total value of all a company's shares of stock",
   },
];

const DesignPage = (props: Props) => {
  return (
     <>
        <div>This is design page</div>
        <RatioList config={config} data={testIncomeStatementData} />
        <Table config={config} data={testIncomeStatementData} />
     </>
  );
}

export default DesignPage