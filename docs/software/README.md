# Реалізація інформаційного та програмного забезпечення

В рамках проекту розробляється: 

## SQL-скрипт

```
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema default_schema
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema imbaza
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `imbaza` ;

-- -----------------------------------------------------
-- Schema imbaza
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `imbaza` DEFAULT CHARACTER SET utf8 ;
USE `imbaza` ;

-- -----------------------------------------------------
-- Table `imbaza`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `imbaza`.`user` ;

CREATE TABLE IF NOT EXISTS `imbaza`.`user` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `email` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `avatar` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `imbaza`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `imbaza`.`role` ;

CREATE TABLE IF NOT EXISTS `imbaza`.`role` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `name` ENUM('ProjectManager', 'ProjectUser', 'SystemAdministrator', 'WorkspaceManager') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `imbaza`.`access`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `imbaza`.`access` ;

CREATE TABLE IF NOT EXISTS `imbaza`.`access` (
  `user_id` BINARY(16) NOT NULL,
  `role_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  INDEX `fk_access_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_access_role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_access_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `imbaza`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_access_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `imbaza`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `imbaza`.`operation_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `imbaza`.`operation_type` ;

CREATE TABLE IF NOT EXISTS `imbaza`.`operation_type` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `name` ENUM('create', 'read', 'update', 'delete') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `imbaza`.`request_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `imbaza`.`request_type` ;

CREATE TABLE IF NOT EXISTS `imbaza`.`request_type` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `object_id` BINARY(16) NOT NULL,
  `operation_type_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`id`, `object_id`, `operation_type_id`),
  INDEX `fk_request_type_operation_type1_idx` (`operation_type_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_request_operation`
    FOREIGN KEY (`operation_type_id`)
    REFERENCES `imbaza`.`operation_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `imbaza`.`grant`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `imbaza`.`grant` ;

CREATE TABLE IF NOT EXISTS `imbaza`.`grant` (
  `request_type_id` BINARY(16) NOT NULL,
  `role_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`request_type_id`, `role_id`),
  INDEX `fk_grant_role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_grant_request`
    FOREIGN KEY (`request_type_id`)
    REFERENCES `imbaza`.`request_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_grant_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `imbaza`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `imbaza`.`workspace`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `imbaza`.`workspace` ;

CREATE TABLE IF NOT EXISTS `imbaza`.`workspace` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NULL DEFAULT NULL,
  `owner_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`id`, `owner_id`),
  INDEX `fk_workspace_user1_idx` (`owner_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `owner_id_UNIQUE` (`owner_id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  CONSTRAINT `fk_workspace_user`
    FOREIGN KEY (`owner_id`)
    REFERENCES `imbaza`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `imbaza`.`project`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `imbaza`.`project` ;

CREATE TABLE IF NOT EXISTS `imbaza`.`project` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `manager_id` BINARY(16) NOT NULL,
  `workspace_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`manager_id`, `workspace_id`, `id`),
  INDEX `fk_project_user1_idx` (`manager_id` ASC) VISIBLE,
  INDEX `fk_project_workspace1_idx` (`workspace_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_project_user`
    FOREIGN KEY (`manager_id`)
    REFERENCES `imbaza`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_project_workspace`
    FOREIGN KEY (`workspace_id`)
    REFERENCES `imbaza`.`workspace` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `imbaza`.`board`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `imbaza`.`board` ;

CREATE TABLE IF NOT EXISTS `imbaza`.`board` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NULL,
  `project_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`id`, `project_id`),
  INDEX `fk_board_project1_idx` (`project_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_board_project`
    FOREIGN KEY (`project_id`)
    REFERENCES `imbaza`.`project` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `imbaza`.`task`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `imbaza`.`task` ;

CREATE TABLE IF NOT EXISTS `imbaza`.`task` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NULL DEFAULT NULL,
  `photo` VARCHAR(100) NULL DEFAULT NULL,
  `deadline` DATETIME NULL DEFAULT NULL,
  `board_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`id`, `board_id`),
  INDEX `fk_task_board1_idx` (`board_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_task_board`
    FOREIGN KEY (`board_id`)
    REFERENCES `imbaza`.`board` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `imbaza`.`status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `imbaza`.`status` ;

CREATE TABLE IF NOT EXISTS `imbaza`.`status` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `name` ENUM('Done', 'BugFound', 'InReview', 'InProgress', 'ToDo', 'BackLog') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `imbaza`.`task_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `imbaza`.`task_status` ;

CREATE TABLE IF NOT EXISTS `imbaza`.`task_status` (
  `task_id` BINARY(16) NOT NULL,
  `status_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`task_id`, `status_id`),
  INDEX `fk_task_status_status1_idx` (`status_id` ASC) VISIBLE,
  CONSTRAINT `fk_task_status_task`
    FOREIGN KEY (`task_id`)
    REFERENCES `imbaza`.`task` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_task_status_status`
    FOREIGN KEY (`status_id`)
    REFERENCES `imbaza`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

```

## RESTfull сервіс для управління даними

### Підключення до бази та визначення моделей

```ts
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model access {
  id      Bytes @unique(map: "id_UNIQUE") @default(dbgenerated("(uuid_to_bin(uuid()))")) @db.Binary(16)
  user_id Bytes @db.Binary(16)
  role_id Bytes @db.Binary(16)
  role    role  @relation(fields: [role_id], references: [id], map: "fk_access_role")
  user    user  @relation(fields: [user_id], references: [id], map: "fk_access_user")

  @@id([id, user_id, role_id])
  @@index([role_id], map: "fk_access_role1_idx")
  @@index([user_id], map: "fk_access_user_idx")
}

model board {
  id          Bytes   @unique(map: "id_UNIQUE") @default(dbgenerated("(uuid_to_bin(uuid()))")) @db.Binary(16)
  name        String  @db.VarChar(45)
  description String? @db.VarChar(200)
  project_id  Bytes   @db.Binary(16)
  project     project @relation(fields: [project_id], references: [id], map: "fk_board_project")
  task        task[]

  @@id([id, project_id])
  @@index([project_id], map: "fk_board_project1_idx")
}

model grant {
  request_type_id Bytes        @db.Binary(16)
  role_id         Bytes        @db.Binary(16)
  request_type    request_type @relation(fields: [request_type_id], references: [id], map: "fk_grant_request")
  role            role         @relation(fields: [role_id], references: [id], map: "fk_grant_role")

  @@id([request_type_id, role_id])
  @@index([role_id], map: "fk_grant_role1_idx")
}

model operation_type {
  id           Bytes               @id @unique(map: "id_UNIQUE") @default(dbgenerated("(uuid_to_bin(uuid()))")) @db.Binary(16)
  name         operation_type_name @unique(map: "name_UNIQUE")
  request_type request_type[]
}

model project {
  id           Bytes     @unique(map: "id_UNIQUE") @default(dbgenerated("(uuid_to_bin(uuid()))")) @db.Binary(16)
  name         String    @db.VarChar(45)
  description  String?   @db.VarChar(45)
  manager_id   Bytes     @db.Binary(16)
  workspace_id Bytes     @db.Binary(16)
  board        board[]
  user         user      @relation(fields: [manager_id], references: [id], map: "fk_project_user")
  workspace    workspace @relation(fields: [workspace_id], references: [id], map: "fk_project_workspace")

  @@id([manager_id, workspace_id, id])
  @@index([manager_id], map: "fk_project_user1_idx")
  @@index([workspace_id], map: "fk_project_workspace1_idx")
}

model request_type {
  id                Bytes          @unique(map: "id_UNIQUE") @default(dbgenerated("(uuid_to_bin(uuid()))")) @db.Binary(16)
  object_id         Bytes          @db.Binary(16)
  operation_type_id Bytes          @db.Binary(16)
  grant             grant[]
  operation_type    operation_type @relation(fields: [operation_type_id], references: [id], map: "fk_request_operation")

  @@id([id, object_id, operation_type_id])
  @@index([operation_type_id], map: "fk_request_type_operation_type1_idx")
}

model role {
  id     Bytes     @id @unique(map: "id_UNIQUE") @default(dbgenerated("(uuid_to_bin(uuid()))")) @db.Binary(16)
  name   role_name
  access access[]
  grant  grant[]
}

model status {
  id          Bytes         @id @unique(map: "id_UNIQUE") @default(dbgenerated("(uuid_to_bin(uuid()))")) @db.Binary(16)
  name        status_name   @unique(map: "name_UNIQUE")
  task_status task_status[]
}

model task {
  id          Bytes         @unique(map: "id_UNIQUE") @default(dbgenerated("(uuid_to_bin(uuid()))")) @db.Binary(16)
  title       String        @db.VarChar(45)
  description String?       @db.VarChar(200)
  photo       String?       @db.VarChar(100)
  deadline    DateTime?     @db.DateTime(0)
  board_id    Bytes         @db.Binary(16)
  board       board         @relation(fields: [board_id], references: [id], map: "fk_task_board")
  task_status task_status[]

  @@id([id, board_id])
  @@index([board_id], map: "fk_task_board1_idx")
}

model task_status {
  task_id   Bytes  @db.Binary(16)
  status_id Bytes  @db.Binary(16)
  status    status @relation(fields: [status_id], references: [id], map: "fk_task_status_status")
  task      task   @relation(fields: [task_id], references: [id], map: "fk_task_status_task")

  @@id([task_id, status_id])
  @@index([status_id], map: "fk_task_status_status1_idx")
}

model user {
  id        Bytes      @id @unique(map: "id_UNIQUE") @default(dbgenerated("(uuid_to_bin(uuid()))")) @db.Binary(16)
  email     String     @unique(map: "email_UNIQUE") @db.VarChar(45)
  username  String     @unique(map: "username_UNIQUE") @db.VarChar(45)
  avatar    String?    @db.VarChar(100)
  access    access[]
  project   project[]
  workspace workspace?
}

model workspace {
  id          Bytes     @unique(map: "id_UNIQUE") @default(dbgenerated("(uuid_to_bin(uuid()))")) @db.Binary(16)
  name        String    @unique(map: "name_UNIQUE") @db.VarChar(45)
  description String?   @db.VarChar(200)
  owner_id    Bytes     @unique(map: "owner_id_UNIQUE") @db.Binary(16)
  project     project[]
  user        user      @relation(fields: [owner_id], references: [id], map: "fk_workspace_user")

  @@id([id, owner_id])
  @@index([owner_id], map: "fk_workspace_user1_idx")
}

enum operation_type_name {
  create
  read
  update
  delete
}

enum role_name {
  ProjectManager
  ProjectUser
  SystemAdministrator
  WorkspaceManager
}

enum status_name {
  Done
  BugFound
  InReview
  InProgress
  ToDo
  BackLog
}


```

### Файл контролерів, які оброблюють запити

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StatusEntity } from './entities/status.entity';

@Controller('status')
@ApiTags('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  @ApiCreatedResponse({ type: StatusEntity })
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  @ApiOkResponse({ type: StatusEntity, isArray: true })
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: StatusEntity })
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: StatusEntity })
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(id, updateStatusDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusEntity })
  remove(@Param('id') id: string) {
    return this.statusService.remove(id);
  }
}
```

### Файл сервісу який робить запити до бази даних

```ts
import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) {}
  async create(@Body() createStatusDto: CreateStatusDto) {
    try {
      const status = await this.prisma.status.create({ data: createStatusDto });
      const id: string = this.prisma.hex(status.id);
      return { ...status, id };
    } catch (error) {
      throw new NotFoundException('invalis status');
    }
  }

  async findAll() {
    const statuses = await this.prisma.status.findMany({});
    const responseStatuses = statuses.map((status) => ({
      ...status,
      id: this.prisma.hex(status.id),
    }));
    return responseStatuses;
  }

  async findOne(id: string) {
    const idUnHexed: Buffer = this.prisma.unhex(id);
    const status = await this.prisma.status.findFirst({
      where: { id: idUnHexed },
    });
    if (!status)
      throw new NotFoundException(`status with id: ${id} does not exist`);
    return { ...status, id };
  }

  async update(id: string, updateStatusDto: UpdateStatusDto) {
    const idUnHexed: Buffer = this.prisma.unhex(id);
    const status = await this.prisma.status.update({
      where: { id: idUnHexed },
      data: updateStatusDto,
    });
    if (!status)
      throw new NotFoundException(`status with id: ${id} does not exist`);
    return { ...status, id };
  }

  async remove(id: string) {
    const idUnHexed: Buffer = this.prisma.unhex(id);
    const status = await this.prisma.status.delete({
      where: { id: idUnHexed },
    });
    if (!status)
      throw new NotFoundException(`status with id: ${id} does not exist`);
    return { message: `status ${status.name} was deleted` };
  }
}

```

### Кореневий файл серверу

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();


```