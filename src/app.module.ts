import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ManagementsModule } from './managements/managements.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { WorkersModule } from './workers/workers.module';
import { TeamsModule } from './teams/teams.module';
import { AdditionalDataModule } from './additional-data/additional-data.module';
import { PhaseInputsModule } from './phase-inputs/phase-inputs.module';
import { InputStatusModule } from './input-status/input-status.module';
import { UserHistoriesModule } from './user-histories/user-histories.module';
import { CostsModule } from './costs/costs.module';
import { StatusTaskModule } from './status-task/status-task.module';
import { TechnicalAreasModule } from './technical-areas/technical-areas.module';
import { TypeProjectsModule } from './type-projects/type-projects.module';
import { ProjectsPhaseModule } from './projects-phase/projects-phase.module';
import { TrackingsModule } from './trackings/trackings.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [AuthModule, UsersModule, ProjectsModule, ManagementsModule, TasksModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'gestionador',
    autoLoadEntities: true,
    synchronize: true,
    ssl:{
      rejectUnauthorized: false
    }
    /* ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      }, */
    }),
    WorkersModule,
    TeamsModule,
    AdditionalDataModule,
    PhaseInputsModule,
    InputStatusModule,
    UserHistoriesModule,
    CostsModule,
    StatusTaskModule,
    TechnicalAreasModule,
    TypeProjectsModule,
    ProjectsPhaseModule,
    TrackingsModule,
    ReportsModule],
  controllers: [],
  providers:[],
})
export class AppModule {}
