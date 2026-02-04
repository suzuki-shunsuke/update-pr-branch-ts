import * as core from "@actions/core";
import * as github from "@actions/github";
import type { Inputs } from "./input.ts";
import { compareCommits } from "./compare.ts";
import { updateBranch } from "./update_branch.ts";
import { getToken, revoke } from "./github_token.ts";
import { getPullRequest } from "./get_pr.ts";
import { checkUpdated } from "./check.ts";

export const updatePRBranch = async (inputs: Inputs): Promise<void> => {
  try {
    await run(inputs);
  } finally {
    await revoke();
  }
};

const run = async (inputs: Inputs) => {
  const octokit = github.getOctokit(
    await getToken({
      repo: {
        owner: inputs.repoOwner,
        repo: inputs.repoName,
      },
      githubToken: inputs.githubToken,
      defaultGitHubToken: inputs.defaultGitHubToken,
      app: {
        id: inputs.appID,
        privateKey: inputs.appPrivateKey,
      },
      actions: {
        getPR: inputs.baseBranch === "",
        updateBranch: inputs.csmAppPrivateKey === "",
      },
    }),
  );
  if (inputs.baseBranch) {
    const pr = await getPullRequest(octokit, inputs);
    inputs.baseBranch = pr.base;
    inputs.headBranch = pr.head;
  }
  const compareResult = await compareCommits(octokit, inputs);
  if (!checkUpdated([...inputs.files], compareResult, inputs.maxBehindBy)) {
    core.info("skip updating branch");
    core.setOutput("updated", false);
    return;
  }
  await updateBranch(octokit, inputs);
  core.setOutput("updated", true);
  if (inputs.prNumber === inputs.contextPRNumber) {
    core.setFailed("PR branch is updated");
  }
};
