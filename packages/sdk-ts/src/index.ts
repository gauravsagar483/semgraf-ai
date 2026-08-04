export type Plane = "metric" | "relationship";

export type AskResponse = {
  question: string;
  plane: Plane;
  metric?: string | null;
  sql?: string | null;
  rows?: Record<string, unknown>[];
  columns?: string[];
  definition_version?: string | null;
  graph_nodes?: Record<string, unknown>[];
  message?: string | null;
  latency_ms?: number;
  error_code?: string | null;
};

export class SemgrafClient {
  constructor(private baseUrl = "http://127.0.0.1:8080") {}

  async ask(question: string, opts?: { plane?: Plane; fixture?: string }): Promise<AskResponse> {
    const res = await fetch(`${this.baseUrl}/api/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        plane: opts?.plane,
        fixture: opts?.fixture,
      }),
    });
    if (!res.ok) {
      throw new Error(`Semgraf ask failed: ${res.status}`);
    }
    return (await res.json()) as AskResponse;
  }

  async listMetrics(): Promise<unknown[]> {
    const res = await fetch(`${this.baseUrl}/api/metrics`);
    return (await res.json()) as unknown[];
  }
}
