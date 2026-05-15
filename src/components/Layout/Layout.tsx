import type { ReactNode } from 'react';
import { Text } from '@consta/uikit/Text';
import { useStore } from '../../store/useStore';
import './Layout.css';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const token = useStore((state) => state.token);

  return (
    <div className="layout-wrapper">
      <header className="layout-header">
        <div className="layout-header-content">
          <Text size="2xl" weight="bold">GoRest Dashboard</Text>
          {token && <Text size="s" view="ghost">Пользователь авторизован</Text>}
        </div>
      </header>
      
      <main className="layout-main">
        <div className="layout-main-content">
          {children}
        </div>
      </main>
    </div>
  );
};