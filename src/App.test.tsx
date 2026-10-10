import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
describe("JAMA demo workflow", () => {
  it("shows the official slogan and explicitly labels demo offers", async () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Comida rica de hoy, más barata y cerca de ti.",
    );
    expect(
      await screen.findByRole("heading", { name: "Torta de chocolate" }),
    ).toBeVisible();
    expect(screen.getByText(/Catálogo demo/)).toHaveTextContent(
      "No hay ofertas reales ni reservas",
    );
  });
  it("filters by category, searches and recovers from no results", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole("heading", { name: "Torta de chocolate" });
    await user.click(screen.getByRole("button", { name: "Panadería" }));
    expect(
      screen.queryByRole("heading", { name: "Torta de chocolate" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Combo de pan artesanal" }),
    ).toBeVisible();
    await user.type(screen.getByRole("searchbox"), "zzz");
    expect(screen.getByText("No encontramos ese antojo.")).toBeVisible();
    await user.click(
      screen.getByRole("button", { name: "Ver todos los ejemplos" }),
    );
    expect(
      screen.getByRole("heading", { name: "Torta de chocolate" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Croissants de mantequilla" }),
    ).toBeVisible();
  });
  it("opens product details without offering payments or reservations", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      await screen.findByRole("button", {
        name: "Ver detalles de Torta de chocolate",
      }),
    );
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText(/No está a la venta/)).toBeVisible();
    await user.click(
      within(dialog).getByRole("button", { name: "Seguir explorando" }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("validates partner information and clearly states it was not sent", async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole("button", { name: /Validar mis datos/ });
    await user.click(button);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    await user.type(
      screen.getByLabelText("Nombre del negocio"),
      "Negocio de prueba",
    );
    await user.type(
      screen.getByLabelText("Correo de contacto"),
      "ejemplo@example.com",
    );
    await user.selectOptions(
      screen.getByLabelText("Zona de Ayacucho"),
      "Huamanga",
    );
    await user.click(button);
    expect(screen.getByRole("status")).toHaveTextContent("No se enviaron");
    await user.type(screen.getByLabelText("Nombre del negocio"), "!");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
