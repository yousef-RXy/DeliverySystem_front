import { redirect } from 'react-router';
import AuthForm from '../components/auth/AuthForm';
import { hasMinLength, isEqualsToOtherValue } from '../util/validation';
import { fetchRequest } from '../util/http';

export default function AuthenticationPage() {
  return <AuthForm />;
}

export async function clientAction({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'register') {
    return { message: ['Unsupported mode.'], status: 422 };
  }

  let errorMessages = [];

  const data = await request.formData();
  const username = data.get('name');
  const password = data.get('password');
  if (!hasMinLength(username, 3)) errorMessages.push('name is not Valid.');
  if (!hasMinLength(password, 2)) errorMessages.push('Password is Short.');

  let authData = {
    username,
    password,
  };

  if (mode === 'register') {
    const passConfirm = data.get('password-confirmation');
    if (!isEqualsToOtherValue(password, passConfirm))
      errorMessages.push(
        'The Password and the Password-confirmation is not equal.'
      );
    authData = { ...authData, role: Number(data.get('role')) };
  }

  if (errorMessages.length != 0) {
    return { messages: errorMessages, status: 400 };
  }

  const res = await fetchRequest({
    url: `user/${mode}`,
    messages: [`failed to ${mode} the user`],
    config: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    },
  });

  if (!res.id) return res;

  localStorage.setItem('id', res.id);
  localStorage.setItem('role', res.role);
  throw redirect('/');
}
