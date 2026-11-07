export type Payment = { id: string; bill: string; client: string; cents: number; paidAt: string };
export type CaseStatus = "pending" | "analysis" | "confirmed" | "resolved" | "dismissed";
export type Review = { status: CaseStatus; note: string; updatedAt: string; history: { status: CaseStatus; note: string; at: string }[] };
export type DuplicateCase = { bill: string; client: string; payments: Payment[]; extra: number | null; inconsistent: boolean };
export const STATUS: Record<CaseStatus, string> = { pending: "Pendente", analysis: "Em análise", confirmed: "Duplicidade confirmada", resolved: "Resolvido", dismissed: "Alerta descartado" };
export const SEED: Payment[] = [
  { id: "PG-001", bill: "BOL-1001", client: "Ana Prado", cents: 35000, paidAt: "2026-11-05" },
  { id: "PG-002", bill: "BOL-1001", client: "Ana Prado", cents: 35000, paidAt: "2026-11-06" },
  { id: "PG-003", bill: "BOL-1002", client: "Bruno Lima", cents: 28990, paidAt: "2026-11-06" },
  { id: "PG-004", bill: "BOL-1003", client: "Carla Moraes", cents: 120000, paidAt: "2026-11-04" },
  { id: "PG-005", bill: "BOL-1003", client: "Carla Moraes", cents: 120000, paidAt: "2026-11-06" },
  { id: "PG-006", bill: "BOL-1004", client: "Diego Santos", cents: 35000, paidAt: "2026-11-06" },
  { id: "PG-007", bill: "BOL-1005", client: "Elisa Nunes", cents: 48000, paidAt: "2026-11-03" },
  { id: "PG-008", bill: "BOL-1005", client: "Elisa Nunes", cents: 48000, paidAt: "2026-11-06" },
  { id: "PG-009", bill: "BOL-1006", client: "Felipe Alves", cents: 32000, paidAt: "2026-11-06" },
  { id: "PG-010", bill: "BOL-1007", client: "Gabriela Costa", cents: 8990, paidAt: "2026-11-06" },
];
export function identifyDuplicates(payments: Payment[]): DuplicateCase[] {
  const unique = new Map<string, Payment>();
  for (const p of payments) {
    const old = unique.get(p.id);
    if (old && !samePayment(old, p)) throw new Error(`O pagamento ${p.id} possui informações conflitantes.`);
    unique.set(p.id, p);
  }
  const groups = new Map<string, Payment[]>();
  for (const p of unique.values()) groups.set(p.bill, [...(groups.get(p.bill) ?? []), p]);
  return [...groups.entries()].filter(([, ps]) => ps.length > 1).map(([bill, ps]) => {
    const inconsistent = ps.some(p => p.cents !== ps[0].cents || p.client !== ps[0].client);
    return { bill, client: ps[0].client, payments: ps, extra: inconsistent ? null : ps[0].cents * (ps.length - 1), inconsistent };
  }).sort((a, b) => (b.extra ?? 0) - (a.extra ?? 0));
}
function samePayment(a: Payment, b: Payment) { return a.bill === b.bill && a.client === b.client && a.cents === b.cents && a.paidAt === b.paidAt; }
export function mergePayments(current: Payment[], incoming: Payment[]) {
  const map = new Map(current.map(p => [p.id, p])); let added = 0; let ignored = 0;
  for (const p of incoming) {
    const old = map.get(p.id);
    if (old && !samePayment(old, p)) throw new Error(`O ID ${p.id} já existe com dados diferentes. Nenhum registro foi importado.`);
    if (old) { ignored++; continue; }
    map.set(p.id, p); added++;
  }
  if (map.size > 2000) throw new Error("O protótipo aceita até 2.000 pagamentos. Use uma amostra menor.");
  return { payments: [...map.values()], added, ignored };
}
export function csvRows(text: string): string[][] {
  const clean = text.replace(/^\uFEFF/, "").trim();
  if (!clean) throw new Error("Cole ou selecione um arquivo CSV com pagamentos fictícios.");
  const first = clean.split(/\r?\n/)[0]; const sep = first.includes(";") ? ";" : ",";
  const rows: string[][] = []; let row: string[] = []; let cell = ""; let quoted = false;
  for (let i = 0; i < clean.length; i++) {
    const c = clean[i];
    if (c === '"') { if (quoted && clean[i + 1] === '"') { cell += '"'; i++; } else quoted = !quoted; }
    else if (c === sep && !quoted) { row.push(cell.trim()); cell = ""; }
    else if ((c === "\n" || c === "\r") && !quoted) { if (c === "\r" && clean[i + 1] === "\n") i++; row.push(cell.trim()); if (row.some(Boolean)) rows.push(row); row = []; cell = ""; }
    else cell += c;
  }
  if (quoted) throw new Error("O CSV contém aspas sem fechamento.");
  row.push(cell.trim()); if (row.some(Boolean)) rows.push(row);
  return rows;
}
export function parsePayments(text: string): Payment[] {
  const rows = csvRows(text); const headers = rows.shift()!.map(s => s.toLowerCase());
  const required = ["id_pagamento", "id_boleto", "cliente", "valor", "data_pagamento"];
  if (required.some(h => !headers.includes(h))) throw new Error("Cabeçalho esperado: id_pagamento;id_boleto;cliente;valor;data_pagamento");
  if (new Set(headers).size !== headers.length) throw new Error("O cabeçalho possui colunas repetidas.");
  if (!rows.length) throw new Error("O CSV precisa conter ao menos um pagamento.");
  if (rows.length > 2000) throw new Error("Importe até 2.000 linhas por vez.");
  return rows.map((row, n) => {
    const value = (h: string) => row[headers.indexOf(h)] ?? "";
    const id = value("id_pagamento"), bill = value("id_boleto"), client = value("cliente"), paidAt = value("data_pagamento");
    let amount = value("valor");
    if (amount.includes(",")) amount = amount.replace(/\./g, "").replace(",", ".");
    const date = new Date(paidAt + "T12:00:00Z");
    if (row.length !== headers.length || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,59}$/.test(id) || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,59}$/.test(bill) || !client || client.length > 80 || !/^\d+(\.\d{1,2})?$/.test(amount) || !/^\d{4}-\d{2}-\d{2}$/.test(paidAt) || isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== paidAt) throw new Error(`Linha ${n + 2}: confira IDs, nome, valor positivo e data no formato AAAA-MM-DD.`);
    const cents = Math.round(Number(amount) * 100);
    if (!Number.isSafeInteger(cents) || cents <= 0 || cents > 10000000000) throw new Error(`Linha ${n + 2}: valor fora do intervalo permitido.`);
    return { id, bill, client, cents, paidAt };
  });
}
export function toCSV(rows: (string | number)[][]) {
  return "\uFEFF" + rows.map(row => row.map(v => { let s = String(v); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"'; }).join(";")).join("\r\n");
}
export function sampleCSV() { return toCSV([["id_pagamento", "id_boleto", "cliente", "valor", "data_pagamento"], ...SEED.map(p => [p.id, p.bill, p.client, (p.cents / 100).toFixed(2), p.paidAt])]); }
export function validateTransition(current: CaseStatus, next: CaseStatus, note: string) {
  const allowed: Record<CaseStatus, CaseStatus[]> = { pending: ["analysis", "dismissed"], analysis: ["confirmed", "dismissed"], confirmed: ["resolved", "dismissed"], resolved: ["analysis"], dismissed: ["analysis"] };
  if (!allowed[current].includes(next)) throw new Error("Essa mudança de situação não está disponível nesta etapa.");
  if (["confirmed", "resolved", "dismissed"].includes(next) && !note.trim()) throw new Error("Registre uma observação para justificar esta atualização.");
}
