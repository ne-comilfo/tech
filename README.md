# GoRest Dashboard

[![Deploy Status](https://img.shields.io/badge/Demo-GitHub%20Pages-blueviolet?style=for-the-badge&logo=github)](https://ne-comilfo.github.io/tech/)

SPA-приложение для управления пользователями и постами на основе публичного API GoRest, разработанное с использованием дизайн-системы Consta.

## Функционал
- Авторизация по персональному Access Token.
- Просмотр списка пользователей и постов в виде таблиц с пагинацией и выбором количества элементов на странице.
- Просмотр детальной информации о пользователе.
- Просмотр детальной информации о посте и связанных с ним комментариев.
- Смена темы оформления через пресеты Consta WP.

## Стек технологий
- React
- TypeScript
- Vite
- Zustand 
- Axios 
- @consta/uikit
- React Router DOM v6

## Установка и запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/ne-comilfo/tech.git
cd tech
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Запуск приложения в режиме разработки
```bash
npm run dev
```

### 4. Сборка для продакшена
```bash
npm run build
```