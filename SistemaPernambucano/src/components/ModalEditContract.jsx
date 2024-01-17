const [formData, setFormData] = useState({
    nomeDoContrato: "",
    loja: "",
    status: "",
    numeroDoContrato: "",
    valorDoContrato: "",
    dataDeInicio: "",
    dataDeVencimento: "",
    descricaoDoContrato: "",
    termosDePagamento: "",
    nomeDaEmpresa: "",
    nomeFantasiaDaEmpresa: "",
    telefoneDaEmpresa: "",
    emailDaEmpresa: "",
    cnpjDaEmpresa: ""
});

useEffect(() => {
    if (showEditModal) {
        setFormData({
            nomeDoContrato: contrato.clientName,
            loja: contrato.store,
            status: contrato.status,
            numeroDoContrato: contrato.contractNumber,
            valorDoContrato: contrato.contractValue,
            dataDeInicio: contrato.startDate,
            dataDeVencimento: contrato.dueDate,
            descricaoDoContrato: contrato.contractDescription,
            termosDePagamento: contrato.paymentTerms,
            nomeDaEmpresa: contrato.companyName,
            nomeFantasiaDaEmpresa: contrato.companyFantasyName,
            telefoneDaEmpresa: contrato.companyPhone,
            emailDaEmpresa: contrato.companyEmail,
            cnpjDaEmpresa: contrato.companyCnpj
        });
    }
}, [showEditModal, contrato]);

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

<Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
    <Modal.Header closeButton>
        <Modal.Title>Editar Contrato</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            {Object.entries(formData).map(([key, value]) => (
                <Form.Group controlId={`formBasic${key}`} key={key}>
                    <Form.Label>{key}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={value}
                        value={value}
                        name={key}
                        onChange={handleChange}
                    />
                </Form.Group>
            ))}
        </Form>
    </Modal.Body>

    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Fechar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
            Salvar Alterações
        </Button>
    </Modal.Footer>
</Modal>