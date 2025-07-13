http://localhost:3000/api/api-json
http://localhost:3000/api/swagger

```bash
    npm run db:generate -- имя_миграции
    npm run  db:migrate
```

INSERT INTO users (id, email, role_id) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'test@example.com', 1);

# Документация структуры данных приложения планирования упражнений с паттерном «слоёв» (overlay)

---

## Введение

Данная система построена на паттерне «слоёв» (overlay), где базовый неизменяемый шаблон плана хранится отдельно от пользовательских кастомизаций. Это снижает дублирование данных, даёт гибкость в изменении планов и облегчает поддержку.

---

## Основные понятия паттерна «слоёв»

- **Шаблон (template)** — содержит базовую структуру плана с днями и упражнениями без конкретных дат.
- **Пользовательский план (instance)** — ссылка на шаблон с конкретной датой старта и привязкой к пользователю.
- **Кастомизации пользователя** — отдельные сущности, которые переопределяют или дополняют дни и упражнения шаблона.
- При отображении плана данные шаблона и кастомизации объединяются (мерджатся), формируя итоговый пользовательский план.

---

## Структура данных

```ts














// === Структура данных приложения для планирования и кастомизации упражнений ===

// Шаблон плана — неизменяемый базовый план,
// содержит дни с упражнениями без конкретных дат,
// используется как исходник для пользовательских планов
type PlanTemplate = {
  id: number
  title: string
  description?: string
  days: ScheduledDayTemplate[]
  repetitions?: number // количество повторений плана (цикл)
  isTemplate: true
}

// Пользовательский план — привязка шаблона к конкретному пользователю,
// содержит дату начала и возможные кастомизации,
// в базе один UserPlan ссылается на один PlanTemplate
type UserPlan = {
  id: number
  templateId: number // ссылка на PlanTemplate
  userid: number
  startDate: string // дата начала выполнения плана пользователем
  repetitions?: number // может переопределять repetitions из шаблона
  isTemplate: false
}

// День в шаблоне — часть неизменяемого шаблона,
// содержит порядковый номер и упражнения на этот день
type ScheduledDayTemplate = {
  id: number
  dayNumber: number // порядковый номер дня в плане
  exerciseSlots: ExerciseSlotTemplate[] // упражнения в этот день
}

// День пользователя — кастомизации и метаданные для дня,
// привязан к дню шаблона, содержит конкретную дату и дополнительные поля
type UserScheduledDay = {
  id: number
  userPlanId: number
  templateDayId: number
  date?: string // рассчитанная дата для userPlan (startDate + dayNumber - 1)
  dayNumber?: number // при кастомизации может отличаться от шаблона
  notes?: string // дополнительные заметки пользователя к дню
}

// Упражнение в шаблоне — базовое описание слота,
// содержит ссылку на упражнение и параметры по умолчанию
type ExerciseSlotTemplate = {
  id: number
exerciseId: number
  time?: string // время выполнения в дне (например, "08:00")
  repetitions?: number
  durationSeconds?: number
}

// Кастомизация слота у пользователя — позволяет переопределять
// параметры упражнения, менять упражнение, менять время, количество повторений и др.
// Привязана к слоту шаблона и дню пользователя
type UserExerciseSlot = {
  id: number
  userScheduledDayId: number
  templateSlotid: number // ссылка на ExerciseSlotTemplate
exerciseId?: string // если пользователь заменил упражнение
  time?: string
  repetitions?: number
  durationSeconds?: number
}

// Основное упражнение — описание упражнения с типом и форматом ввода
type Exercise = {
  id: number
  title: string
  description?: string
  exerciseTypeid: number
  practiceType: PracticeType
  inputFormat: 'repetition' | 'duration' | 'text' | 'boolean'
}

// Тип упражнения — классификация упражнений (например, физическое, когнитивное)
type ExerciseType = {
  id: number
  name: string
}

// Лог выполнения упражнения пользователем,
// фиксирует факт выполнения, дату, оценки и заметки
type ExerciseLog = {
  id: number
  userid: number
exerciseId: number
  userPlanId?: string // ссылка на пользовательский план
  date: string // дата выполнения
  isCompleted: boolean
  rating?: number
  notes?: string
  emotionId?: string
}
```
