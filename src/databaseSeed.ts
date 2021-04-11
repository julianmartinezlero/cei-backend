import {QuestionOptionsSeed} from './seeds/seed/question-options.seed';
import {InterfaceSeed} from './seeds/seed';
import {QuestionSeed} from './seeds/seed/question.seed';
import {TreatmentSeed} from './seeds/seed/treatment.seed';
import {UserSeed} from './seeds/seed/users.seed';
import {QuestionAssetSeed} from './seeds/seed/questionAsset.seed';
import {ProfessionalSeed} from './seeds/seed/professional.seed';
import {TreatmentAssetSeed} from './seeds/seed/treatmentAsset.seed';

async function bootstrap() {
  await seeding();
}

async function seeding() {
  const s: InterfaceSeed[] = [
    QuestionSeed,
    QuestionOptionsSeed,
    QuestionAssetSeed,
    TreatmentSeed,
    TreatmentAssetSeed,
    UserSeed,
    ProfessionalSeed,
  ];

  for (const se of s) {
    await se.run();
  }
}

bootstrap().then(r => {
  // tslint:disable-next-line:no-console
  console.log('seeding ok');
  process.exit(0);
}).catch(a => {
  // tslint:disable-next-line:no-console
  console.log(a);
  process.exit(1);
});
