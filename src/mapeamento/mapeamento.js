const fieldsMap = {
  obra: {
    title: ['title', 'titulo', 'titulo_en', 'tituloEn', 'title_en', 'titleEn'],
    subtitle1: ['subtitle1', 'subtitulo1', 'subtitulo', 'subtitle', 'subtitle_en', 'subtitulo_en'],
    subtitle2: ['subtitle2', 'subtitulo2', 'subtitle_en_2', 'subtitleEn2'],
    sectionName: ['sectionName', 'secao', 'section', 'section_name'],
    description: ['description', 'descricao', 'resumo', 'texto', 'textoPrincipal', 'texto_principal'],
    publication: ['publication', 'publicacao', 'ano', 'ano_publicacao'],
    languages: ['languages', 'idiomas'],
    sales: ['sales', 'vendas'],
    genre: ['genre', 'genero'],
    titleAnalysis: ['titleAnalysis', 'tituloAnalise', 'analiseTitulo'],
    analysis: ['analysis', 'analise', 'analiseCritica', 'analise_critica', 'textoAnalise'],
  },
  vestibular: {
    analiseCritica: ['analiseCritica', 'analise_critica', 'criticalAnalysis', 'analise'],
    interpretacoes: ['interpretacoes', 'interpretations', 'interpretacoes_en'],
    tituloPrincipal: ['tituloPrincipal', 'titulo_principal', 'titulo', 'tituloPt', 'tituloEn', 'titulo_pt', 'titulo_en', 'title'],
    textoPrincipal: ['textoPrincipal', 'texto_principal', 'texto', 'resumo', 'summary', 'summary_en', 'conteudoPt', 'conteudoEn', 'conteudo_pt', 'conteudo_en'],
  },
  biblioteca: {
    title: ['title', 'titulo', 'livro', 'name'],
    author: ['author', 'autor', 'autor_nome', 'nome'],
    year: ['year', 'ano', 'publicationYear'],
    description: ['description', 'resumo', 'sinopse'],
  },
  sobreMember: {
    nome: ['nome', 'name', 'fullName', 'nome_completo'],
    curso: ['curso', 'course', 'study', 'major'],
    bio: ['bio', 'biografia', 'descricao'],
  },
};

export default fieldsMap;
