# 🌿 EcoTech API — RESTful сервис

Серверный REST API, реализующий CRUD-операции для сущности *Technologies*.  
Использует архитектуру Controller-Service-Model и DTO-подход.

---

## 🚀 Стек технологий
- Node.js  
- Express  
- DTO / MVC структура  
- Postman (для тестов)

---

## ⚙️ Установка и запуск
```bash
git clone https://github.com/<username>/EcoTech-API.git
cd EcoTech-API
npm install
npm start
```

---

## 🧩 Основные маршруты
| Метод | Путь | Описание |
|-------|------|-----------|
| GET | /technologies/list | Список технологий |
| GET | /technologies/details/:id | Детали |
| POST | /technologies/admin/add | Добавление |
| PUT | /technologies/admin/edit/:id | Обновление |
| DELETE | /technologies/admin/delete/:id | Удаление |

---

## 👤 Автор
**<твоё имя / ник>**  
Backend Developer | API Engineer
