import { redirect, useNavigate } from 'react-router';
import { fetchRequest } from '../util/http';
import { useEffect } from 'react';
import { useState } from 'react';
import MerchantForm from '../components/merchant/MerchantForm';
import DeliveriesTable from '../components/merchant/DeliveriesTable';
import AssignedDeliveriesTable from '../components/deliveryPerson/AssignedDeliveriesTable';

export default function Home() {
  const navigate = useNavigate();
  const [isMerchant, setIsMerchant] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem('id');
    const role = localStorage.getItem('role');

    if (!role || !id) {
      navigate('/auth');
    }

    setIsMerchant(localStorage.getItem('role') === 'Merchant');
  }, [location]);

  return (
    <>
      {isMerchant ? (
        <>
          <MerchantForm />
          <DeliveriesTable />
        </>
      ) : (
        <>
          <AssignedDeliveriesTable />
        </>
      )}
    </>
  );
}

export async function clientLoader() {
  const id = localStorage.getItem('id');

  const deliveryPeopleRes = await fetchRequest({
    url: `delivery-people`,
    messages: [`failed to get delivery people`],
  });

  const requestedDeliveriesRes = await fetchRequest({
    url: `deliveries/requested/${id}`,
    messages: [`failed to get requested deliveries`],
  });

  const assignedDeliveriesRes = await fetchRequest({
    url: `deliveries/assigned/${id}`,
    messages: [`failed to get assigned deliveries`],
  });

  return {
    deliveryPeople: deliveryPeopleRes,
    assignedDeliveries: assignedDeliveriesRes,
    requestedDeliveries: requestedDeliveriesRes,
  };
}

export async function clientAction({ request }) {
  const id = localStorage.getItem('id');
  const form = await request.formData();

  const deliveryData = {
    title: form.get('title'),
    size: Number(form.get('size')),
    weight: Number(form.get('weight')),
    address: form.get('address'),
    merchantId: id,
    deliveryPersonId: form.get('deliveryPersonId'),
  };

  const res = await fetchRequest({
    url: `deliveries/request`,
    messages: [`failed to get delivery people`],
    config: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deliveryData),
    },
  });

  return res;
}
