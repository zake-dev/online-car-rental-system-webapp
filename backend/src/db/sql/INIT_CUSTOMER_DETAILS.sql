CREATE TABLE HERTZ_UTS.CUSTOMER_DETAILS (
  ID int NOT NULL AUTO_INCREMENT,
  FIRST_NAME varchar(20) NOT NULL,
  LAST_NAME varchar(20) NOT NULL,
  ADDRESS_LINE_1 varchar(255) NOT NULL,
  ADDRESS_LINE_2 varchar(255) NOT NULL,
  SUBURB varchar(20) NOT NULL,
  POSTCODE varchar(4) NOT NULL,
  STATE varchar(10) NOT NULL,
  PAYMENT_TYPE varchar(10) NOT NULL,
  PRIMARY KEY (ID)
);
