export type Inputs = {
  files: Set<string>;
  repoOwner: string;
  repoName: string;
  prNumber: number;
  maxBehindBy: number;
  githubToken: string;
  defaultGitHubToken: string;
  appID: string;
  appPrivateKey: string;
  csmServerRepoOwner: string;
  csmServerRepoName: string;
  csmAppID: string;
  csmAppPrivateKey: string;
  baseBranch: string;
  headBranch: string;
  contextPRNumber: number;
};
