import type { Client } from "@suzuki-shunsuke/github-app-token";

export type Inputs = {
  files: Set<string>;
  repoOwner: string;
  repoName: string;
  prNumber: number;
  maxBehindBy: number;
  githubToken: string;
  defaultGitHubToken: string;
  /**
   * An Octokit client authenticated as the GitHub App creating the token this
   * package works with.
   *
   * Undefined falls back to defaultGitHubToken.
   */
  appOctokit?: Client;
  csmServerRepoOwner: string;
  csmServerRepoName: string;
  /**
   * An Octokit client authenticated as the GitHub App for Securefix Action.
   *
   * Setting it is what makes the branch update go through Securefix Action
   * rather than the pull request update API.
   */
  csmAppOctokit?: Client;
  baseBranch: string;
  headBranch: string;
  contextPRNumber: number;
  updateIf300Files: boolean;
};
