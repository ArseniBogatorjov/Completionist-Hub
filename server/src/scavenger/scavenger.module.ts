import { Module } from '@nestjs/common';
import { ScavengerService } from './scavenger.service';

@Module({
  providers: [ScavengerService],
})
export class ScavengerModule {}
