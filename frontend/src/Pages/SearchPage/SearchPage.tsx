import { ChangeEvent, SyntheticEvent, useState } from "react";
import { searchCompanies } from "../../api";
import { CompanySearch } from "../../company";
import CardList from "../../Components/CardList/CardList";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import Search from "../../Components/Search/Search";

interface Props {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);
    const [porfolioValues, setPortfolioValues] = useState<string[]>([]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
       setSearch(e.target.value);
    };

    const onPortfolioCreate = (e: any) => {
       e.preventDefault();
       const exists = porfolioValues.find(
          (value) => value === e.target[0].value
       );
       if (exists) return;
       const portfolioUpdatedValues = [...porfolioValues, e.target[0].value];
       setPortfolioValues(portfolioUpdatedValues);
       console.log(porfolioValues);
    };

    const deleteFromPortfolio = (e: any) => {
       e.preventDefault();
       const portfolioUpdatedValues = porfolioValues.filter((value: any) => {
          return value !== e.target[0].value;
       });
       setPortfolioValues(portfolioUpdatedValues);
    };

    const onSearchSubmit = async (e: SyntheticEvent) => {
       e.preventDefault();
       const result = await searchCompanies(search);

       if (typeof result === "string") {
          setServerError(result);
       } else if (Array.isArray(result.data)) {
          setSearchResult(result.data);
       }
       console.log(searchResult);
    };
  return (
     <>
        <Search
           onSearchSubmit={onSearchSubmit}
           search={search}
           handleSearchChange={handleSearchChange}
        />
        <ListPortfolio
           portfolioValues={porfolioValues}
           deleteFromPortfolio={deleteFromPortfolio}
        />
        <CardList
           searchResults={searchResult}
           onPortfolioCreate={onPortfolioCreate}
        />
        {serverError && <div>Unable to connect to API</div>}
     </>
  );
}

export default SearchPage