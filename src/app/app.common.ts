import { AppRoutingModule } from './app-routing.module';

import { GithubService } from './shared/github.service';
import { IssuesProcessor } from './shared/issues-processor.service';

export const SHARED_MODULES: any[] = [
  AppRoutingModule
];

export const SHARED_PROVIDERS: any[] = [
  GithubService,
  IssuesProcessor
];

export * from './app-routing.module';
