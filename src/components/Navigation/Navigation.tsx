import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { Button } from '@consta/uikit/Button';
import { useStore } from '../../store/useStore';
import './Navigation.css';

type Item = string;
const items: Item[] = ['Пользователи', 'Посты'];

export const Navigation = () => {
  const activeTab = useStore((state) => state.activeTab);
  const setActiveTab = useStore((state) => state.setActiveTab);
  const logout = useStore((state) => state.logout);

  const currentValue = activeTab === 'users' ? items[0] : items[1];

  const handleChange = (value: Item) => {
    setActiveTab(value === items[0] ? 'users' : 'posts');
  };

  return (
    <div className="navigation-wrapper">
      <ChoiceGroup
        value={currentValue}
        onChange={handleChange}
        items={items}
        getItemLabel={(item) => item}
        multiple={false}
        name="NavigationChoice"
      />
      <Button label="Выйти" onClick={logout} view="ghost" />
    </div>
  );
};