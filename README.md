# CrediárioSaaS

> **Sistema de Gestão para Representantes Comerciais**

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/Jeffersonjcl/geraqrcodecoracao)
[![Licença](https://img.shields.io/badge/licença-MIT-blue)](LICENSE)

---

## 📋 Sobre o Projeto

O **CrediárioSaaS** é uma plataforma SaaS (Software as a Service) desenvolvida para facilitar a gestão completa de representantes comerciais. O sistema centraliza o controle de clientes, pedidos, crediário, comissões e relatórios em um único lugar, permitindo que representantes e empresas acompanhem suas operações de forma simples e eficiente.

---

## ✨ Funcionalidades

- 👤 **Gestão de Representantes** — Cadastro e controle de representantes comerciais
- 🏢 **Gestão de Clientes** — Carteira de clientes completa com histórico
- 📦 **Pedidos** — Registro e acompanhamento de pedidos
- 💳 **Crediário** — Controle de vendas a prazo, parcelas e inadimplência
- 💰 **Comissões** — Cálculo automático e relatório de comissões por representante
- 📊 **Dashboard** — Visão geral com métricas e indicadores de desempenho
- 📄 **Relatórios** — Relatórios detalhados de vendas, recebimentos e comissões
- 🔒 **Multi-tenant** — Cada empresa possui seu ambiente isolado
- 📱 **Responsivo** — Acesso pelo computador, tablet ou celular

---

## 🚀 Tecnologias

- **Frontend:** React / Next.js
- **Backend:** Node.js / NestJS
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT
- **Estilização:** Tailwind CSS
- **Infraestrutura:** Docker

---

## 🛠️ Instalação e Configuração

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

### Passos

1. **Clone o repositório:**

```bash
git clone https://github.com/Jeffersonjcl/crediariosaas.git
cd crediariosaas
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure as variáveis de ambiente:**

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/crediariosaas
JWT_SECRET=sua_chave_secreta
PORT=3000
```

4. **Suba o banco de dados com Docker:**

```bash
docker-compose up -d
```

5. **Execute as migrações:**

```bash
npm run migrate
```

6. **Inicie o servidor:**

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do Projeto

```
crediariosaas/
├── src/
│   ├── modules/
│   │   ├── auth/           # Autenticação e autorização
│   │   ├── representantes/ # Gestão de representantes
│   │   ├── clientes/       # Gestão de clientes
│   │   ├── pedidos/        # Pedidos
│   │   ├── crediario/      # Crediário e parcelas
│   │   └── comissoes/      # Comissões
│   ├── shared/             # Utilitários e componentes compartilhados
│   └── main.ts
├── prisma/                 # Schema e migrações do banco de dados
├── public/                 # Arquivos estáticos
├── tests/                  # Testes automatizados
├── docker-compose.yml
├── .env.example
└── package.json
```

---

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Testes com cobertura
npm run test:coverage

# Testes end-to-end
npm run test:e2e
```

---

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido por **Jefferson** — [GitHub](https://github.com/Jeffersonjcl)

---

*CrediárioSaaS — Simplificando a gestão de representantes comerciais.*
