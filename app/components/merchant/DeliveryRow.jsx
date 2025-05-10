import React from 'react';

function DeliveryRow({ delivery }) {
  return (
    <tr
      className="even:bg-[#f2f2f2] odd:bg-white hover:bg-[#ececec]"
      key={delivery.id}
    >
      <td className="py-3 px-4">{delivery.title}</td>
      <td className="py-3 px-4">{delivery.address}</td>
      <td className="py-3 px-4">{delivery.packageSize}</td>
      <td className="py-3 px-4">{delivery.weight}</td>
      <td className="py-3 px-4">
        {delivery.status === 0
          ? 'Requested'
          : delivery.status === 1
          ? 'PickedUp'
          : 'Delivered'}
      </td>
    </tr>
  );
}

export default DeliveryRow;
