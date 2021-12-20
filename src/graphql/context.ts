import { PrismaClient } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { args } from "../configs/api";

export type Context = {
  prisma: PrismaClient;
  configs: {
    host: string;
    api_key: string | undefined;
    base_url: string | undefined;
    language: string | undefined;
  };
};

//@ts-ignore
export async function createContext(req, res): Promise<Context> {
  return {
    prisma,
    configs: args,
  };
}
