class CrudAPI {
  constructor() {
    // Array para armazenar os registros
    this.dados = [];
    // Variável para registrar o ID, iniciando em 1
    this.id = 1;

    // Pré-cadastrar cinco pessoas
    const pessoas = [
      { nome: 'João Silva', email: 'joao@example.com' },
      { nome: 'Maria Souza', email: 'maria@example.com' },
      { nome: 'Carlos Pereira', email: 'carlos@example.com' },
      { nome: 'Ana Costa', email: 'ana@example.com' },
      { nome: 'Beatriz Lima', email: 'beatriz@example.com' }
    ];

    pessoas.forEach(pessoa => {
      this.dados.push({ id: this.id++, ...pessoa });
    });
  }

  // Método para criar um novo registro
  async criar(registro) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const novoRegistro = { id: this.id++, ...registro };
        this.dados.push(novoRegistro);
        resolve(novoRegistro);
      }, 100);
    });
  }

  // Método para ler todos os registros
  async lerTodos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.dados);
      }, 100);
    });
  }

  // Método para ler um registro específico pelo ID
  async lerPorId(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const registro = this.dados.find(item => item.id === id);
        resolve(registro);
      }, 100);
    });
  }

  // Método para atualizar um registro pelo ID
  async atualizar(id, dadosAtualizados) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.dados.findIndex(item => item.id === id);
        if (index === -1) {
          return reject(new Error('Registro não encontrado'));
        }
        if (dadosAtualizados.nome !== undefined) {
          this.dados[index].nome = dadosAtualizados.nome;
        }
        if (dadosAtualizados.email !== undefined) {
          this.dados[index].email = dadosAtualizados.email;
        }
        resolve(this.dados[index]);
      }, 100);
    });
  }

  // Método para excluir um registro pelo ID
  async excluir(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.dados.findIndex(item => item.id === id);
        if (index === -1) {
          return reject(new Error('Registro não encontrado'));
        }
        const registroRemovido = this.dados.splice(index, 1)[0];
        resolve(registroRemovido);
      }, 100);
    });
  }
}

export default new CrudAPI();
