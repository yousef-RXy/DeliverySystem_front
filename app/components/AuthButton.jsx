import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router';

function AuthButton({ text, className, to }) {
  const styles =
    className ?? 'border-[#198754] text-green-400 hover:bg-[#198754]';
  return (
    <Link
      to={to}
      className={clsx(
        'px-3 py-1 min-w-24 text-center border rounded transition font-bold hover:text-white',
        styles
      )}
    >
      {text}
    </Link>
  );
}

export default AuthButton;
