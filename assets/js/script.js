$(document).ready(() => {
    initDateInput();
    setupPictureInputChange();
    checkLocalStorage();
    handleFormSubmission();
    showOnSelectChange();
    noSpecialCaracters();
});

/**
 * Inicializa os campos de data com máscara e datepicker.
 */
function initDateInput() {
    $('#data_chegada_china').datepicker({
            startDate: new Date(),  // Limita para datas a partir de hoje
            autoclose: true,  // Fecha automaticamente após seleção
            format: 'dd/mm/yyyy',
    });

    $('#data_partida_china').datepicker({
            startDate: new Date(),  // Limita para datas a partir de hoje
            autoclose: true,  // Fecha automaticamente após seleção
            format: 'dd/mm/yyyy',
    });

    $('input[type="date"]').attr('type', 'text').addClass('datepicker').mask('99/99/9999').datepicker({
        format: 'dd/mm/yyyy',
        language: 'pt-BR'
    });
}

/**
 * Configura o evento de alteração de imagem.
 */
function setupPictureInputChange() {
    $('#input-picture').on('change', () => {
        $('#picture-img').attr('src', URL.createObjectURL($('#input-picture').get(0).files[0]));
    });
}

/**
 * Exibe um popup informativo pedindo para anexar a foto.
 */
function popupInformarFoto() {
    Swal.fire({
        title: 'ATENÇÃO',
        text: 'POR GENTILEZA ANEXAR A SUA FOTO ANTES DE INICIAR O PREENCHIMENTO DO FORMULÁRIO. PODE SER UMA FOTO TIRADA DE FRENTE COM O CELULAR, PORÉM SEM SORRIR, FUNDO BRANCO E SEM ÓCULOS OU QUALQUER ADORNO.',
        icon: 'info',
        imageUrl: 'assets/image/modelo_foto.png',  // Caminho da imagem
        imageWidth: 400,   // Largura da imagem
        imageHeight: 200,  // Altura da imagem
        imageAlt: 'Imagem de exemplo',
    });
}

/**
 * Limpa os dados do cache do formulário armazenados no localStorage.
 */
function limparCache() {
    Object.keys(localStorage)
        .filter(item => item.startsWith('form_visto_china.'))
        .forEach(item => localStorage.removeItem(item));
}

/**
 * Carrega os dados salvos do formulário a partir do localStorage e pergunta se o usuário deseja continuar preenchendo.
 */
function checkLocalStorage() {
    if (typeof(Storage) !== 'undefined') {
        if (localStorage.getItem('form_visto_china.nome') !== null) {
            Swal.fire({
                title: 'Deseja continuar preenchendo?',
                text: 'Identificamos que você já havia iniciado o preenchimento.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não'
            }).then((result) => {
                if (result.value) {
                    restoreFormData();
                } else {
                    limparCache();
                }

                popupInformarFoto();
            });
        } else {
            popupInformarFoto();
        }

        $('input').change(salvarInfo);
        $('input[type="text"]').blur(salvarInfo);
    } else {
        console.error('Sorry! No Web Storage support.');
        popupInformarFoto();
    }
}

/**
 * Restaura os dados do formulário salvos no localStorage.
 */
function restoreFormData() {
    $('input[type="text"]').each((idx, element) => {
        $(element).val(localStorage.getItem('form_visto_china.' + $(element).attr('name')));
    });

    $('input[type="radio"]').each((idx, element) => {
        const value = localStorage.getItem('form_visto_china.' + $(element).attr('name'));
        $('input[type="radio"][name="' + $(element).attr('name') + '"][value="' + value + '"]').click();
    });
}

/**
 * Salva as informações do formulário no localStorage quando um campo é alterado.
 * @param {Event} event - O evento disparado no campo de entrada.
 */
function salvarInfo(event) {
    localStorage.setItem('form_visto_china.' + $(event.target).attr('name'), $(event.target).val());
}

/**
 * Configura o envio do formulário, exibindo uma mensagem de espera e validando se a foto foi anexada.
 */
function handleFormSubmission() {
    $('form').submit((event) => {
        event.preventDefault();

        $('[type="submit"]').val('Aguarde...').attr('disabled', 'disabled');
        setTimeout(() => {
            $('[type="submit"]').val('Enviar').removeAttr('disabled');
        }, 1500);

        if ($('#input-picture').val().length === 0) {
            Swal.fire({
                title: 'ATENÇÃO',
                text: 'POR GENTILEZA ANEXAR A SUA FOTO. PODE SER UMA FOTO TIRADA DE FRENTE COM O CELULAR, PORÉM SEM SORRIR, FUNDO BRANCO E SEM ÓCULOS OU QUALQUER ADORNO.',
                icon: 'info',
                imageUrl: 'assets/image/modelo_foto.png',  // Caminho da imagem
                imageWidth: 400,   // Largura da imagem
                imageHeight: 200,  // Altura da imagem
                imageAlt: 'Imagem de exemplo',
            });
        } else {
            $('form').unbind('submit');
            $('form').submit();
        }
        limparCache();
    });
}

function showOnSelectChange() {
    $('#estado_civil').on('change', function () {
        const estadoCivil = $(this).val();
        if (estadoCivil === 'casado') {
            $('#conjuge-info').show(); // Exibe a div
        } else {
            $('#conjuge-info').hide(); // Oculta a div
        }
    });

    $('#categoria_visto').on('change', function () {
        const categoriaVisto = $(this).val();
        const isEmpresaVisible = categoriaVisto === 'M' || categoriaVisto === 'Z' || categoriaVisto === 'F' || categoriaVisto === 'C';

        if (isEmpresaVisible) {
            $('#empresa_convidativa_title').text('Empresa convidativa na China');
        } else {
            $('#empresa_convidativa_title').text('Hospedagem na China');
        }
    });

    $('#ocupacao_atual').on('change', function () {
        const ocupacaoAtual = $(this).val();

        if (ocupacaoAtual === 'Desempregado' || ocupacaoAtual === 'Aposentado') {
            $('#empresa_brasil_title').text('Empresa do responsável por custear a viagem');
        } else {
            $('#empresa_brasil_title').text('Empresa');
        }
    });

    document.getElementById('categoria_visto').addEventListener('change', function() {
        const categoria = this.value;
        const tipoVisto = document.getElementById('tipo_visto');
        tipoVisto.value = '';

        // Capturando as opções apenas uma vez para evitar reconsulta ao DOM
        const opcoes = {
            umaEntrada: tipoVisto.querySelector("option[value='uma entrada']"),
            duasEntradas: tipoVisto.querySelector("option[value='duas entradas']"),
            multiplasEntradas: tipoVisto.querySelector("option[value='multiplas entradas']")
        };

        // Categorias específicas que têm apenas uma opção habilitada
        const categoriasUmaEntrada = ['Q1', 'S1', 'Z', 'X1'];

        // Verificando se a categoria está na lista de categoriasUmaEntrada
        if (categoriasUmaEntrada.includes(categoria)) {
            opcoes.umaEntrada.disabled = false;
            opcoes.duasEntradas.disabled = true;
            opcoes.multiplasEntradas.disabled = true;
        } else {
            opcoes.umaEntrada.disabled = true;
            opcoes.duasEntradas.disabled = false;
            opcoes.multiplasEntradas.disabled = false;
        }
    });
}

function noSpecialCaracters() {
    const inputFields = document.getElementsByClassName('form-control');

    Array.from(inputFields).forEach(inputField => {
        inputField.addEventListener('input', function (event) {
            this.value = this.value.replace(/[^a-zA-Z0-9@., /_-]/g, '');
        });
    });
}

