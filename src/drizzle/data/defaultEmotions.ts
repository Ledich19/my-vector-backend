import { Emotion } from 'src/common/constants';

const defaultEmotions: {
  id: string;
  value: Emotion;
  label: string;
  icon: string;
}[] = [
  {
    id: '6ada0d40-7042-472a-aaa5-e0fd9b695a07',
    value: 'happy',
    label: 'Счастье',
    icon: '😊',
  },
  {
    id: 'a1a70ded-9c75-4f87-93ce-261e2d133bdb',
    value: 'sad',
    label: 'Грусть',
    icon: '😢',
  },
  {
    id: '43aa11cb-b6e6-4a30-9f77-34fe8d4faefa',
    value: 'angry',
    label: 'Злость',
    icon: '😡',
  },
  {
    id: 'adf8c658-ed8b-4488-8dfd-6f422dc43ded',
    value: 'tired',
    label: 'Усталость',
    icon: '😴',
  },
  {
    id: '81b5c6d9-2b7f-4c69-bcd5-10aabf07435a',
    value: 'anxious',
    label: 'Тревога',
    icon: '😰',
  },
  {
    id: '39a705ee-afa4-4a5f-9da4-3202c045712f',
    value: 'excited',
    label: 'Восторг',
    icon: '🤩',
  },
  {
    id: '6256307f-7be1-4593-b9a9-f8bd605212ee',
    value: 'neutral',
    label: 'Нейтрально',
    icon: '😐',
  },
  {
    id: '6b3f40bb-44a8-477d-b975-1b898f47873f',
    value: 'confused',
    label: 'Смущение',
    icon: '😕',
  },
  {
    id: 'bf27ad8f-aecf-4963-8557-6b0f237d672d',
    value: 'bored',
    label: 'Скука',
    icon: '😒',
  },
  {
    id: 'cc140877-922d-40eb-9ad1-21c9b29475b9',
    value: 'surprised',
    label: 'Удивление',
    icon: '😲',
  },
  {
    id: '8c15a089-c241-4d8f-b524-bb78a97fb700',
    value: 'proud',
    label: 'Гордость',
    icon: '😌',
  },
  {
    id: 'ffba67b2-bab0-4cc4-ad55-8d6723c7dfe4',
    value: 'disgusted',
    label: 'Отвращение',
    icon: '🤢',
  },
  {
    id: 'ff57f628-53a8-4061-8da7-ff8f13964b33',
    value: 'fearful',
    label: 'Страх',
    icon: '😨',
  },
  {
    id: '3cf82380-cb82-480b-8624-c8b32eb05508',
    value: 'lonely',
    label: 'Одиночество',
    icon: '😔',
  },
  {
    id: '04433c57-ccb6-4153-a9ab-eea7babd6832',
    value: 'hopeful',
    label: 'Надежда',
    icon: '🙏',
  },
  {
    id: 'bbeb9cff-704e-44c6-8d5b-95d7a4380172',
    value: 'relaxed',
    label: 'Расслабленность',
    icon: '😌',
  },
];

export default defaultEmotions;
