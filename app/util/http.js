export async function fetchRequest({ url, messages, config = {} }) {
  const res = await fetch(`${import.meta.env.VITE_URL}${url}`, config);

  if (!res.ok) {
    return {
      messages,
      status: res.status,
    };
  }

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const resData = await res.json();
    return resData;
  }

  return { success: true };
}
