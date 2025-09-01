import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-yellow-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center mb-8">🎭 Portfólio - Patrick Sonata</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trajetória */}
        <div className="bg-white rounded-2xl shadow p-4">
          <Image src="/trajeto1.png" alt="Trajetória Parte 1" width={600} height={800} />
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <Image src="/trajeto2.png" alt="Trajetória Parte 2" width={600} height={800} />
        </div>

        {/* Roteiro TV */}
        <div className="bg-white rounded-2xl shadow p-4">
          <Image src="/pablo_luisao.png" alt="Pablo & Luisão" width={600} height={800} />
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <Image src="/zorra.png" alt="Programa Zorra" width={600} height={800} />
        </div>

        {/* Espetáculos */}
        <div className="bg-white rounded-2xl shadow p-4">
          <Image src="/pelada.png" alt="Pelada - A Hora da Gaymada" width={600} height={800} />
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <Image src="/jamaica.png" alt="Show Jamaica" width={600} height={800} />
        </div>

        {/* Documentário */}
        <div className="bg-white rounded-2xl shadow p-4">
          <Image src="/cidade_correria.png" alt="Cidade Correria" width={600} height={800} />
        </div>

        {/* Séries */}
        <div className="bg-white rounded-2xl shadow p-4">
          <Image src="/humor_negro.png" alt="Humor Negro" width={600} height={800} />
        </div>

        {/* Aulas */}
        <div className="bg-white rounded-2xl shadow p-4">
          <Image src="/estude_funk.png" alt="Estude o Funk" width={600} height={800} />
        </div>

        {/* Stand Up */}
        <div className="bg-white rounded-2xl shadow p-4">
          <Image src="/originais_comedia.png" alt="Originais da Comédia" width={600} height={800} />
        </div>
      </section>
    </main>
  );
}
