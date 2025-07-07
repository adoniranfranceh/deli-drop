import Swal from 'sweetalert2'

export async function confirmClearCart() {
  const result = await Swal.fire({
    title: 'Limpar sacola?',
    text: 'Sua sacola está com itens de outro restaurante. Deseja esvaziá-la para adicionar novos itens?',
    showCancelButton: true,
    confirmButtonText: 'Sim, esvaziar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#E53935',
    cancelButtonColor: '#ccc',
    customClass: {
      popup: 'my-alert',
      confirmButton: 'my-confirm-button',
      cancelButton: 'my-cancel-button'
    }
  })
  return result.isConfirmed
}
