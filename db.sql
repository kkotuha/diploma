create database IF NOT EXISTS publictr;
use publictr;

create table ROUTE_TYPE
(
route_type_id int NOT NULL,
route_type VARCHAR(100) NOT NULL,
CONSTRAINT route_type_pk PRIMARY KEY (route_type_id)
);

create table ROUTE
(
route_no INT NOT NULL,
direction INT,
price INT NOT NULL,
route_type_id INT,
route_name VARCHAR(50) NOT NULL,
FOREIGN KEY (route_type_id)
REFERENCES ROUTE_TYPE(route_type_id),
CONSTRAINT route_pk PRIMARY KEY (route_no)
);

create table VEHICLE_TYPE
(
vehicle_type_id INT NOT NULL,
vehicle_type VARCHAR(20) NOT NULL,
vehicle_model VARCHAR(20) NOT NULL,
CONSTRAINT vehicle_type_pk PRIMARY KEY (vehicle_type_id)
);
create table VEHICLE
(
vehicle_no INT NOT NULL,
plate_no VARCHAR(20) NOT NULL,
isActive INT NOT NULL,
vehicle_type_id INT,
FOREIGN KEY (vehicle_type_id)
REFERENCES VEHICLE_TYPE(vehicle_type_id),
CONSTRAINT vehicle_pk PRIMARY KEY (vehicle_no)
);

create table STOP
(
stop_id INT NOT NULL,
name  VARCHAR(50) NOT NULL,
latitude INT NOT NULL,
longitude INT NOT NULL,
CONSTRAINT stop_pk PRIMARY KEY (stop_id)
);

create table VEICHLES_ON_ROUTE
(
v_on_r_id INT NOT NULL,
route_no INT NOT NULL,
vehicle_no INT NOT NULL,
no_on_route INT,
FOREIGN KEY (route_no)
REFERENCES ROUTE(route_no),
FOREIGN KEY (vehicle_no)
REFERENCES VEHICLE(vehicle_no),
CONSTRAINT v_on_r_pk PRIMARY KEY (v_on_r_id)
);


create table SCHEDULE
(
timestamp_id INT NOT NULL,
stop_id INT NOT NULL,
v_on_r_id  INT NOT NULL,
day VARCHAR(20),
arrial_time time NOT NULL,
FOREIGN KEY (v_on_r_id)
REFERENCES VEICHLES_ON_ROUTE(v_on_r_id),
FOREIGN KEY (stop_id)
REFERENCES STOP(stop_id),
CONSTRAINT schedule_pk PRIMARY KEY (timestamp_id)
);