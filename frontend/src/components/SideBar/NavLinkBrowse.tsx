import * as React from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export default function NavLinkBrowse({ children }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = React.useMemo(
    () => location.pathname.startsWith('/browse'),
    [location.pathname],
  );

  const onNavigate = () => {
    if (location.pathname === '/browse') return;
    navigate({ pathname: '/browse' });
  };

  return (
    <div className="flex flex-col">
      <button
        className={classNames(
          'w-full flex flex-row px-3 py-2 items-center text-headline rounded-[8px] transition-colors duration-200',
          {
            'bg-black-200 text-black': isActive,
            'bg-white text-black-400 hover:bg-black-100': !isActive,
          },
        )}
        onClick={onNavigate}
      >
        <span className="flex-1 text-left">Browse</span>
        <DownArrow
          className={classNames('transition-transform duration-300', {
            'text-black-800 rotate-[-180deg] ': isActive,
          })}
          fill="currentColor"
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300 flex flex-col items-stretch"
        style={{
          height: isActive ? 300 : 0,
        }}
      >
        <div className="flex-1 flex flex-row gap-[8px] py-2">
          <div className="w-6 h-full border-r border-r-black-200" />
          <div className="h-full flex-1 flex flex-col gap-[4px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
