http://localhost:3000/api/api-json
http://localhost:3000/api/swagger


INSERT INTO users (id, email, role_id) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'test@example.com', 1);

INSERT INTO emotion_entries (
  id,
  user_id,
  emotion_id,
  situation,
  thoughts,
  sensations,
  actions,
  created_at
) VALUES (
  '8e057cd0-a291-418a-9f4b-6b4fd369dace',
  '550e8400-e29b-41d4-a716-446655440000',
  '43aa11cb-b6e6-4a30-9f77-34fe8d4faefa',
  'Выключается компютер, кішка залила відеокарту',
  'На кішку не злюсь. Излить сама ситуація. Що я не можу нічого зробити нормально, тільки починаю читати чи щось робити. Вимикається, збивае концентрацію, і потім тратиться час щоб а\'вімкнути.',
  'Тепо в грудній клітині',
  'Замовыв нову',
  '2025-06-21 06:59:43.919449'
);