import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";

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
        <div>{company.companyName}</div>
       ) : (
        <div>Company not found!</div>
       )} 
    </>
  )
}

export default CompanyPage