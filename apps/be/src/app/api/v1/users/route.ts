import { jsonOk } from "@/lib/api";

type User = { id: string; name: string };

const USERS: User[] = [
  { id: "u_1", name: "Ayu" },
  { id: "u_2", name: "Bima" }
];

export async function GET() {
  return jsonOk({ users: USERS });
}
