# API y Worker para descarga de manga

API y sistema para la descarga de mangas dentro de servidor local.

## Configuracion.
Variables de entorno necesaria para la ejecucion del sistema (se muestran ejemplos):

- PORT=8001
- RABBITMQ_URL=amqp://guest:guest@localhost:5672/
- SERIES_QUEUE=series.discovered.queue
- CHAPTER_QUEUE=chapter.download.queue
- DATABASE_URL=postgresql://postgre:123456@localhost:32771/manga
- POSTGRES_USER=postgre
- POSTGRES_PASSWORD=123456 
- POSTGRES_DB=manga
- SERIES_PATH=/home/brau25/Documents/rabbitMQ/manga/

## Instalacion.
Asegurate de clonar el repositorio. Colocate dentro del directorio donde clonaste la carpeta y ejecuta el script para la instalacion de los paquetes (El administrador de paquetes usado es PNPM).

```bash
pnpm install
```

En este punto tendras la base de datos ejecutandose en un contenedor o localmente, por lo tanto, el siguiente paso sera crear las migraciones.

```bash
pnpm run migration:up
```

Siguiente paso crear los ejecutables de TS, para eso ejecuta el script ya creado.

```bash
pnpm run build
```

Una vez realizado esto podras ejecutar la API y el Worker respectivamente.
```bash
pnpm run api

pnpm run worker
```
## API.

API construida en TypeScript con Express para la creacion del servidor.

## Caracteristicas

- API REST
- Exposicion de recursos.
- Parseo de contenido.

### Tecnologias.

- TypeScript
- Express
- node-pg-migrate
- pg

## Endpoints

### Manga
GET /manga/<br>
Obtiene todas las series almacenadas.
Respuesta esperada:
```json
[

    {

        "id": "c4ea194b-ac0a-4dd3-9096-1173e1fd3257",

        "source": "manhwa18",

        "title": "Title",

        "cover": "https://manhwa18.cc/manga/example-title",

        "serie_url": "https://manhwa18.cc/webtoon/example-title",

        "system_path": "system_path",

        "created": "2026-08-10T00:35:22.901Z",

        "update_at": "2026-08-10T00:35:22.901Z",

        "status": null

    }

]
```

### Manga/:id
GET /manga/:id <br>
Obtiene una serie en especifico.
Respuesta esperada:
```json
{

    "id": "c4ea194b-ac0a-4dd3-9096-1173e1fd3257",

    "source": "manhwa18",

    "title": "Title",

    "cover": "https://manhwa18.cc/manga/example-title.jpg",

    "serie_url": "https://manhwa18.cc/webtoon/example-title",

    "system_path": "Title",

    "created": "2026-08-10T00:35:22.901Z",

    "update_at": "2026-08-10T00:35:22.901Z",

    "status": null

}
```

### Chapter/:id
GET /chapter/:id <br>
Obtiene todos los capitulos relacionados al id.
Respuesta esperada:
```json
[

    {

        "id": "e5e45259-d256-4484-b98b-eecf682eefef",

        "serie_id": "c4ea194b-ac0a-4dd3-9096-1173e1fd3257",

        "chapter_url": "https://manhwa18.cc/webtoon/example-title",

        "chapter_number": 1,

        "system_path": "example-title/chapter-1",

        "created": "2026-08-10T00:35:23.406Z",

        "updated_at": "2026-08-10T00:35:23.406Z"

    }

]
``` 

### Chapter
GET /chapter/:id/images <br>
Obtiene todas las imagenes relacionadas al id.
```json
[

    {

        "id": "5f53e4c0-15d5-4aa3-ad7f-e3c17ec880db",

        "chapter_id": "e5e45259-d256-4484-b98b-eecf682eefef",

        "img_url": "https://manhwa18.cc/webtoon/example-title",

        "img_number": 1,

        "system_path": "/example-title/chapter-1",

        "created": "2026-08-10T00:35:23.958Z",

        "updated_at": "2026-08-10T00:35:23.958Z"

    },

    {

        "id": "a312427c-fc84-456b-85ba-8dcc10ed1d75",

        "chapter_id": "e5e45259-d256-4484-b98b-eecf682eefef",

        "img_url": "https://manhwa18.cc/webtoon/example-title",

        "img_number": 2,

        "system_path": "/example-title/chapter-1",

        "created": "2026-08-10T00:35:24.213Z",

        "updated_at": "2026-08-10T00:35:24.213Z"

    },
...
]
```

## Worker

Worker para la el consumo de mensajes, y procesamiento de descargas en segundo plano.

### Tecnologias

- TypeScript
- amqplib
- pg

### Flujo de trabajo

1. Se detecta/solicita un manga
2. Se genera un mensaje
3. RabbitMQ almacena el mensaje
4. Worker consume el mensaje
5. Worker procesa el capítulo
6. Se descargan las imágenes
7. Se almacenan en el sistema de archivos
8. Se registra la información en PostgreSQL
9. API expone los recursos almacenados

### Queue series.discovered.queue
Mensaje esperado:
```json
{
    "event": "series.discovered.queue",
    "id": "series_uuid",
    "source": "manhwa18",
    "title": "series_title",
    "cover": "series_cover",
    "serie_url": "series_url",
    "status": "series_status",
}
```
Este worker para el consumo de mensajes, se encarga de la creacion de directorios para las series, ademas, almacena los datos en la base de datos, lo cual permite verificar la creacion correcta de los directorios.
<br>

El mensaje se considera ACK cuando los directorios son creados correctamente, y los datos son almacenados. En cualquier otro caso se considera NACK y es enviado a la DLQ.

### Queue chapter.download.queue
Mensaje esperado:
```json
{
    "event": "series.discovered.queue",
    "series_id": "series_uuid",
    "chapter_number": 0,
    "chapter_url": "chapter url",
    "chapter_images": [
        {
            "image":"url image",
            "page_number": 1
        },
        ...
    ],
}
```
Este worker para el consumo de mensajes, se encarga de la creacion de directorios para los capitulos, ademas, procesa la descarga de imagenes por medio de streams de node y almacena los datos en la base de datos.
<br>

El mensaje se considera ACK cuando los directorios son creados correctamente, las imagenes descargadas y los datos son almacenados. En cualquier otro caso se considera NACK y es enviado a la DLQ respectiva.