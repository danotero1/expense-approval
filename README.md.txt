Aplicación full stack para la gestión de solicitudes de aprobación de gastos.
Se perimte crear,editar,aprobar/rechazar,solicitudes,filtros y métricas.

Tecnologias:

Backend
* .NET 8 web API
* Entity Framework Core
* SQLite

Frontend
* Angular
* Bootstrap
* Reactive Forms


Para Ejecutar:
Backend:
cd backNet/Approval.Api
dotnet restore
dotnet run


Frontend:
cd frontAngular/expense-approval-app
npm install
ng serve


Se supone que es un único tipo de usuario entonces no tiene autenticación
Tiene estados manejados por texto 
Se utiliza SQLite para facilitar ejecución local

Técnicamente:

Arquitectura en capas
Entity framework para persistencia
Validaciones de negocio en backend
Angular con formularios Reactivos
Manejo de errores http
Bootstrap para mejorar estilos de forma rápida 


Base de datos:
Se incluye migraciones de Enity framework

dotnet ef database update


Autor Daniel Otero


