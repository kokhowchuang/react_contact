import { EpisodeState } from '../redux/features/contactSlice';
import { format } from 'date-fns';

interface EpisodeTableProps {
  data?: Array<EpisodeState>;
}

const EpisodeTable = ({ data }: EpisodeTableProps) => {
  const formatDate = (date: string) => {
    const datetime = new Date(date);
    const formattedDate = format(datetime, 'MMMM dd, yyyy HH:mm:ss');

    return formattedDate;
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-3">
                Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Air Time
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Episode
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Created Time
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((episode: EpisodeState) => (
              <tr>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-2">
                  <h5 className="font-medium text-black dark:text-white">
                    {episode.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {episode.air_date}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {episode.episode}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(episode.created)}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EpisodeTable;
