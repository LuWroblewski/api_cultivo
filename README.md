# API README

## 📝 Descrição

Esta API permite a criação e gerenciamento de cultivos e eventos de cultivo, como plantios, colheitas, e outros marcos do ciclo de vida das plantas.

⚠️ **Projeto em construção**: novas rotas e funcionalidades podem ser adicionadas a qualquer momento sem aviso!

### 🌱 Rotas

#### Main Routes

`GET /`

Retorna uma mensagem simples informando que a raiz da API foi acessada com sucesso.

Exemplo de resposta:

```
{
	"status": 200,
	"message": "Root route accessed successfully."
}
```

`GET /health`

Verifica se o servidor está funcionando corretamente.

Exemplo de resposta:

```
{
	"status": 200,
	"message": "Server is healthy.",
	"data": {
		"server": "Server is running smoothly."
	}
}
```

`GET /404`

Retorna uma resposta de erro 404.

Exemplo de resposta:

```
{
	"status": 404,
	"message": "Page not found.",
	"data": []
}
```

#### Crop Routes

`GET /crop`

Retorna todos os cultivos cadastrados.

Exemplo de resposta:

```
{
	"status": 200,
	"message": "Cultivations found.",
	"data": [
		{
			"id": "6f760c86-b964-4096-8154-d1a9449f772c",
			"number": 1,
			"bed_column": "bambu1",
			"plant_name": "tomate cereja",
			"origin_id": 1,
			"source_crop_id": null,
			"production_cycle_grams": null,
			"notes": null,
			"created_at": "2025-04-23T00:12:20.945Z",
			"updated_at": "2025-04-23T00:12:20.945Z"
		}
	]
}
```

`POST /crop`

Cria um novo cultivo, as marcadas com `*` são obrigatorias para o schema validar, no caso de `source_crop_id` caso a origem seja estaquia aqui bota o UUID da planta mãe.

Exemplo de corpo de requisição:

```
{
{
  "plant_name": "tomate cereja", *
  "bed_column": "bambu1", *
  "number": 1, *
  "origin_id": 1, *
  "source_crop_id": "",
  "production_cycle_grams": 100,
  "notes": "Primeiro cultivo de tomate."
}

```

Exemplo de resposta:

```
{
	"status": 201,
	"message": "Cultivation created successfully.",
	"data": [
		{
			"id": "6f760c86-b964-4096-8154-d1a9449f772c",
			"number": 1,
			"bed_column": "bambu1",
			"plant_name": "tomate cereja",
			"origin_id": 1,
			"source_crop_id": null,
			"production_cycle_grams": 100,
			"notes": "Primeiro cultivo de tomate.",
			"created_at": "2025-04-23T00:12:20.945Z",
			"updated_at": "2025-04-23T00:12:20.945Z"
		}
	]
}
```

`GET /crop/events`

Retorna todos os eventos de todos os cultivos.

Exemplo de resposta:

```
{
	"status": 200,
	"message": "Crop events found.",
	"data": [
		{
			"id": 2,
			"crop_id": "6f760c86-b964-4096-8154-d1a9449f772c",
			"event_type": "Solo Fixo",
			"event_date": "2025-03-19T00:00:00.000Z"
		},
		{
			"id": 1,
			"crop_id": "6f760c86-b964-4096-8154-d1a9449f772c",
			"event_type": "Plantio",
			"event_date": "2025-01-27T00:00:00.000Z"
		}
	]
}
```

`POST /crop/event`

Cria um evento de cultivo.

Exemplo de corpo de requisição:

```
{
"crop_id": "6f760c86-b964-4096-8154-d1a9449f772c",
"event_type": "Plantio",
"event_date": "2025-04-23"
}
```

Exemplo de resposta:

```
{
	"status": 201,
	"message": "Crop event created successfully.",
	"data": [
		{
			"id": 2,
			"crop_id": "6f760c86-b964-4096-8154-d1a9449f772c",
			"event_type": "Solo Fixo",
			"event_date": "2025-03-19T00:00:00.000Z"
		}
	]
}
```

`GET /crop/cropsAndEvents`

Retorna todos os cultivos com seus respectivos eventos.

Exemplo de resposta:

```
{
	"status": 200,
	"message": "Crops with events found.",
	"data": [
		{
			"id": "6f760c86-b964-4096-8154-d1a9449f772c",
			"number": 1,
			"bed_column": "bambu1",
			"plant_name": "tomate cereja",
			"origin_id": 1,
			"source_crop_id": null,
			"production_cycle_grams": null,
			"notes": null,
			"created_at": "2025-04-23T00:12:20.945Z",
			"updated_at": "2025-04-23T00:12:20.945Z",
			"events": [
				{
					"id": 1,
					"event_type": "Plantio",
					"event_date": "2025-01-27T00:00:00.000Z"
				},
				{
					"id": 2,
					"event_type": "Solo Fixo",
					"event_date": "2025-03-19T00:00:00.000Z"
				}
			]
		}
	]
}
```

### 💡 Exemplos de Como Usar

Para criar um novo cultivo, envie um POST para /crop com o corpo de requisição contendo os dados do cultivo. A `origin_id` pode ser consultada nessa tabela abaixo ou no migrations.

| ID  | Nome     |
| --- | -------- |
| 1   | Semente  |
| 2   | Muda     |
| 3   | Estaquia |

Para criar um evento de cultivo, envie um POST para `/crop/event` com o ID do cultivo e os detalhes do evento.

Para ver todos os cultivos e seus eventos, envie um GET para `/crop/cropsAndEvents`.

🔧 Tecnologias Usadas

- **Node.js** – Ambiente de execução JavaScript.

- **Express.js** – Framework para construção de rotas e middlewares.

- **Knex.js** – ORM para interação com bancos SQL.

- **PostgreSQL** – Banco de dados relacional utilizado no projeto.

- **Yup** – Biblioteca de validação de esquemas para inputs da API.

- **TypeScript** – JavaScript com tipagem.

## Autor

Desenvolvido com 💚 por @LuWroblewski

Se tiver dúvidas, sugestões ou encontrou algum bug, sinta-se à vontade pra abrir uma issue!
