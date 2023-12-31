import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CharacterState } from '../redux/features/contactSlice';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  setStatus: (arg: string) => void;
  setGender: (arg: string) => void;
  setName: (arg: string) => void;
  status: string;
  gender: string;
  data: Array<CharacterState>;
}

const Sidepane = ({
  sidebarOpen,
  setSidebarOpen,
  setStatus,
  setGender,
  setName,
  status,
  gender,
  data,
}: SidebarProps) => {
  const navigate = useNavigate();
  const [hasFilter, setHasFilter] = useState(false);

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const handleContactClick = (id: number) => {
    navigate(`/contact/${id}`);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHasFilter(true);
    setStatus(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHasFilter(true);
    setGender(event.target.value);
  };

  const handleNameChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setName(event.currentTarget.value);
    }
  };

  const clearFilter = () => {
    setHasFilter(false);
    setStatus('');
    setGender('');
  };

  return (
    <aside
      ref={sidebar}
      className={`bg-gray-900 absolute relative right-0 top-0 z-9999 flex h-screen w-full flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 pb-0 lg:py-6.5 lg:pb-0">
        <div className="text-2xl font-extrabold">Contacts</div>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search characters"
          onKeyDown={handleNameChange}
          className="w-full border-[1.5px] border-stroke bg-transparent px-2 py-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />

        <div className="mt-3 flex">
          <select
            value={status}
            onChange={handleStatusChange}
            className="relative z-20 mr-2 appearance-none border border-stroke bg-transparent px-4 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
          >
            <option value="">Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>

          <select
            value={gender}
            onChange={handleGenderChange}
            className="relative z-20 appearance-none border border-stroke bg-transparent px-4 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>

          {hasFilter && (
            <button
              onClick={clearFilter}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 inline-flex items-center rounded px-4 py-2 font-bold"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {data.map((item, index) => (
                <li
                  className="cursor-pointer"
                  key={item.id}
                  onClick={() => handleContactClick(item.id)}
                >
                  <div className="flex items-center gap-3 px-6 py-5">
                    <div className="h-10 w-10 rounded-full">
                      <img src={item.image} alt="User" />
                    </div>
                    <div>
                      <h4 className="font-medium text-black dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-xs font-medium">{item.species}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default React.memo(Sidepane);
