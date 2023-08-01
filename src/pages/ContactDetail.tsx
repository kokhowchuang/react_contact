import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import CharacterDetail from '../components/CharacterDetail';
import { useGetSingleCharacterQuery } from '../redux/services/contactApi';

const ContactDetail = () => {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { isLoading, isFetching, data, error } = useGetSingleCharacterQuery({
    id: id ?? '',
  });

  return (
    <Layout>
      <CharacterDetail data={data} />
    </Layout>
  );
};

export default ContactDetail;
