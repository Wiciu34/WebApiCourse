import { ChangeEvent, SyntheticEvent, useState } from "react";
import "./App.css";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { CompanySearch } from "./company";
import { searchCompanies } from "./api";
import ListPortfolio from "./Components/Portfolio/ListPortfolio/ListPortfolio";

function App() {
   const [search, setSearch] = useState<string>("");
   const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
   const [serverError, setServerError]= useState<string | null>(null);
   const [porfolioValues, setPortfolioValues] = useState<string[]>([]);

   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
   };

   const onPortfolioCreate = (e: any) => {
      e.preventDefault();
      const exists = porfolioValues.find((value) => value === e.target[0].value)
      if (exists) return;
      const portfolioUpdatedValues = [... porfolioValues, e.target[0].value];
      setPortfolioValues(portfolioUpdatedValues);
      console.log(porfolioValues)
   };

   const deleteFromPortfolio = (e: any) => {
      e.preventDefault();
      const portfolioUpdatedValues = porfolioValues.filter((value) =>{
         return value !== e.target[0].value;
      });
      setPortfolioValues(portfolioUpdatedValues)
   }

   const onSearchSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();
      const result = await searchCompanies(search);

      if(typeof result === "string"){
         setServerError(result);
      }
      else if(Array.isArray(result.data)){
         setSearchResult(result.data);
      }
      console.log(searchResult)
   };

   return (
      <div className="App">
         <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange}/>
         <ListPortfolio portfolioValues={porfolioValues}/>
         <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate}/>
         {serverError && <div>Unable to connect to API</div>}
      </div>
   );
}

export default App;
