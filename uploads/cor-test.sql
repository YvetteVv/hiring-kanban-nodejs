CREATE SCHEMA `cor_test` ;
CREATE TABLE `cor_test`.`question_list` (
  `id` INT NOT NULL,
  `content` VARCHAR(200) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `cor_test`.`student_ask_question` (
  `id` INT NOT NULL,
  `content` VARCHAR(200) NULL,
  `isCovered` INT NULL,
  `rate` DOUBLE NULL,
  `question_content` VARCHAR(200) NULL,
  `question_id` INT NULL,
  `system_answer` VARCHAR(200) NULL,
  `time` VARCHAR(50) NULL,
  PRIMARY KEY (`id`));
CREATE TABLE `cor_test`.`system_ask_question` (
  `id` INT NOT NULL,
  `question_content` VARCHAR(200) NULL,
  `question_id` INT NULL,
  `student_answer` VARCHAR(200) NULL,
  `right_answer` VARCHAR(200) NULL,
  `rate` DOUBLE NULL,
  `isRight` INT NULL,
  `time` VARCHAR(50) NULL,
  PRIMARY KEY (`id`));
ALTER TABLE `cor_test`.`student_ask_question` 
CHANGE COLUMN `id` `id` INT NOT NULL AUTO_INCREMENT ;
ALTER TABLE `cor_test`.`system_ask_question` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ;




INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('1', 'What is a requirements document?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('2', 'What is a statement of work?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('3', 'What does SOW stand for?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('4', 'What is a statement of objectives?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('5', 'What does SOO stand for?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('6', 'When do you use an SOW vs an SOO?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('7', 'When do you use a statement of work vs a statement of objectives?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('8', 'What is a performance work statement?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('9', 'What does PWS stand for?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('10', 'What makes an outcome measurable?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('11', 'What is a specification?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('12', 'What\'s the difference between a specification and an outcome?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('13', 'Why do we have requirements documents?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('14', 'What is a statement of objectives?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('15', 'Which gives the offeror more flexibility, a statement of work or a statement of objectives?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('16', 'What is a performance work statement?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('17', 'It you are writing a performance work statement for an airplane, is the requirement \"The plane should not require high speeds in order for take off\" a measurable outcome?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('18', 'What would be a better way to express the term high speeds in the performance work statement, so that it would be a measurable outcome?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('19', 'what do we want to accomplish as the end result of this contract?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('20', 'what tasks must be accomplished to give us the end result?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('21', 'how much error will we accept?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('22', 'how will we determine that success has been achieved?');
INSERT INTO `cor_test`.`question_list` (`id`, `content`) VALUES ('23', 'how will we reward good performance or address poor performance?');

INSERT INTO `cor_test`.`student_ask_question` (`content`, `isCovered`, `rate`, `question_content`, `question_id`, `system_answer`) VALUES ('test', '1', '0', 'test', '1', 'test');
