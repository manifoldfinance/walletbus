import type { MouseEventHandler } from 'react';

interface Props {
  onClick: MouseEventHandler<HTMLElement>;
  text: string;
}

function Button({ onClick, text }: Props) {
  return (
    <button
      className="rounded p-2 bg-dashboard-blue text-dashboard-brown uppercase hover:bg-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
