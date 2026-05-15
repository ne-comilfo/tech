import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { Loader } from '@consta/uikit/Loader';
import { api } from '../../api/axios';
import './UserDetails.css';

type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get(`/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!user) return <Text>Пользователь не найден</Text>;

  return (
    <div className="details-container">
      <div>
        <Button label="Назад к списку" onClick={() => navigate(-1)} view="ghost" />
      </div>
      <div className="details-card">
        <Text size="2xl" weight="bold">{user.name}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Пол: {user.gender}</Text>
        <Text>Статус: {user.status}</Text>
      </div>
    </div>
  );
};