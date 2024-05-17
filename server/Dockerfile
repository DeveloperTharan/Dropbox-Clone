FROM maven:3.9.5-openjdk-22 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:22.0.1-jdk-slim
COPY --from=build /target/dropbox-0.0.1-SNAPSHOT.jar dropbox.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","dropbox.jar"]