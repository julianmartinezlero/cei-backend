import { QuestionOptionsSeed } from './seeds/seed/question-options.seed';
import { InterfaceSeed } from './seeds/seed';
import { QuestionSeed } from './seeds/seed/question.seed';

async function bootstrap() {
  seeding();
}

function seeding() {
  const s: InterfaceSeed[] = [
    QuestionSeed,
    QuestionOptionsSeed,
  ];
  // return new Promise((resolve, reject) => {
  s.forEach((se) => {
    se.run();
  });
  // resolve(true);
  // reject(false);
  // });
}

bootstrap();
