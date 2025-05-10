import { useEffect, useState } from 'react';
import { useActionData, useLoaderData } from 'react-router';
import { toast, Toaster } from 'sonner';
import AssignedDeliveryRow from './AssignedDeliveryRow';
import { fetchRequest } from '../../util/http';

function AssignedDeliveriesTable() {
  const { assignedDeliveries } = useLoaderData();
  const data = useActionData();
  const [deliveries, setDeliveries] = useState(assignedDeliveries || []);

  useEffect(() => {
    if (data?.messages) {
      data.messages.forEach(msg => toast.error(msg));
    }
    if (assignedDeliveries?.messages) {
      assignedDeliveries.messages.forEach(msg => toast.error(msg));
    }
  }, [data]);

  const handleStatusChange = async (id, newStatus) => {
    let body = {
      status: Number(newStatus),
    };

    const res = await fetchRequest({
      url: `deliveries/${id}/status`,
      messages: [`failed to update status`],
      config: {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    });

    if (res.messages) {
      res.messages.map(msg => toast.error(msg));
    } else {
      setDeliveries(prev =>
        prev
          .map(d => (d.id === id ? { ...d, status: Number(newStatus) } : d))
          .filter(d => d.status !== 2)
      );
      toast.success('Status updated successfully');
    }
  };

  return (
    <>
      <Toaster richColors closeButton="true" />
      <div className="py-10 px-5">
        <div className="container mx-auto">
          <div className="overflow-x-auto rounded-xl shadow-md bg-[#e5e5e5] p-5">
            <table className="min-w-full bg-[#e5e5e5] rounded-2xl p-10 shadow">
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
                {!assignedDeliveries?.messages &&
                  deliveries.map(delivery => (
                    <AssignedDeliveryRow
                      key={delivery.id}
                      delivery={delivery}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignedDeliveriesTable;
