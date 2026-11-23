# Matemática Avante

Plataforma educacional para apoiar estudantes do ensino médio no aprendizado de Matemática, com conteúdos teóricos, atividades, acompanhamento de progresso e recursos de interação.

## Tecnologias

- HTML5, CSS3 e JavaScript puro.
- Supabase para autenticação, banco de dados, funções RPC e recursos em tempo real.
- GitHub Pages para hospedagem do front-end.
- Manifest e Service Worker para recursos de instalação e notificações push.

O projeto não utiliza React nem exige etapa de compilação ou gerenciador de pacotes para publicar o front-end.

## Recursos

- **Matérias:** Básico da Matemática, Geometria, Álgebra, Funções, Frações e Decimais, Potenciação e Radiciação, Porcentagem e Matemática Financeira, Estatística, Probabilidade e Trigonometria.
- **Aprendizado e atividades:** páginas de explicação e exercícios por assunto.
- **Níveis:** atividades organizadas em cinco níveis.
- **Progresso:** registro de tentativas, acertos, XP, sequência de estudos e conquistas.
- **Contas e perfis:** autenticação, perfil pessoal e perfil público.
- **Comunicação:** amizades, conversas, mensagens e notificações.
- **Desafios e rankings:** desafios diários, desafios entre amigos e classificações.
- **Professores:** consulta de perfis e solicitação de cadastro como professor.
- **Configurações e alertas:** preferências da conta, tema e notificações.

## Organização dos arquivos

```text
/
├── css/                  # Estilos gerais e estilos específicos das páginas
├── js/                   # Lógica global e scripts específicos
├── index.html            # Entrada/autenticação
├── inicio.html           # Página inicial após entrar
├── materias.html         # Catálogo de matérias
├── aprender-*.html       # Conteúdo teórico das matérias
├── *.html                # Páginas de atividades e demais áreas
├── manifest.webmanifest  # Metadados do aplicativo
├── service-worker.js     # Tratamento de notificações push
└── README.md
```

## Executar localmente

Como o projeto usa autenticação e serviços do Supabase, abra os arquivos por meio de um servidor HTTP local, e não diretamente com o protocolo `file://`.

Use a extensão Live Server do VS Code ou outro servidor estático. Depois, abra o endereço local fornecido pelo servidor.

## Configuração do Supabase

A URL do projeto e a chave pública (publishable key) usada pelo front-end ficam na configuração do cliente Supabase em `js/script.js`.

- A chave pública pode estar no código do navegador e deve ser protegida por políticas RLS e permissões corretas no banco.
- Nunca coloque uma chave `service_role` ou uma chave secreta no HTML, CSS ou JavaScript enviado ao navegador.
- Regras de autorização, como permissões de aluno, professor e DEV, precisam ser validadas no banco ou em funções RPC seguras. Ocultar botões na interface não é uma medida de segurança suficiente.

## Publicação

O front-end é compatível com GitHub Pages. A publicação deve apontar para a branch `main` e para a raiz do repositório, conforme a configuração de Pages do projeto.

Após alterações, confira a página publicada e teste os fluxos afetados, especialmente autenticação, navegação e chamadas ao Supabase.

## Manutenção

- Preserve HTML, CSS e JavaScript puros, salvo decisão explícita de arquitetura.
- Antes de remover arquivos, verifique referências e dependências.
- Não remova políticas RLS, funções RPC ou controles de permissão sem revisar os impactos.
- Faça alterações pequenas e valide o comportamento afetado antes de publicar.
