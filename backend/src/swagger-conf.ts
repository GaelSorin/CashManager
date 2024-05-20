const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Relmagined Realm API",
      version: "1.0.0",
      description: "Documentation for Relmagined Realm API",
    },
    host: "localhost:8000",
    basePath: "/api",
    schemes: ["https"],
    produces: ["application/json"],
    paths: {
      "/auth/login": {
        post: {
          tags: ["Auth"],
          description: "Login user",
          operationId: "login",
          parameters: [
            {
              name: "email",
              in: "body",
              description: "email",
              required: true,
              schema: {
                type: "string",
              },
            },
            {
              name: "password",
              in: "body",
              description: "password",
              required: true,
              schema: {
                type: "string",
              },
            }
          ],
          responses: {
            "200": {
              description: "Login success return cookie",
              // return {"msg": "Created successfully"}
              // content: {
              //   "application/json": {
              //     schema: {
              //       type: "object",
              //       items: {}
              //     },
              //   },
              // },
            },
          },
        },
      },
      "/auth/register": {
        post: {
          tags: ["Auth"],
          description: "Register user",
          operationId: "register",
          parameters: [
            {
              name: "email",
              in: "body",
              description: "user email",
              required: true,
              schema: {
                type: "string",
              },
            },
            {
              name: "password",
              in: "body",
              description: "user password",
              required: true,
              schema: {
                type: "string",
              },
            },
            {
              name: "pseudo",
              in: "body",
              description: "user pseudo",
              required: true,
              schema: {
                type: "string",
              },
            }
          ],
          responses: {
            "200": {
              description: "register success return message",
            },
          },
        },
      },
      "/auth/logout": {
        post: {
          tags: ["Auth"],
          description: "Logout user",
          operationId: "logout",
          responses: {
            "200": {
              description: "Logout success delete cookie",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerOptions;
