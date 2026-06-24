# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/mediguide-backend-1.0.0.jar app.jar

RUN addgroup -g 1001 -S mediguide && \
    adduser -u 1001 -S mediguide -G mediguide

USER mediguide

EXPOSE 8080

ENTRYPOINT ["java", \
  "-Xms128m", "-Xmx320m", \
  "-jar", "app.jar"]
