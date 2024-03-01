import DeleteIcon from '../assets/deleteIcon.svg';

const ConfirmationDelete = ({contrato, confirmDeleteContract, cancelDeleteContract }) => {
    return (
        <div className="confirmation-modal">
            <div className='modal-confimation'>
                <h3>Deletar Contrato</h3>
                <p>Deseja deletar o contrato "<strong>{contrato.clientName}</strong>" ?</p>
                <div className="buttonsModal">
                    <button className='Confirmar-modal' onClick={confirmDeleteContract}>
                        <img src={DeleteIcon} alt="Deletar" />
                        Confirmar
                    </button>
                    <button className='Cancelar-modal' onClick={cancelDeleteContract}>Cancelar</button>
                </div>
                <p>*Caso esteja vencido, desative o contrato e crie um novo.</p>
            </div>
        </div>
    );
};

export default ConfirmationDelete;
