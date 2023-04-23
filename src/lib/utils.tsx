import { ToastOptions, toast } from 'react-toastify';

/* eslint-disable import/prefer-default-export */
export function shuffle(array: any[]) {
  const copy = [...array];
  let currentIndex = copy.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]];
  }

  return copy;
}

export const showToast = (title: string, subtitle?: string, options?: ToastOptions) => {
  toast(
    <div
      style={{
        padding: '16px 24px',
      }}
    >
      <div
        style={{
          marginBottom: '8px',
          color: '#000000d9',
          fontSize: '16px',
          lineHeight: '24px',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: '14px',
        }}
      >
        {subtitle}
      </div>
    </div>,
    options
  );
};
