import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let credential;
const envCred = process.env.FIREBASE_SERVICE_ACCOUNT;

if (envCred) {
  const trimmed = envCred.trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      credential = admin.credential.cert(JSON.parse(trimmed));
      console.error('Initialized Firebase Admin using service account JSON from environment variable.');
    } catch (error: any) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT JSON environment variable:', error.message);
    }
  } else {
    const resolvedPath = path.resolve(trimmed);
    if (fs.existsSync(resolvedPath)) {
      credential = admin.credential.cert(resolvedPath);
      console.error(`Initialized Firebase Admin using service account file from environment variable path: ${resolvedPath}`);
    } else {
      console.error(`FIREBASE_SERVICE_ACCOUNT path not found: ${resolvedPath}`);
    }
  }
}

if (!credential) {
  // Fallback to local service-account.json
  const possiblePaths = [
    path.resolve(process.cwd(), 'service-account.json'),
    path.resolve(__dirname, '../service-account.json'),
    path.resolve(__dirname, '../../service-account.json')
  ];
  let foundPath = '';
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      foundPath = p;
      break;
    }
  }
  if (foundPath) {
    try {
      credential = admin.credential.cert(foundPath);
      console.error(`Initialized Firebase Admin using fallback local service-account.json at: ${foundPath}`);
    } catch (error: any) {
      console.error(`Failed to initialize Firebase Admin with fallback local service-account.json at ${foundPath}:`, error.message);
    }
  } else {
    console.error('Warning: No valid Firebase service account found in process.env.FIREBASE_SERVICE_ACCOUNT or local service-account.json. Firebase will try default credentials.');
  }
}

// Initialize Firebase App
try {
  admin.initializeApp({
    credential: credential || admin.credential.applicationDefault()
  });
  console.error('Firebase Admin App initialized successfully.');
} catch (error: any) {
  console.error('Error initializing Firebase Admin App:', error.message);
}

const db = admin.firestore();

const server = new Server(
  {
    name: "firestore-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register list of tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_profile",
        description: "Get the profile document from about/profile.",
        inputSchema: {
          type: "object",
          properties: {}
        }
      },
      {
        name: "update_profile",
        description: "Update or set the profile document at about/profile. Accepts any fields.",
        inputSchema: {
          type: "object",
          additionalProperties: true
        }
      },
      {
        name: "get_contact_info",
        description: "Get the contact info document from about/contact.",
        inputSchema: {
          type: "object",
          properties: {}
        }
      },
      {
        name: "update_contact_info",
        description: "Update or set the contact info document at about/contact. Accepts any fields.",
        inputSchema: {
          type: "object",
          additionalProperties: true
        }
      },
      {
        name: "list_skills",
        description: "List all skill groups from the skills collection.",
        inputSchema: {
          type: "object",
          properties: {}
        }
      },
      {
        name: "save_skill_group",
        description: "Create or update a skill group in the skills collection. If 'id' is provided, updates that document, otherwise auto-generates a new document ID.",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The unique document ID. If omitted, a new document ID is auto-generated."
            }
          },
          additionalProperties: true
        }
      },
      {
        name: "delete_skill_group",
        description: "Delete a skill group from the skills collection by ID.",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The unique document ID of the skill group to delete."
            }
          },
          required: ["id"]
        }
      },
      {
        name: "list_projects",
        description: "List all projects from the projects collection.",
        inputSchema: {
          type: "object",
          properties: {}
        }
      },
      {
        name: "save_project",
        description: "Create or update a project in the projects collection. If 'id' is provided, updates that document, otherwise auto-generates a new document ID.",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The unique document ID. If omitted, a new document ID is auto-generated."
            }
          },
          additionalProperties: true
        }
      },
      {
        name: "delete_project",
        description: "Delete a project from the projects collection by ID.",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The unique document ID of the project to delete."
            }
          },
          required: ["id"]
        }
      }
    ]
  };
});

// Handle tool executions
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  console.error(`Received call for tool ${name} with args:`, JSON.stringify(args));

  try {
    switch (name) {
      case "get_profile": {
        const docRef = db.doc('about/profile');
        const docSnap = await docRef.get();
        if (!docSnap.exists) {
          return {
            content: [{ type: "text", text: JSON.stringify({ message: "Profile document does not exist yet." }) }]
          };
        }
        return {
          content: [{ type: "text", text: JSON.stringify({ id: docSnap.id, ...docSnap.data() }) }]
        };
      }

      case "update_profile": {
        const docRef = db.doc('about/profile');
        const data = args || {};
        await docRef.set(data, { merge: true });
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, message: "Profile document updated successfully." }) }]
        };
      }

      case "get_contact_info": {
        const docRef = db.doc('about/contact');
        const docSnap = await docRef.get();
        if (!docSnap.exists) {
          return {
            content: [{ type: "text", text: JSON.stringify({ message: "Contact document does not exist yet." }) }]
          };
        }
        return {
          content: [{ type: "text", text: JSON.stringify({ id: docSnap.id, ...docSnap.data() }) }]
        };
      }

      case "update_contact_info": {
        const docRef = db.doc('about/contact');
        const data = args || {};
        await docRef.set(data, { merge: true });
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, message: "Contact info document updated successfully." }) }]
        };
      }

      case "list_skills": {
        const colRef = db.collection('skills');
        const snapshot = await colRef.get();
        const skills = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        return {
          content: [{ type: "text", text: JSON.stringify(skills) }]
        };
      }

      case "save_skill_group": {
        const { id, ...data } = (args || {}) as { id?: string; [key: string]: any };
        if (id) {
          const docRef = db.collection('skills').doc(id);
          await docRef.set(data, { merge: true });
          return {
            content: [{ type: "text", text: JSON.stringify({ success: true, id, message: "Skill group updated successfully." }) }]
          };
        } else {
          const docRef = await db.collection('skills').add(data);
          return {
            content: [{ type: "text", text: JSON.stringify({ success: true, id: docRef.id, message: "Skill group created successfully." }) }]
          };
        }
      }

      case "delete_skill_group": {
        const { id } = (args || {}) as { id: string };
        if (!id) {
          throw new Error("Missing required argument 'id'");
        }
        await db.collection('skills').doc(id).delete();
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, message: `Skill group ${id} deleted successfully.` }) }]
        };
      }

      case "list_projects": {
        const colRef = db.collection('projects');
        const snapshot = await colRef.get();
        const projects = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        return {
          content: [{ type: "text", text: JSON.stringify(projects) }]
        };
      }

      case "save_project": {
        const { id, ...data } = (args || {}) as { id?: string; [key: string]: any };
        if (id) {
          const docRef = db.collection('projects').doc(id);
          await docRef.set(data, { merge: true });
          return {
            content: [{ type: "text", text: JSON.stringify({ success: true, id, message: "Project updated successfully." }) }]
          };
        } else {
          const docRef = await db.collection('projects').add(data);
          return {
            content: [{ type: "text", text: JSON.stringify({ success: true, id: docRef.id, message: "Project created successfully." }) }]
          };
        }
      }

      case "delete_project": {
        const { id } = (args || {}) as { id: string };
        if (!id) {
          throw new Error("Missing required argument 'id'");
        }
        await db.collection('projects').doc(id).delete();
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true, message: `Project ${id} deleted successfully.` }) }]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    console.error(`Error executing tool ${name}:`, error);
    return {
      isError: true,
      content: [{ type: "text", text: JSON.stringify({ error: error.message || String(error) }) }]
    };
  }
});

// Start the server using stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Firestore MCP server running on stdio transport");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
