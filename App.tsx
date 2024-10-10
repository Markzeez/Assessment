import { Routes, Route } from 'react-router-dom';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import Campaign from './Page/Campaign';
import Overview from './Page/Overview';
import NewCampaign from './Page/NewCampaign';
import CampaignInfo from './Page/CampaignInfo';
import Page404 from './Page/404page';
import RootLayout from './Layout/RootLayout';
import AccountSetting from './Page/AccountSetting';
import MarketIntelligence from './Page/MarketIntelligence';
import axios from 'axios';

interface Data {
  // Define the shape of the data you expect to receive here
  // For example, if the data is an object with fields 'id' and 'name':
  id?: number;
  name?: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.get<Data>(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/Campaign`);
      setData(response.data);
      console.log(response.data) // Set the fetched data
      setLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message); // If error is an Axios error, capture the message
      } else {
        setError('An unknown error occurred');
      }
      setLoading(false);
    }
  };

  // const fetchData = () => {
  //   fetch('https://infinion-test-int-test.azurewebsites.net/api/Campaign')
  //    .then((response) => response.json())
  //    .then((data) => {
  //       console.log(data);
  //   //     setLoading(false);
    //   })
    //  .catch((error) => {
    //     setError(error.message);
    //     setLoading(false);
  //     });
  // };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  

  return (
    <>
    
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Overview />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/newcampaign" element={<NewCampaign />} />
          <Route path="/campaigninfo" element={<CampaignInfo />} />
          <Route path="/account" element={<AccountSetting />} />
          <Route path="/market" element={<MarketIntelligence />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes> 
    </>
  );
}

export default App;
