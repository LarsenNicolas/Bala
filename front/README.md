# Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


### PEGADA A BACKEND 

localhost:3000/api/signUp

{
  "email": "nicolas.larsen96@gmail.com",
  "username": "NicolasL",
  "password": "Contra123."
}

localhost:3000/api/confirmRegistration

{
  "username": "NicolasL",
  "confirmationCode": "992158"
}

localhost:3000/api/login

{
  "username": "NicolasL",
  "password": "Contra123."
}

USE [SapeTickets]
GO
/** Object:  Table [dbo].[Evento]    Script Date: 4/11/2023 15:41:05 **/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Evento](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [artista] [nvarchar](100) NOT NULL,
    [descripcion] [nvarchar](1000) NULL,
    [categoria] [nvarchar](100) NULL,
    [fecha] [timestamp] NOT NULL,
    [ubicacion] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Evento] PRIMARY KEY CLUSTERED 
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/** Object:  Table [dbo].[Ticket]    Script Date: 4/11/2023 15:41:05 **/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ticket](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [id_evento] [int] NOT NULL,
    [id_usuario] [nvarchar](300) NOT NULL,
    [sector] [nvarchar](100) NOT NULL,
    [precio] [float] NOT NULL,
 CONSTRAINT [PK_Ticket] PRIMARY KEY CLUSTERED 
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Ticket]  WITH CHECK ADD  CONSTRAINT [FK_Ticket_Evento1] FOREIGN KEY([id_evento])
REFERENCES [dbo].[Evento] ([id])
GO
ALTER TABLE [dbo].[Ticket] CHECK CONSTRAINT [FK_Ticket_Evento1]
GO