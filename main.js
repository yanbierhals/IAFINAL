document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('formSection').classList.remove('hidden');
});

const API_KEY = "AIzaSyD-ypItmFz7E9uVWE7p65cWGYs7UTKyR-Y";
const form = document.getElementById('quizForm');
const output = document.getElementById('recomendacao');

let contextoSuber = null;

// Carregar contexto JSON ao iniciar
fetch("contexto_suber.json")
  .then(res => res.json())
  .then(json => contextoSuber = json)
  .catch(err => console.error("Erro ao carregar contexto:", err));

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  output.textContent = 'Analisando...';
  output.style.display = 'block'; // Mostra durante o carregamento

  if (!contextoSuber) {
    output.textContent = 'Erro: dados de contexto não carregados.';
    return;
  }

  const dadosUsuario = Object.fromEntries(new FormData(form));

    const idade = parseInt(dadosUsuario.idade);
  if (isNaN(idade) || idade < 18) {
    output.textContent = 'Desculpe, apenas maiores de 18 anos podem alugar um carro.';
    return;
  }
  
  const prompt = gerarPrompt(dadosUsuario, contextoSuber);

const resposta = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': API_KEY
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    })
  }
);


  const json = await resposta.json();
  const recomendacao = json.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (recomendacao) {
    output.innerHTML = marked.parse(recomendacao);
    output.style.display = 'block'; // Mostra quando há conteúdo
  } else {
    output.innerHTML = 'Erro na recomendação.';
    output.style.display = 'block'; // Mostra mensagem de erro
  }
});

function gerarPrompt(d, contexto) {
  return `
Você é um especialista da SUber. Com base no contexto real da empresa e no perfil abaixo, recomende a melhor categoria de carro (Popular, Intermediário, Luxo, Van) para esse motorista alugar.

Perfil do Motorista:
- Idade: ${d.idade}
- Experiência: ${d.experiencia} anos
- Renda mensal: R$ ${d.renda}
- Região: ${d.regiao}
- Tipo de serviço: ${d.servico}

Dados da SUber:
Categorias:
${contexto.categorias_veiculos.map(c => 
  `- ${c.categoria}: R$ ${c.valor_diario}/dia, capacidade: ${c.capacidade_passageiros} pessoas, conservação: ${c.nota_conservacao}/5`
).join('\n')}

Performance:
- Satisfação média: ${contexto.performance_geral.satisfacao_media_motoristas}/5
- Receita média por motorista: R$ ${contexto.performance_geral.receita_media_por_motorista}
- Taxa de renovação de contratos: ${contexto.performance_geral.taxa_renovacao_contratos}%
- Preços médios por categoria: Popular (R$${contexto.precos_medios.popular}), Intermediário (R$${contexto.precos_medios.intermediario}), Luxo (R$${contexto.precos_medios.luxo}), Van (R$${contexto.precos_medios.van})

Instruções:
- Seja direto, objetivo e amigável.
- Justifique sua escolha com base no perfil e nos dados da SUber.
`;
}
