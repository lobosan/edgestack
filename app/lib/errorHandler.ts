import { z } from "zod";

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "AppError";
  }
}

export function handleError(error: unknown) {
  if (error instanceof z.ZodError) {
    return {
      message: "Validation error",
      errors: error.errors,
      statusCode: 400,
    };
  }

  if (error instanceof AppError) {
    return { message: error.message, statusCode: error.statusCode };
  }

  console.error(error);
  return { message: "Internal server error", statusCode: 500 };
}
