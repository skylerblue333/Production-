import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

// db is imported transitively by feature routers wired into appRouter; mock to avoid real connections.
vi.mock("./db", () => ({}));
vi.mock("./_core/notification", () => ({ notifyOwner: vi.fn().mockResolvedValue(true) }));

import { appRouter } from "./routers";
import { generatedRouter } from "./routers/generated";

function anonCtx(): TrpcContext {
  return { user: null, req: {} as any, res: {} as any };
}

describe("generated router (draft procedures)", () => {
  it("exposes a large set of generated procedures", () => {
    const keys = Object.keys((generatedRouter as any)._def.record ?? (generatedRouter as any)._def.procedures ?? {});
    // Sanity: the aggregator should expose a substantial number of endpoints.
    expect(keys.length).toBeGreaterThan(250);
  });

  it("addComment validates input and returns a labeled stub", async () => {
    const caller = appRouter.createCaller(anonCtx());
    const res: any = await (caller as any).generated.addComment({
      text: "hello world",
      userId: "u1",
      postId: "p1",
    });
    expect(res.__generated).toBe(true);
    expect(res.procedure).toBe("addComment");
    expect(res.received).toMatchObject({ text: "hello world", userId: "u1", postId: "p1" });
  });

  it("addComment rejects invalid input (empty text)", async () => {
    const caller = appRouter.createCaller(anonCtx());
    await expect(
      (caller as any).generated.addComment({ text: "", userId: "u1", postId: "p1" }),
    ).rejects.toBeTruthy();
  });

  it("analyzePerformance (query) echoes validated input", async () => {
    const caller = appRouter.createCaller(anonCtx());
    const res: any = await (caller as any).generated.analyzePerformance({ coinId: "SKY" });
    expect(res.__generated).toBe(true);
    expect(res.received.coinId).toBe("SKY");
  });
});
