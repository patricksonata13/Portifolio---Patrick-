// app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patrick Sonata</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#sobre" className="hover:text-blue-300">Sobre</a></li>
            <li><a href="#projetos" className="hover:text-blue-300">Projetos</a></li>
            <li><a href="#contato" className="hover:text-blue-300">Contato</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20">
        <h2 className="text-5xl font-bold mb-4">Desenvolvedor & Criador de Conteúdo</h2>
        <p className="text-xl text-blue-200">Transformando ideias em código e humor em arte.</p>
      </section>

      {/* Seção Sobre */}
      <section id="sobre" className="py-16 px-8 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-6">Sobre Mim</h3>
        <p className="text-lg">
          Sou escritor, comediante e desenvolvedor. Trabalhei em programas como <strong>Humor Negro</strong> (Globo) e <strong>Zorra</strong> (Globo), 
          além de criar projetos pessoais que unem tecnologia e criatividade.
        </p>
      </section>

      {/* Seção Projetos */}
      <section id="projetos" className="py-16 px-8 bg-slate-800">
        <h3 className="text-3xl font-bold mb-10 text-center">Projetos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Projeto 1 */}
          <div className="bg-slate-700 p-6 rounded-lg">
            <h4 className="text-xl font-bold mb-2">Humor Negro - Globo</h4>
            <p>Escrevi e participei da equipe de criação da série.</p>
          </div>
          {/* Projeto 2 */}
          <div className="bg-slate-700 p-6 rounded-lg">
            <h4 className="text-xl font-bold mb-2">Portfólio Next.js</h4>
            <p>Este site feito com Next.js, Tailwind e TypeScript.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="py-10 text-center">
        <h3 className="text-2xl font-bold mb-6">Vamos conversar?</h3>
        <p>Email: patrick@exemplo.com</p>
        <div className="mt-6">
          <a href="https://github.com/patricksonata13" className="text-blue-300 hover:text-blue-500">GitHub</a> | 
          <a href="#" className="ml-4 text-blue-300 hover:text-blue-500">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
