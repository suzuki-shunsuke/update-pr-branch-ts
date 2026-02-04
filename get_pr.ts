import type { getOctokit } from "@actions/github";
import type { Inputs } from "./input.ts";

type PullRequest = {
  base: string;
  head: string;
};

export const getPullRequest = async (
  octokit: ReturnType<typeof getOctokit>,
  inputs: Inputs,
): Promise<PullRequest> => {
  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: inputs.repoOwner,
    repo: inputs.repoName,
    pull_number: inputs.prNumber,
  });
  return {
    base: pullRequest.base.ref,
    head: pullRequest.head.ref,
  };
};
