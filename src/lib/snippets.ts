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
    },

    // RUST
    {
        id: 'rust-ownership',
        language: 'rust',
        difficulty: 'Intermediário',
        title: 'Ownership & Borrowing',
        code: 'fn main() {\n    let s1 = String::from("hello");\n    let len = calculate_length(&s1);\n    println!("The length of \'{}\' is {}.", s1, len);\n}',
        description: 'Entenda como o Rust gerencia memória sem garbage collector.',
        category: 'Memória'
    },
    // GO
    {
        id: 'go-goroutine',
        language: 'go',
        difficulty: 'Avançado',
        title: 'Goroutines Básicas',
        code: 'package main\nimport ("fmt"; "time")\n\nfunc say(s string) {\n    for i := 0; i < 5; i++ {\n        time.Sleep(100 * time.Millisecond)\n        fmt.Println(s)\n    }\n}',
        description: 'Concorrência leve e poderosa com Goroutines.',
        category: 'Concorrência'
    },
    // JAVA
    {
        id: 'java-stream',
        language: 'java',
        difficulty: 'Intermediário',
        title: 'Stream API',
        code: 'List<String> names = Arrays.asList("Ana", "Bob", "Charlie");\nnames.stream()\n     .filter(n -> n.startsWith("A"))\n     .map(String::toUpperCase)\n     .forEach(System.out::println);',
        description: 'Manipulação funcional de coleções com Streams.',
        category: 'Collections'
    },
    // CPP
    {
        id: 'cpp-vector',
        language: 'cpp',
        difficulty: 'Iniciante',
        title: 'Vectors e Loops',
        code: '#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {1, 2, 3, 4};\n    for (int i : v) {\n        std::cout << i << " ";\n    }\n    return 0;\n}',
        description: 'Vetores dinâmicos e range-based loops em C++ moderno.',
        category: 'STL'
    }
];
