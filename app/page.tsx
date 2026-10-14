"use client";

import { useMemo, useState } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  city: string;
  state: string;
  mode: "Presencial" | "Híbrido" | "Remoto";
  type: string;
  salary: string;
  area: string;
  featured?: boolean;
};

const sampleJobs: Job[] = [
  { id: 1, title: "Assistente Administrativo", company: "Empresa demonstrativa", city: "Joinville", state: "SC", mode: "Híbrido", type: "CLT", salary: "A combinar", area: "Administrativo", featured: true },
  { id: 2, title: "Analista de Recursos Humanos", company: "Empresa demonstrativa", city: "São Paulo", state: "SP", mode: "Presencial", type: "CLT", salary: "A combinar", area: "Recursos Humanos" },
  { id: 3, title: "Desenvolvedor(a) de Software", company: "Empresa demonstrativa", city: "Brasil", state: "", mode: "Remoto", type: "CLT", salary: "A combinar", area: "Tecnologia", featured: true },
  { id: 4, title: "Assistente de Atendimento", company: "Empresa demonstrativa", city: "Curitiba", state: "PR", mode: "Presencial", type: "CLT", salary: "A combinar", area: "Atendimento" }
];

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("Todos");
  const [showAll, setShowAll] = useState(false);
  const [notice, setNotice] = useState("");

  const jobs = useMemo(() => sampleJobs.filter((job) => {
    const q = keyword.trim().toLocaleLowerCase("pt-BR");
    const l = location.trim().toLocaleLowerCase("pt-BR");
    const text = [job.title, job.company, job.area].join(" ").toLocaleLowerCase("pt-BR");
    const place = [job.city, job.state].join(" ").toLocaleLowerCase("pt-BR");
    return (!q || text.includes(q)) && (!l || place.includes(l)) && (mode === "Todos" || job.mode === mode);
  }), [keyword, location, mode]);

  function startProfile() {
    setNotice("O cadastro de profissionais será habilitado na próxima fase. Nenhum dado foi enviado ou armazenado.");
  }

  function companyAccess() {
    setNotice("A área empresarial e as assinaturas serão habilitadas após a configuração segura de autenticação e banco de dados.");
  }

  return (
    <main>
      <div className="announcement">Uma nova forma de conectar talentos e oportunidades em todo o Brasil</div>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Portal do Emprego - início">
          <span className="brand-mark">PE</span>
          <span>PORTAL <b>DO EMPREGO</b></span>
        </a>
        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#vagas">Buscar vagas</a>
          <a href="#talentos">Para profissionais</a>
          <a href="#empresas">Para empresas</a>
        </nav>
        <div className="header-actions">
          <button className="button button-quiet" onClick={companyAccess}>Acesso empresa</button>
          <button className="button button-primary small" onClick={startProfile}>Criar perfil</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> CARREIRA E OPORTUNIDADES EM UM SÓ LUGAR</span>
          <h1>Seu próximo passo profissional <span>começa aqui.</span></h1>
          <p>Encontre oportunidades, mostre suas competências e permita que empresas descubram seu talento.</p>
          <div className="hero-stats">
            <div><strong>Brasil inteiro</strong><span>Oportunidades em todo o país</span></div>
            <div><strong>Seu perfil, seu controle</strong><span>Privacidade desde o início</span></div>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-icon">↗</div>
          <div className="floating-card card-top"><span className="mini-icon">✦</span><div><b>Novas possibilidades</b><small>Competências que abrem caminhos</small></div></div>
          <div className="floating-card card-bottom"><span className="avatar-placeholder">PE</span><div><b>Talento em destaque</b><small>Seu potencial vai além do currículo</small></div><span className="status-dot" /></div>
        </div>
      </section>

      <section className="search-section" id="vagas">
        <div className="section-heading">
          <div><span className="eyebrow">ENCONTRE SEU CAMINHO</span><h2>Oportunidades para você</h2></div>
          <span className="demo-label">Vagas ilustrativas para demonstração</span>
        </div>
        <div className="search-panel">
          <label className="search-field"><span aria-hidden="true">⌕</span><div><small>Cargo, habilidade ou empresa</small><input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Ex.: assistente, vendas, tecnologia" /></div></label>
          <label className="search-field"><span aria-hidden="true">⌖</span><div><small>Cidade, estado ou remoto</small><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ex.: Joinville, SC" /></div></label>
          <button className="button button-primary search-button" onClick={() => document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth" })}>Buscar vagas <span>→</span></button>
        </div>
        <div className="filter-row"><span>Modalidade:</span>{["Todos", "Presencial", "Híbrido", "Remoto"].map((item) => <button key={item} className={mode === item ? "filter active" : "filter"} onClick={() => setMode(item)}>{item}</button>)}</div>
        <div className="jobs-heading" id="resultados"><h3>{jobs.length} {jobs.length === 1 ? "oportunidade encontrada" : "oportunidades encontradas"}</h3><button className="text-button" onClick={() => { setKeyword(""); setLocation(""); setMode("Todos"); }}>Limpar filtros</button></div>
        <div className="job-grid">
          {(showAll ? jobs : jobs.slice(0, 3)).map((job) => <article className="job-card" key={job.id}>
            <div className="job-card-top"><span className="company-avatar">{job.company.slice(0, 1)}</span>{job.featured && <span className="tag">Destaque demonstrativo</span>}</div>
            <h3>{job.title}</h3><p className="company-name">{job.company}</p>
            <div className="job-meta"><span>⌖ {job.city}{job.state ? ", " + job.state : ""}</span><span>◷ {job.mode}</span><span>▤ {job.type}</span></div>
            <div className="job-card-bottom"><span className="salary">{job.salary}</span><button className="text-button" onClick={() => setNotice("Esta é uma vaga ilustrativa. As candidaturas serão ativadas após a implementação dos cadastros e do banco de dados.")}>Ver oportunidade →</button></div>
          </article>)}
        </div>
        {jobs.length === 0 && <div className="empty-state"><span>⌕</span><h3>Nenhuma oportunidade encontrada</h3><p>Tente alterar as palavras-chave, a localização ou a modalidade.</p></div>}
        {jobs.length > 3 && <button className="button button-outline centered" onClick={() => setShowAll(!showAll)}>{showAll ? "Mostrar menos" : "Ver todas as oportunidades"}</button>}
      </section>

      <section className="talent-section" id="talentos">
        <div className="talent-copy"><span className="eyebrow">PARA PROFISSIONAIS</span><h2>Seu currículo pode abrir portas antes mesmo de você encontrar a vaga.</h2><p>Crie seu perfil gratuitamente, informe seus interesses e escolha como deseja ser encontrado por empresas assinantes.</p><ul><li>✓ Perfil profissional organizado</li><li>✓ Currículo privado por padrão</li><li>✓ Preferências e visibilidade sob seu controle</li></ul><button className="button button-light" onClick={startProfile}>Quero criar meu perfil <span>→</span></button></div>
        <div className="profile-preview"><div className="preview-head"><span className="avatar-large">PE</span><div><b>Seu perfil profissional</b><small>Prévia ilustrativa</small></div><span className="lock-label">⌑ Privado</span></div><div className="preview-line wide" /><div className="preview-line medium" /><div className="preview-chips"><span>Competências</span><span>Experiência</span><span>Interesses</span></div><div className="preview-footer"><span>Visibilidade configurável</span><span>● Protegido</span></div></div>
      </section>

      <section className="company-section" id="empresas">
        <div><span className="eyebrow">PARA EMPRESAS</span><h2>Encontre competências. Construa equipes.</h2><p>Uma experiência integrada para descobrir talentos, organizar candidaturas e conduzir processos seletivos.</p></div>
        <div className="company-features"><div><span>01</span><b>Busca de talentos</b><small>Filtros por competências e interesses.</small></div><div><span>02</span><b>Banco de currículos</b><small>Acesso protegido conforme assinatura.</small></div><div><span>03</span><b>Recrutamento integrado</b><small>Da primeira conversa à contratação.</small></div></div>
        <button className="button button-primary" onClick={companyAccess}>Conhecer a área empresarial <span>→</span></button>
      </section>

      <footer className="site-footer"><a className="brand footer-brand" href="/"><span className="brand-mark">PE</span><span>PORTAL <b>DO EMPREGO</b></span></a><p>Conectando pessoas, competências e oportunidades.</p><div><a href="#vagas">Vagas</a><a href="#talentos">Profissionais</a><a href="#empresas">Empresas</a></div><small>© 2026 PORTAL DO EMPREGO. Projeto em desenvolvimento.</small></footer>
      {notice && <div className="notice" role="status"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Fechar aviso">×</button></div>}
    </main>
  );
}
