import { PrismaClient } from "@prisma/client";
// Get route that uses pid to return Pokemon data
const prisma = new PrismaClient();

export async function GET(req: any, res: any) {
  const searchParams = req.nextUrl.searchParams;
  const pid = searchParams.get("pid");
  const pokemon = await prisma.pokemon.findUnique({
    where: {
      id: parseInt(pid),
    },
  });
  return new Response(
    JSON.stringify({
      pokemon,
    }),
  );
}

export async function PUT(req: any, res: any) {
  const searchParams = req.nextUrl.searchParams;
  const pid = searchParams.get("pid");
  const body = await req.json();
  const pokemon = await prisma.pokemon.update({
    where: {
      id: parseInt(pid),
    },
    data: {
      ...body,
    },
  });
  return new Response(
    JSON.stringify({
      pokemon,
    }),
  );
}

export async function DELETE(req: any, res: any) {
  const searchParams = req.nextUrl.searchParams;
  const pid = searchParams.get("pid");
  const pokemon = await prisma.pokemon.delete({
    where: {
      id: parseInt(pid),
    },
  });
  return new Response(
    JSON.stringify({
      pokemon,
    }),
  );
}

export async function POST(req: any, res: any) {
  const body = await req.json();
  // Calculate total
  const total =
    parseInt(body.HP) +
    parseInt(body.Attack) +
    parseInt(body.Defense) +
    parseInt(body.Sp_Atk) +
    parseInt(body.Sp_Def) +
    parseInt(body.Speed);
  const pokemon = await prisma.pokemon.create({
    data: {
      HP: parseInt(body.HP),
      Attack: parseInt(body.Attack),
      Defense: parseInt(body.Defense),
      Sp_Atk: parseInt(body.Sp_Atk),
      Sp_Def: parseInt(body.Sp_Def),
      Speed: parseInt(body.Speed),
      Total: total,
      MainColor: body.MainColor,
      name: body.name,
      URL: body.URL,
      type: body.type,
    },
  });
  return new Response(
    JSON.stringify({
      pokemon,
    }),
  );
}
