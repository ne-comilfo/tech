import { useState } from 'react';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import { useStore } from '../../store/useStore';
import './TokenForm.css';

export const TokenForm = () => {
  const [value, setValue] = useState<string>('');
  const setToken = useStore((state) => state.setToken);

  const handleSubmit = () => {
    if (value.trim()) {
      setToken(value.trim());
    }
  };

  return (
    <div className="token-form-wrapper">
      <h2 className="token-form-title">Авторизация</h2>
      <TextField
        value={value}
        onChange={(e: any) => {
          const val = typeof e === 'object' && e !== null ? e.value : e;
          setValue(val || '');
        }}
        placeholder="Введите access token"
        className="token-input-full"
      />
      <Button
        label="Войти"
        onClick={handleSubmit}
        disabled={!value.trim()}
        width="full"
      />
    </div>
  );
};