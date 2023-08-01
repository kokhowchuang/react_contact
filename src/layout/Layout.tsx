import React, { ReactNode, useState } from 'react';
import Sidepane from '../components/Sidepane';
import { useLocation } from 'react-router-dom';
import { useGetCharactersQuery } from '../redux/services/contactApi';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { pathname } = location;
  const [page, setPage] = useState('1');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');

  const { isLoading, isFetching, data, error } = useGetCharactersQuery({
    page: page,
    status: status,
    gender: gender,
    name: name,
  });

  return (
    <div className="flex">
      <Sidepane
        sidebarOpen={true}
        setSidebarOpen={setSidebarOpen}
        setStatus={setStatus}
        setGender={setGender}
        setName={setName}
        data={data?.results ?? []}
      />
      <div className="bg-white">{children}</div>
    </div>
  );
};

export default Layout;
