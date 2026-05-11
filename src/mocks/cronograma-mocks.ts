export interface ScheduleItem {
  classCode: string
  className: string
  teacher: string
  location: string
  schedule: string
}

export const schedulesMock: ScheduleItem[] = [
  {
    classCode: 'ENG001',
    className: 'Engenharia de Software',
    teacher: 'Prof. Carlos Silva',
    location: 'Sala 101',
    schedule: '08:00 - 09:30',
  },
  {
    classCode: 'MAT202',
    className: 'Cálculo II',
    teacher: 'Prof. Ana Costa',
    location: 'Sala 205',
    schedule: '09:45 - 11:15',
  },
  {
    classCode: 'FIS150',
    className: 'Física Geral',
    teacher: 'Prof. Roberto Santos',
    location: 'Lab 301',
    schedule: '13:00 - 14:30',
  },
  {
    classCode: 'QUI103',
    className: 'Química Orgânica',
    teacher: 'Prof. Marina Lima',
    location: 'Sala 102',
    schedule: '14:45 - 16:15',
  },
  {
    classCode: 'BIO205',
    className: 'Biologia Celular',
    teacher: 'Prof. Fernando Alves',
    location: 'Lab 302',
    schedule: '08:00 - 09:30',
  },
  {
    classCode: 'ENG002',
    className: 'Arquitetura de Computadores',
    teacher: 'Prof. Lucas Martins',
    location: 'Sala 203',
    schedule: '09:45 - 11:15',
  },
  {
    classCode: 'MAT203',
    className: 'Álgebra Linear',
    teacher: 'Prof. Beatriz Oliveira',
    location: 'Sala 104',
    schedule: '13:00 - 14:30',
  },
  {
    classCode: 'ENG003',
    className: 'Banco de Dados',
    teacher: 'Prof. Paulo Ribeiro',
    location: 'Sala 301',
    schedule: '14:45 - 16:15',
  },
  {
    classCode: 'FIS151',
    className: 'Mecânica Quântica',
    teacher: 'Prof. Josefina Gomes',
    location: 'Sala 105',
    schedule: '08:00 - 09:30',
  },
  {
    classCode: 'HIST101',
    className: 'História da Computação',
    teacher: 'Prof. Helena Souza',
    location: 'Sala 202',
    schedule: '09:45 - 11:15',
  },
  {
    classCode: 'PHIL202',
    className: 'Ética em Tecnologia',
    teacher: 'Prof. Adriano Rocha',
    location: 'Sala 204',
    schedule: '13:00 - 14:30',
  },
  {
    classCode: 'ENG004',
    className: 'Segurança da Informação',
    teacher: 'Prof. Vanessa Perez',
    location: 'Lab 303',
    schedule: '14:45 - 16:15',
  },
]

export const weekDays = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]
