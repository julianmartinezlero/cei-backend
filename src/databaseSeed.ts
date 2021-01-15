import { QuestionOptionsSeed } from './seeds/seed/question-options.seed';
import { InterfaceSeed } from './seeds/seed';
import { QuestionSeed } from './seeds/seed/question.seed';
import { TreatmentSeed } from './seeds/seed/treatment.seed';
import {UserSeed} from './seeds/seed/users.seed';
import {QuestionAssetSeed} from './seeds/seed/questionAsset.seed';

async function bootstrap() {
  seeding();
}

function seeding() {
  const s: InterfaceSeed[] = [
    QuestionSeed,
    QuestionOptionsSeed,
    QuestionAssetSeed,
    TreatmentSeed,
    UserSeed,
  ];
  s.forEach((se) => {
    se.run();
  });
}

bootstrap();
