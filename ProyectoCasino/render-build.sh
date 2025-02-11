#!/usr/bin/env bash
mvn clean package -DskipTests
java -jar target/*.jar