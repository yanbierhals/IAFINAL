import pandas as pd
import json

# Carregar os CSVs
df_veiculos = pd.read_csv('suber_veiculos.csv')
df_motoristas = pd.read_csv('suber_motoristas.csv')
df_alugueis = pd.read_csv('suber_alugueis.csv')
df_performance = pd.read_csv('suber_performance.csv')

# Resumir veículos por categoria
resumo_veiculos = df_veiculos.groupby('categoria').agg({
    'valor_diario': 'mean',
    'capacidade_passageiros': 'mean',
    'nota_conservacao': 'mean'
}).reset_index()

# Arredondar valores
resumo_veiculos = resumo_veiculos.round(2)

# Resumo performance (média dos últimos dados)
resumo_performance = df_performance.mean(numeric_only=True).round(2)

# Resumo aluguel (último mês)
ultimo_aluguel = df_alugueis.sort_values('data').iloc[-1]

# Compactar os dados para uso no prompt
contexto = {
    "categorias_veiculos": resumo_veiculos.to_dict(orient="records"),
    "performance_geral": resumo_performance.to_dict(),
    "precos_medios": {
        "popular": ultimo_aluguel['valor_medio_popular'],
        "intermediario": ultimo_aluguel['valor_medio_intermediario'],
        "luxo": ultimo_aluguel['valor_medio_luxo'],
        "van": ultimo_aluguel['valor_medio_van'],
    }
}

# Salvar o JSON para incluir no projeto web
json_path = "contexto_suber.json"
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(contexto, f, ensure_ascii=False, indent=2)

contexto, json_path
