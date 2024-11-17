export type ValidationError = {
  message: string;
  path: Array<string>;
};

/** Represents possible problem types returned from API. */
export type ProblemResponse =
  | { type: "internal"; message: string }
  | {
      type: "validation";
      message: string;
      validationErrors: Array<ValidationError>;
    };

export class ApiProblem extends Error {
  constructor(public readonly problem: ProblemResponse) {
    super(problem.message);
  }
}

export async function processApiError(res: Response): Promise<Error> {
  const contentTypeHeader = res.headers.get("Content-Type");

  // If the error was conciously returned by the server and conforms
  // to the the agreed error schema.
  if (contentTypeHeader?.includes("application/problem+json")) {
    const body = await res.json();
    return new ApiProblem(body);
  }

  // Otherwise "panic"
  return new Error("Unexpected error");
}
