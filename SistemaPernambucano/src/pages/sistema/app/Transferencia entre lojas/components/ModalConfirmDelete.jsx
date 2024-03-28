import React from 'react';
import axios from 'axios';

const ModalConfirmDelete = ({ show, onHide, id, toggleDropdown, fetchData }) => {

    const confirmDeleteProduct = async (id) => {
        await axios.delete(`http://192.168.1.70:3000/estoqueDeProdutosParaTransferencia/${id}`);
        toggleDropdown();
        fetchData();
        onHide();
    }

    return (
        <div className={`modal ConfirmDeleteModal ${show ? 'is-active' : ''}`}>
            <div className="modal-ConfirmDelete" onClick={onHide}></div>
            <div className="modal-card-ConfirmDelete">
                <p>Você tem certeza que deseja deletar este produto?</p>
                <footer className="modal-card-foot-ConfirmDelete">
                    <button className="button is-danger-ConfirmDelete" onClick={() => confirmDeleteProduct(id)}>Deletar</button>
                    <button className="buttonConfirmDeleteCancell" onClick={onHide}>Cancelar</button>
                </footer>
            </div>
        </div>
    );
};

export default ModalConfirmDelete;