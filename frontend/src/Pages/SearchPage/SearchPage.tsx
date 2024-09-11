import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { searchCompanies } from "../../api";
import { CompanySearch } from "../../company";
import CardList from "../../Components/CardList/CardList";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import Search from "../../Components/Search/Search";
import { PortfolioGet } from "../../Models/Portfolio";
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from "../../Services/PortfolioService";
import { toast } from "react-toastify";

interface Props {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);
    const [porfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
       setSearch(e.target.value);
    };

    useEffect(() => {
      getPortfolio();
    }, [])

    const getPortfolio = () => {
      portfolioGetAPI()
      .then((res) => {
         if(res?.data){
            setPortfolioValues(res?.data);
         }
      }).catch((e) => {
         toast.warning("Could not get portfolio values!")
      })
    };

    const onPortfolioCreate = (e: any) => {
       e.preventDefault();
       portfolioAddAPI(e.target[0].value)
       .then((res) => {
         if(res?.status === 204){
            toast.success("Stock added to portfolio!");
            getPortfolio();
         }
       }).catch((e)=>{
         toast.warning("Could not create portfolio item!");
       })
    };

    const deleteFromPortfolio = (e: any) => {
       e.preventDefault();
       portfolioDeleteAPI(e.target[0].value)
       .then((res) => {
         if(res?.status === 200){
            toast.success("Stock deleted from portfolio!");
            getPortfolio();
         }
       })
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
           portfolioValues={porfolioValues!}
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