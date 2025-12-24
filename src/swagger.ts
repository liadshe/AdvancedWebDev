import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lesson API",
      version: "1.0.0",
      description: "API documentation for the lesson project",
    },
    // Set servers so Swagger UI 'Try it out' targets the real API server
    servers: [
      {
        url: process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
        description: "Primary API server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        UserCredentials: {
          type: "object",
          properties: {
            email: { type: "string", example: "user@example.com" },
            password: { type: "string", example: "mypassword" }
          },
          required: ["email", "password"]
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: { type: "string" },
            refreshToken: { type: "string" }
          }
        },
        Movie: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            createdBy: { type: "string" }
          }
        },
        Comment: {
          type: "object",
          properties: {
            text: { type: "string" },
            movieId: { type: "string" },
            createdBy: { type: "string" }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
