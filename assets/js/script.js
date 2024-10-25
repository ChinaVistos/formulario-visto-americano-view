$(document).ready(() => {
    initDateInput();
    checkLocalStorage();
    handleFormSubmission();
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
 * Limpa os dados do cache do formulário armazenados no localStorage.
 */
function limparCache() {
    Object.keys(localStorage)
        .filter(item => item.startsWith('form_visto_americano.'))
        .forEach(item => localStorage.removeItem(item));
}

/**
 * Carrega os dados salvos do formulário a partir do localStorage e pergunta se o usuário deseja continuar preenchendo.
 */
function checkLocalStorage() {
    if (typeof(Storage) !== 'undefined') {
        if (localStorage.getItem('form_visto_americano.nome') !== null) {
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
            });
        }

        $('input').change(salvarInfo);
        $('input[type="text"]').blur(salvarInfo);
    } else {
        console.error('Sorry! No Web Storage support.');
    }
}

/**
 * Restaura os dados do formulário salvos no localStorage.
 */
function restoreFormData() {
    $('input[type="text"]').each((idx, element) => {
        $(element).val(localStorage.getItem('form_visto_americano.' + $(element).attr('name')));
    });

    $('input[type="radio"]').each((idx, element) => {
        const value = localStorage.getItem('form_visto_americano.' + $(element).attr('name'));
        $('input[type="radio"][name="' + $(element).attr('name') + '"][value="' + value + '"]').click();
    });
}

/**
 * Salva as informações do formulário no localStorage quando um campo é alterado.
 * @param {Event} event - O evento disparado no campo de entrada.
 */
function salvarInfo(event) {
    localStorage.setItem('form_visto_americano.' + $(event.target).attr('name'), $(event.target).val());
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

        $('form').unbind('submit');
        $('form').submit();
        limparCache();
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

