function AssignedDeliveryRow({ delivery, onStatusChange }) {
  const handleStatusChange = e => {
    onStatusChange(delivery.id, e.target.value);
  };

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
        <select
          value={delivery.status}
          onChange={handleStatusChange}
          className="border rounded px-2 py-1"
        >
          <option value={0}>Requested</option>
          <option value={1}>PickedUp</option>
          <option value={2}>Delivered</option>
        </select>
      </td>
    </tr>
  );
}

export default AssignedDeliveryRow;
