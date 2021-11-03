import { Treatment } from '../../entity/treatment.entity';

export const TREATMENT_DATA: Treatment[] = [
  {
    id: 1,
    range: 0,
    text: 'Usted no presenta riesgo',
    sessions: null,
    week: 4,
    month: null,
    shortText: 'Dictado y Escritura',
  },
  {
    id: 2,
    range: 1,
    text: 'Usted presenta un riesgo leve, por lo cual se recomienda realizar ' +
      'unas serie de ejercicios para reforzar su desarrollo y de esa forma no ' +
      'presentar ningún riesgo',
    sessions: null,
    week: 8,
    month: null,
    shortText: 'Matematicas y Motricidad',
  },
  {
    id: 3,
    range: 2,
    text: 'Usted presenta un riesgo moderado, por lo cual se recomienda ' +
      'realizar unas serie de ejercicios para reforzar su desarrollo y ' +
      'de esa forma no presentar ningún riesgo',
    sessions: null,
    week: 12,
    month: null,
    shortText: 'Lectura',
  },
  {
    id: 4,
    range: 3,
    text: 'Usted presenta un riesgo alto, por lo cual se recomienda ' +
      'realizar unas serie de ejercicios para reforzar su desarrollo ' +
      'y de esa forma no presentar ningún riesgo',
    sessions: null,
    week: 16,
    month: null,
    shortText: 'Trazos y Motricidad',
  },

  {
    id: 5,
    range: 0,
    text: `
        -Realizar dictado con el material facilitado.
        -Escribe tu nombre 10 veces.
        -Práctica la forma correcta del alfabeto.
        -Otros ejercicios.`,
    sessions: 2,
    week: 1,
    month: 1,
    shortText: 'Dictado y Escritura',
  },
  {
    id: 6,
    range: 1,
    text: `
        -Realizar dictado con el material facilitado.
        -Escribe tu nombre 10 veces.
        -Práctica la forma correcta del alfabeto.
        -Otros ejercicios.`,
    sessions: 10,
    week: 1,
    month: 1,
    shortText: 'Dictado y Escritura',
  },
  {
    id: 7,
    range: 2,
    text: `
        -Realizar dictado con el material facilitado.
        -Escribe tu nombre 10 veces.
        -Práctica la forma correcta del alfabeto.
        -Otros ejercicios.`,
    sessions: 20,
    week: 1,
    month: 2,
    shortText: 'Dictado y Escritura',
  },
  {
    id: 8,
    range: 3,
    text: `
        -Realizar dictado con el material facilitado.
        -Escribe tu nombre 10 veces.
        -Práctica la forma correcta del alfabeto.
        -Otros ejercicios.`,
    sessions: 30,
    week: 1,
    month: 3,
    shortText: 'Dictado y Escritura',
  },
//  Matematicas y motricidad
  {
    id: 9,
    range: 0,
    text: `
    -Realiza la escritura de los números.
    - Realiza los ejercicios propuestos en el sistema.
`,
    sessions: 1,
    week: 1,
    month: 1,
    shortText: 'Matematicas y Motricidad',
  },
  {
    id: 10,
    range: 1,
    text: `
    -Realiza la escritura de los números.
    - Realiza los ejercicios propuestos en el sistema.
`,
    sessions: 10,
    week: 1,
    month: 1,
    shortText: 'Matematicas y Motricidad',
  },
  {
    id: 11,
    range: 2,
    text: `
    -Realiza la escritura de los números.
    - Realiza los ejercicios propuestos en el sistema.
`,
    sessions: 20,
    week: 1,
    month: 2,
    shortText: 'Matematicas y Motricidad',
  },
  {
    id: 12,
    range: 3,
    text: `
    -Realiza la escritura de los números.
    - Realiza los ejercicios propuestos en el sistema.
`,
    sessions: 30,
    week: 1,
    month: 3,
    shortText: 'Matematicas y Motricidad',
  },
//  lectura
  {
    id: 13,
    range: 0,
    text: `-Práctica lectura a través de las cartillas y libros.`,
    sessions: 0,
    week: 0,
    month: 0,
    shortText: 'Lectura',
  },
  {
    id: 14,
    range: 1,
    text: `-Práctica lectura a través de las cartillas y libros.`,
    sessions: 10,
    week: 1,
    month: 1,
    shortText: 'Lectura',
  },
  {
    id: 15,
    range: 2,
    text: `-Práctica lectura a través de las cartillas y libros.`,
    sessions: 20,
    week: 1,
    month: 2,
    shortText: 'Lectura',
  },
  {
    id: 16,
    range: 3,
    text: `-Práctica lectura a través de las cartillas y libros.`,
    sessions: 30,
    week: 2,
    month: 3,
    shortText: 'Lectura',
  },
//  Motricidad
  {
    id: 17,
    range: 0,
    text: `-Práctica en los cuadernillos de motricidad y trazos.`,
    sessions: 0,
    week: 0,
    month: 0,
    shortText: 'Trazos y Motricidad',
  },
  {
    id: 18,
    range: 1,
    text: `-Práctica en los cuadernillos de motricidad y trazos.`,
    sessions: 10,
    week: 1,
    month: 1,
    shortText: 'Trazos y Motricidad',
  },
  {
    id: 19,
    range: 2,
    text: `-Práctica en los cuadernillos de motricidad y trazos.`,
    sessions: 20,
    week: 1,
    month: 2,
    shortText: 'Trazos y Motricidad',
  },
  {
    id: 20,
    range: 3,
    text: `-Práctica en los cuadernillos de motricidad y trazos.`,
    sessions: 30,
    week: 1,
    month: 3,
    shortText: 'Trazos y Motricidad',
  },
//  razonamiento verbal
  {
    id: 21,
    range: 0,
    text: `-Práctica a través de los cuadernillos de Razonamiento Verbal.`,
    sessions: 0,
    week: 0,
    month: 0,
    shortText: 'Razonamiento Verbal',
  },
  {
    id: 22,
    range: 1,
    text: `-Práctica a través de los cuadernillos de Razonamiento Verbal.`,
    sessions: 10,
    week: 1,
    month: 1,
    shortText: 'Razonamiento Verbal',
  },
  {
    id: 23,
    range: 2,
    text: `-Práctica a través de los cuadernillos de Razonamiento Verbal.`,
    sessions: 20,
    week: 1,
    month: 2,
    shortText: 'Razonamiento Verbal',
  },
  {
    id: 24,
    range: 3,
    text: `-Práctica a través de los cuadernillos de Razonamiento Verbal.`,
    sessions: 30,
    week: 1,
    month: 3,
    shortText: 'Razonamiento Verbal',
  },
];
