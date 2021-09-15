drop table if exists Usuario;

create table Usuario(
	id serial,
	nombre varchar(255),
	email varchar(255),
	password varchar(255),
	img varchar(255),
	role varchar(255),
	estado boolean,
	google boolean
);

alter table Usuario 
add column "createdAt" timestamp;
alter table Usuario 
add column "updatedAt" timestamp;

alter table usuario
add constraint pk_usuario primary key (id);

insert into usuario(nombre, email, password, role, estado)
values('Edgar', 'edgar@rios.navarro', '$2b$10$izRTDzRFqioUzbxyNFsBM.2lyZD1rY6nXJtyYrxP7snfOZMgwONdu', 'ADMIN_ROLE', true);
commit;
