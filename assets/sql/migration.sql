-- Tabela única para armazenar todas as informações
CREATE TABLE formulario_pedido_visto_chines (
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- Informações Pessoais
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    data_nascimento VARCHAR(100) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    estado_civil VARCHAR(50) NOT NULL,
    nacionalidade VARCHAR(100) NOT NULL,

    -- Local de Nascimento
    local_nascimento_pais VARCHAR(100) NOT NULL,
    local_nascimento_estado VARCHAR(100) NOT NULL,
    local_nascimento_cidade VARCHAR(100) NOT NULL,

    -- Identificação
    documento_identidade VARCHAR(50) NOT NULL,
    numero_identificacao VARCHAR(50) NOT NULL,

    -- Passaporte
    tipo_passaporte VARCHAR(50) NOT NULL,
    numero_passaporte VARCHAR(50) NOT NULL,
    pais_emissao_passaporte VARCHAR(100) NOT NULL,
    autoridade_emissao_passaporte VARCHAR(100) NOT NULL,
    data_emissao_passaporte VARCHAR(100) NOT NULL,
    data_expiracao_passaporte VARCHAR(100) NOT NULL,

    -- Visto
    categoria_visto VARCHAR(50) NOT NULL,
    carater_visto VARCHAR(50) NOT NULL,
    tipo_visto VARCHAR(100) NOT NULL,

    -- Informações de Trabalho
    ocupacao_atual VARCHAR(100) NOT NULL,
    nome_empresa VARCHAR(200) NOT NULL,
    local_empresa_pais VARCHAR(100) NOT NULL,
    local_empresa_estado VARCHAR(100) NOT NULL,
    local_empresa_cidade VARCHAR(100) NOT NULL,
    cargo_atual VARCHAR(100),
    renda_mensal DECIMAL(10, 2),
    empresa_contato VARCHAR(20) NOT NULL,
    empresa_data_admissao VARCHAR(100) NOT NULL,

    -- Educação
    tipos_escolaridade VARCHAR(100) NOT NULL,
    nome_instituicao VARCHAR(200) NOT NULL,

    -- Contato Pessoal
    email VARCHAR(100) NOT NULL,
    celular VARCHAR(20) NOT NULL,
    telefone VARCHAR(20) NOT NULL,

    -- Endereço Residencial
    residencia_pais VARCHAR(100) NOT NULL,
    residencia_estado VARCHAR(100) NOT NULL,
    residencia_cidade VARCHAR(100) NOT NULL,
    residencia_logradouro VARCHAR(200) NOT NULL,
    residencia_numero INT NOT NULL,
    residencia_cep VARCHAR(10) NOT NULL,

    -- Informações dos Pais
    nome_pai VARCHAR(100) NOT NULL,
    sobrenome_pai VARCHAR(100) NOT NULL,
    nacionalidade_pai VARCHAR(100) NOT NULL,
    birthDate_pai VARCHAR(100) NOT NULL,
    nome_mae VARCHAR(100) NOT NULL,
    sobrenome_mae VARCHAR(100) NOT NULL,
    nacionalidade_mae VARCHAR(100) NOT NULL,
    birthDate_mae VARCHAR(100) NOT NULL,

    -- Informações do Cônjuge
    nome_conjuge VARCHAR(100),
    sobrenome_conjuge VARCHAR(100),
    nacionalidade_conjuge VARCHAR(100),
    birthDate_conjuge VARCHAR(100),

    -- Chegada e Partida da China
    data_chegada_china VARCHAR(100) NOT NULL,
    chegada_cidade_china VARCHAR(100) NOT NULL,
    chegada_distrito_china VARCHAR(100) NOT NULL,
    data_partida_china VARCHAR(100) NOT NULL,
    partida_cidade_china VARCHAR(100) NOT NULL,
    partida_distrito_china VARCHAR(100) NOT NULL,

    -- Residência Temporária na China
    residencia_temporaria_nome VARCHAR(100) NOT NULL,
    residencia_temporaria_relacionamento VARCHAR(100) NOT NULL,
    residencia_temporaria_contato VARCHAR(20) NOT NULL,
    residencia_temporaria_cidade VARCHAR(100) NOT NULL,
    residencia_temporaria_distrito VARCHAR(100) NOT NULL,

    -- Contato de Emergência
    contato_de_emergencia_nome VARCHAR(100) NOT NULL,
    contato_de_emergencia_sobrenome VARCHAR(100) NOT NULL,
    contato_de_emergencia_relacionamento VARCHAR(100) NOT NULL,
    contato_de_emergencia_contato VARCHAR(20) NOT NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
);
