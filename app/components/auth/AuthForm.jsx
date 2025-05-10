import { useState } from 'react';
import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from 'react-router';
import { toast, Toaster } from 'sonner';

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState(0);
  const isSignup = searchParams.get('mode') === 'register';
  const isSubmitting = navigation.state === 'submitting';

  if (data && data.messages) {
    data.messages.map(msg => toast.error(msg));
  }

  return (
    <>
      <Toaster richColors closeButton="true" />
      <div className="py-5 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#e5e5e5]">
          {!isSignup ? 'Log in' : 'Create a new user'}
        </h1>
        <div className="bg-[#e5e5e5] p-8 rounded-xl shadow-lg w-full max-w-[66%]">
          <Form method="post" className="space-y-6">
            <p className="mb-4">
              <label htmlFor="name" className="labelStyle">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                className="inputStyle"
              />
            </p>

            <p className="mb-4">
              <label htmlFor="password" className="labelStyle">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                className="inputStyle"
              />
            </p>

            {!!isSignup && (
              <>
                <p className="mb-4">
                  <label htmlFor="password-confirmation" className="labelStyle">
                    Password Confirmation
                  </label>
                  <input
                    id="password-confirmation"
                    type="password"
                    name="password-confirmation"
                    required
                    className="inputStyle"
                  />
                </p>
                <p className="mb-4">
                  <label htmlFor="role" className="labelStyle">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    id="role"
                    name="role"
                    required
                    className="w-full shadow border border-gray-300 h-10 px-4 py-2 rounded-lg focus:outline-none hover:ring-1 hover:bg-[#ffa91e] hover:ring-black focus:ring-1 focus:bg-[#ffa91e] focus:ring-black text-black bg-white"
                  >
                    <option value={0}>Merchant</option>
                    <option value={1}>DeliveryPerson</option>
                  </select>
                </p>
              </>
            )}

            <div className="flex flex-col gap-4 justify-center items-center mt-4 md:flex-row">
              <Link
                to={`?mode=${!isSignup ? 'register' : 'login'}`}
                className={`${
                  !isSignup ? 'text-s' : ''
                } buttonStyle text-center`}
              >
                {!isSignup ? 'Create new user' : 'Login'}
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="buttonStyle w-full md:w-36 text-center"
              >
                {isSubmitting
                  ? 'Submitting...'
                  : !isSignup
                  ? 'Login'
                  : 'Sign Up'}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AuthForm;
