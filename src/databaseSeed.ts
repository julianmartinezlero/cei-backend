import { QuestionOptionsSeed } from './seeds/seed/question-options.seed';
import { InterfaceSeed } from './seeds/seed';
import { QuestionSeed } from './seeds/seed/question.seed';
import { TreatmentSeed } from './seeds/seed/treatment.seed';

async function bootstrap() {
  seeding();
}

function seeding() {
  const s: InterfaceSeed[] = [
    QuestionSeed,
    QuestionOptionsSeed,
    TreatmentSeed,
  ];
  s.forEach((se) => {
    se.run();
  });
}

bootstrap();
