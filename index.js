import express from "express";
const host = "0.0.0.0";
const port = 3078;
var listaAtividades = [];
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (requisicao, resposta) => {
    resposta.send(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Início</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
                <style>
                body {
                        background-image: url('https://img.freepik.com/premium-photo/spring-floral-background-created-with-generative-ai_115122-47896.jpg');
                        background-size: cover;
                        background-position: center;
                        font-family: 'Montserrat', sans-serif;
                    }

                    .overlay {
                        backdrop-filter: blur(5px);
                        background-color: rgba(255, 255, 255, 0.7);
                        padding: 40px;
                        border-radius: 10px;
                    }

                    .btn-purple {
                        background-color: #5c3c92;
                        color: white;
                    }

                    .btn-purple:hover {
                        background-color: #4b3179;
                    }
                </style>
            </head>
            <body class="d-flex justify-content-center align-items-center vh-100">
                <div class="text-center overlay">
                    <h1 class="mb-3 fw-bold">DIA DAS MÃES</h1>
                    <p class="mb-4">Confira e cadastre as atividades para o mês das mães de 2025 em Presidente Prudente</p>
                    <a href="/formulario" class="btn btn-purple btn-lg fw-bold">Cadastrar Atividade</a>
                </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </body>
        </html>
    `);
    resposta.end();
});

app.get("/formulario", (requisicao, resposta) => {
    resposta.send(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
                <title>Cadastrar Atividades</title>
                <style>
                body {
                background-image: url('https://img.freepik.com/premium-photo/spring-floral-background-created-with-generative-ai_115122-47896.jpg');
                background-size: cover;
                background-position: center;
                height: 100vh;
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Montserrat', sans-serif;
                }

                .form-box {
                background-color: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(10px);
                padding: 2rem;
                border-radius: 1rem;
                width: 100%;
                max-width: 500px;
                }

                .form-label {
                font-weight: 700;
                }

                .btn-custom {
                background-color: #5e3c85;
                color: white;
                }

                .btn-custom:hover {
                background-color: #4a2e6a;
                }
            </style>
            </head>
            <body>
                    <div class="form-box">
                        <h2 class="mb-4 text-center fw-bold">Cadastro de Atividade</h2>
                        <form method="POST" action="/formulario">
                        <div class="mb-3">
                            <label class="form-label">Nome da atividade</label>
                            <input type="text" class="form-control" id="atividade" name="atividade" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Local</label>
                            <input type="text" class="form-control" id="local" name="local" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Responsável</label>
                            <input type="text" class="form-control" id="responsavel" name="responsavel" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Data</label>
                            <input type="date" class="form-control" id="data" name="data" required>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-custom">Cadastrar</button>
                        </div>
                        </form>
                    </div>
                <script>
                const hoje = new Date().toISOString().split('T')[0];
                document.getElementById('data').setAttribute('min', hoje);
                </script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </body>
        </html>
    `);
    resposta.end();
});

app.post("/formulario", (requisicao, resposta) => {
    const atividade = requisicao.body.atividade;
    const local = requisicao.body.local;
    const responsavel = requisicao.body.responsavel;
    const data = requisicao.body.data;
    
    if (atividade && local && responsavel && data)
    {
        listaAtividades.push({
            atividade: atividade,
            local: local,
            responsavel: responsavel,
            data: data
        });
        resposta.redirect("/listaAtividades");
    }

    else
    {

        let conteudo = `
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
                <title>Cadastrar Atividades</title>
                <style>
                body {
                background-image: url('https://img.freepik.com/premium-photo/spring-floral-background-created-with-generative-ai_115122-47896.jpg');
                background-size: cover;
                background-position: center;
                height: 100vh;
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Montserrat', sans-serif;
                }

                .form-box {
                background-color: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(10px);
                padding: 2rem;
                border-radius: 1rem;
                width: 100%;
                max-width: 500px;
                }

                .form-label {
                font-weight: 700;
                }

                .btn-custom {
                background-color: #5e3c85;
                color: white;
                }

                .btn-custom:hover {
                background-color: #4a2e6a;
                }
            </style>
            </head>

            <body>
                <div class="form-box">
                    <h2 class="mb-4 text-center fw-bold">Cadastro de Atividade</h2>
                    <form method="POST" action="/formulario">
                    <div class="mb-3"> `;

                            if(!atividade)
                            {
                                conteudo = conteudo + `
                                <label class="form-label">Nome da atividade</label>
                                <input type="text" class="form-control" id="atividade" name="atividade" value="${atividade}" required>
                                <span class="text-danger">Campo obrigatório</span>
                                `;
                            }
                            else
                            {
                                conteudo = conteudo + `
                                <label class="form-label">Nome da atividade</label>
                                <input type="text" class="form-control" id="atividade" name="atividade" value="${atividade}" required>
                                `;
                            }
                                
                            conteudo = conteudo + `
                            </div>
                            <div class="mb-3"> `;

                            if(!local)
                            {
                                conteudo = conteudo + `
                                <label class="form-label">Local</label>
                                <input type="text" class="form-control" id="local" name="local" value="${local}" required>
                                <span class="text-danger">Campo obrigatório</span>
                                `;
                            }
                            else
                            {
                                conteudo = conteudo + `
                                <label class="form-label">Local</label>
                                <input type="text" class="form-control" id="local" name="local" value="${local}" required>
                                `;
                            }
                                
                            conteudo = conteudo + `
                            </div>
                            <div class="mb-3"> `;

                            if(!responsavel)
                            {
                                conteudo = conteudo + `
                                <label class="form-label">Responsável</label>
                                <input type="text" class="form-control" id="responsavel" name="responsavel" value="${responsavel}" required>
                                <span class="text-danger">Campo obrigatório</span>
                                `;
                            }
                            else
                            {
                                conteudo = conteudo + `
                                <label class="form-label">Responsável</label>
                                <input type="text" class="form-control" id="responsavel" name="responsavel" value="${responsavel}" required>
                                `;
                            }    

                            conteudo = conteudo + `
                            </div>
                            <div class="mb-3"> `;
                            
                            if(!data)
                            {
                                conteudo = conteudo + `
                                <label class="form-label">Data</label>
                                <input type="date" class="form-control" id="data" name="data" value="${data}" required>
                                <span class="text-danger">Campo obrigatório</span>
                                `;
                            }
                            else
                            {
                                conteudo = conteudo + `
                                <label class="form-label">Data</label>
                                <input type="date" class="form-control" id="data" name="data" value="${data}" required>
                                `;
                            }
                                
                            conteudo = conteudo + `
                            </div>
                                <div class="text-center">
                                    <button type="submit" class="btn btn-custom">Cadastrar</button>
                                </div>
                                </form>
                            </div>
                    <script>
                    const hoje = new Date().toISOString().split('T')[0];
                    document.getElementById('data').setAttribute('min', hoje);
                    </script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
                </body>
            </html>
        `;

        resposta.send(conteudo);
        resposta.end();

    }
});

app.get("/listaAtividades", (requisicao, resposta) => {
    let conteudo = `
        <html lang="pt-br">
            <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
            <title>Atividades Dias das Mães 2025</title>
            <style>
                body {
                background-image: url('https://img.freepik.com/premium-photo/spring-floral-background-created-with-generative-ai_115122-47896.jpg');
                background-position: center;
                background-size: 100% 100%;
                height: 100vh;
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Montserrat', sans-serif;
                }

                .table-box {
                background-color: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(10px);
                padding: 2rem;
                border-radius: 1rem;
                width: 100%;
                max-width: 900px;
                }

                th {
                font-weight: 700;
                }

                .btn-custom {
                background-color: #5e3c85;
                color: white;
                }

                .btn-custom:hover {
                background-color: #4a2e6a;
                }

                .btn-container {
                margin-top: 1.5rem;
                text-align: center;
                }
            </style>
            </head>
            <body>
            <div class="table-box">
                <table class="table table-striped mb-0">
                <thead>
                    <tr>
                    <th>Atividade</th>
                    <th>Data</th>
                    <th>Local</th>
                    <th>Responsável</th>
                    </tr>
                </thead>
                <tbody>`;
                    for(let i = 0; i< listaAtividades.length; i++)
                    {
                        conteudo = conteudo + `
                            <tr>
                                <td>${listaAtividades[i].atividade}</td>
                                <td>${listaAtividades[i].data}</td>
                                <td>${listaAtividades[i].local}</td>
                                <td>${listaAtividades[i].responsavel}</td>
                            </tr>
                        `;
                    }
    conteudo = conteudo + ` </tbody>
                </table>
                <div class="btn-container">
                <a href="/formulario" class="btn btn-custom">Cadastrar nova atividade</a>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
            </body>
        </html>`;
        resposta.send(conteudo);
    resposta.end();
});

app.listen(port, host, () => {
    console.log(`Servidor em execução em http://${host}:${port}/`);
});