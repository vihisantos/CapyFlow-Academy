export interface Snippet {
    id: string;
    language: string;
    difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
    title: string;
    code: string;
    description: string;
    category: string;
}

export const SNIPPETS: Snippet[] = [
    // JAVASCRIPT
    {
        id: 'js-basic-variable',
        language: 'javascript',
        difficulty: 'Iniciante',
        title: 'Variáveis e Constantes',
        code: 'const name = "Capy";\nlet score = 100;\nconsole.log(name, score);',
        description: 'Aprenda a declarar valores fixos com const e variáveis com let.',
        category: 'Sintaxe Básica'
    },
    {
        id: 'js-basic-arrow',
        language: 'javascript',
        difficulty: 'Iniciante',
        title: 'Arrow Functions',
        code: 'const add = (a, b) => a + b;\nconst result = add(5, 10);',
        description: 'Arrow functions são uma forma concisa de escrever funções em JS.',
        category: 'Funções'
    },
    {
        id: 'js-array-map',
        language: 'javascript',
        difficulty: 'Intermediário',
        title: 'Manipulação de Arrays (Map)',
        code: 'const numbers = [1, 2, 3];\nconst double = numbers.map(n => n * 2);',
        description: 'O método map cria um novo array transformando cada elemento.',
        category: 'Arrays'
    },

    // PYTHON
    {
        id: 'py-basic-print',
        language: 'python',
        difficulty: 'Iniciante',
        title: 'Print e Input',
        code: 'name = input("Qual seu nome? ")\nprint(f"Olá, {name}!")',
        description: 'Interação básica com o usuário em Python.',
        category: 'I/O'
    },
    {
        id: 'py-list-comprehension',
        language: 'python',
        difficulty: 'Intermediário',
        title: 'List Comprehension',
        code: 'squares = [x**2 for x in range(10) if x % 2 == 0]',
        description: 'Uma forma elegante de criar listas baseadas em condições.',
        category: 'Estruturas de Dados'
    },

    // SQL
    {
        id: 'sql-basic-select',
        language: 'sql',
        difficulty: 'Iniciante',
        title: 'Select Simples',
        code: 'SELECT name, email FROM users\nWHERE status = "active"\nORDER BY created_at DESC;',
        description: 'Busca básica de dados em uma tabela SQL.',
        category: 'Queries'
    },
    {
        id: 'sql-join',
        language: 'sql',
        difficulty: 'Intermediário',
        title: 'Inner Join',
        code: 'SELECT u.name, p.title\nFROM users u\nJOIN posts p ON u.id = p.user_id\nWHERE p.published = true;',
        description: 'Combinando dados de duas tabelas diferentes.',
        category: 'Relacionamentos'
    }
];
