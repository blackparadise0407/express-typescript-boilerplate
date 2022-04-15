import Bull, { Queue } from 'bull';

import { EMAIL_QUEUE } from '@app/constants/bull';

export class QueueFactory {
  public static emailQueue: Queue = new Bull(EMAIL_QUEUE);
}
