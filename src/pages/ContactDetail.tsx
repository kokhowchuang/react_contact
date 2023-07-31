import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import userSix from '../images/user/user-06.png';
import TableThree from '../components/TableThree';

import { RootState } from '../redux/store';
import { AppDispatch } from '../redux/store';
import { useGetSingleCharacterQuery } from '../redux/services/contactApi';
import Sidepane from '../components/Sidepane';
import { useState } from 'react';
import Layout from '../layout/Layout';

const ContactDetails = () => {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { isLoading, isFetching, data, error } = useGetSingleCharacterQuery({
    id: id ?? '',
  });

  return (
    <Layout>
      <div>
        <div className="flex">
          <img
            className="h-30 w-30 rounded-full"
            src={userSix}
            alt="Rounded avatar"
          ></img>
          <div></div>
        </div>
        <hr />
        <div>
          <div>Personal Info</div>
          {data?.name}
          <TableThree />
        </div>
      </div>
    </Layout>
  );
};

export default ContactDetails;
