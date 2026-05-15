import { useStore } from '../../store/useStore';
import { TokenForm } from '../../components/TokenForm/TokenForm';
import { Navigation } from '../../components/Navigation/Navigation';
import { UserTable } from '../../components/UserTable/UserTable';
import { PostTable } from '../../components/PostTable/PostTable';
import './MainPage.css';

export const MainPage = () => {
  const token = useStore((state) => state.token);
  const activeTab = useStore((state) => state.activeTab);

  if (!token) {
    return <TokenForm />;
  }

  return (
    <div className="main-page">
      <Navigation />
      {activeTab === 'users' ? <UserTable /> : <PostTable />}
    </div>
  );
};

