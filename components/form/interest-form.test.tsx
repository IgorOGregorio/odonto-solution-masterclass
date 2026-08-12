import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const formAction = vi.fn();

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useActionState: () => [
      { ok: false as const, fieldErrors: {} },
      formAction,
      true,
    ],
  };
});

vi.mock("@/lib/attribution", () => ({
  getStoredAttribution: () => ({}),
  parseAttributionFromSearch: () => ({}),
  storeAttributionIfNeeded: () => {},
}));

import { InterestForm } from "@/components/form/interest-form";

describe("InterestForm", () => {
  it("disables CTA and shows loading label while submit is pending", () => {
    render(<InterestForm />);

    const loading = screen.getByRole("button", { name: /Enviando/i });
    expect(loading).toBeDisabled();
  });
});
