import { useLoaderData } from 'react-router';
import DeliveryRow from './DeliveryRow';

function DeliveriesTable() {
  const { requestedDeliveries } = useLoaderData();
  console.log(requestedDeliveries);

  return (
    <div className="py-10 px-5">
      <div className="container mx-auto">
        <div className="overflow-x-auto rounded-xl shadow-md bg-[#e5e5e5] p-5">
          <table className="min-w-full bg-[#e5e5e5] rounded-4xl p-10 shadow">
            <thead className="bg-[#ffa91e] text-white text-sm">
              <tr>
                <th className="text-left py-3 px-4 rounded-tl-2xl">Title</th>
                <th className="text-left py-3 px-4">Address</th>
                <th className="text-left py-3 px-4">Package Size</th>
                <th className="text-left py-3 px-4">Weight</th>
                <th className="text-left py-3 px-4 rounded-tr-2xl">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800 text-sm">
              {requestedDeliveries.map(delivery => (
                <DeliveryRow delivery={delivery} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DeliveriesTable;
