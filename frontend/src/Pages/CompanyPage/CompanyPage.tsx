import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";

interface Props {}

const CompanyPage = (props: Props) => {

  let {tricker} = useParams();
  const [company, setCompany] = useState<CompanyProfile>(); 

  useEffect(() => {
    const getProfileInit = async () => {
        const result = await getCompanyProfile(tricker!);
        setCompany(result?.data[0]);
    }
    getProfileInit();
  }, [])
  return (
     <>
        {company ? (
           <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
            <Sidebar/>
            <CompanyDashboard/> 
           </div>
        ) : (
           <div>Company not found!</div>
        )}
     </>
  );
}

export default CompanyPage