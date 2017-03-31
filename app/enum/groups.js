var UserGroup = {
    CONDOMINO: 1,
    SINDICO: 2,
    CONSELHEIRO: 3,
    PORTEIRO: 4,
    FUNCIONARIO: 5,
    PARCEIRO: 6,
    properties: {
        1: {name: "condomino", value: 1, code: "C"},
        2: {name: "sindico", value: 2, code: "S"},
        3: {name: "conselheiro", value: 3, code: "CS"},
        4: {name: "porteiro", value: 4, code: "P"},
        5: {name: "funcionario", value: 5, code: "F"},
        6: {name: "parceiro", value: 5, code: "PR"}
    }
}

module.exports = UserGroup;