# 🚗 SUber - Sistema Inteligente de Recomendação para Aluguel de Veículos

Este projeto utiliza dados reais da SUber para construir um sistema web que recomenda, com base no perfil do motorista, a melhor categoria de veículo para aluguel — utilizando **IA generativa (Gemini)**.

## 🎯 Objetivo

Ajudar motoristas de aplicativo a escolherem o veículo ideal de acordo com suas características, preferências e a realidade operacional da empresa SUber.

## 🧩 Tecnologias Utilizadas

- **Python** – tratamento de dados e geração de contexto (JSON)
- **Pandas** – análise e agregações por categoria
- **JavaScript (Vanilla)** – interface web e integração com API
- **Gemini (Google AI)** – geração de recomendações via modelo LLM
- **HTML/CSS** – estrutura e estilo da aplicação

## 🔍 Como Funciona

1. **Leitura e análise dos dados** (`.csv`)
2. **Geração de um arquivo `contexto_suber.json`** com dados resumidos da SUber
3. **Formulário HTML** coleta dados do motorista (idade, renda, tipo de serviço, etc.)
4. **Prompt personalizado** é gerado e enviado à API do Gemini
5. **Resposta gerada em linguagem natural** é exibida com justificativa da recomendação

## 📁 Estrutura dos Dados

- `suber_motoristas.csv`: perfil e experiência dos motoristas
- `suber_veiculos.csv`: características da frota por categoria
- `suber_alugueis.csv`: dados mensais de contratos e valores
- `suber_performance.csv`: KPIs como satisfação, receita média e taxa de renovação

## 🚀 Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/yanbierhals/IAFINAL
   cd IAFINAL
   ```

2. Instale as dependências (se necessário):
   ```bash
   pip install pandas
   ```

3. Execute o script para gerar o contexto da SUber:
   ```bash
   python gerar_contexto.py
   ```

4. Abra o arquivo `index.html` no seu navegador.

5. Preencha o formulário com os dados do motorista e visualize a recomendação gerada pela IA.

## 💡 Exemplo de Prompt Gerado

```text
Você é um especialista da SUber...
Perfil do Motorista:
- Idade: 30
- Experiência: 3 anos
- Renda mensal: R$ 3500
...
```

## 🔐 Observações

- O projeto utiliza uma **chave de API do Gemini** para fazer requisições. Substitua sua chave na variável `API_KEY` no arquivo JavaScript.
- Os dados foram anonimizados conforme a LGPD e são usados apenas para fins acadêmicos.

## 👤 Autor

Desenvolvido por [Yan Bierhals](https://github.com/yanbierhals) e Gleisson
