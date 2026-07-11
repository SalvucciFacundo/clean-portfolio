import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
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
        }
        catch (error) {
            console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT JSON environment variable:', error.message);
        }
    }
    else {
        const resolvedPath = path.resolve(trimmed);
        if (fs.existsSync(resolvedPath)) {
            credential = admin.credential.cert(resolvedPath);
            console.error(`Initialized Firebase Admin using service account file from environment variable path: ${resolvedPath}`);
        }
        else {
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
        }
        catch (error) {
            console.error(`Failed to initialize Firebase Admin with fallback local service-account.json at ${foundPath}:`, error.message);
        }
    }
    else {
        console.error('Warning: No valid Firebase service account found in process.env.FIREBASE_SERVICE_ACCOUNT or local service-account.json. Firebase will try default credentials.');
    }
}
// Initialize Firebase App
try {
    admin.initializeApp({
        credential: credential || admin.credential.applicationDefault()
    });
    console.error('Firebase Admin App initialized successfully.');
}
catch (error) {
    console.error('Error initializing Firebase Admin App:', error.message);
}
const db = admin.firestore();
const server = new Server({
    name: "firestore-mcp-server",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
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
                description: "Actualiza el documento de perfil general (about/profile) en Firestore. Modifica los textos principales y la foto del Hero.",
                inputSchema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "Nombre completo del desarrollador (se muestra en el Header, Hero alt, footer copyright, etc.)"
                        },
                        headline: {
                            type: "string",
                            description: "Título o encabezado principal en texto gigante del Hero (ej: 'Building reliable <br /> <span class=\"digital-text\">web apps</span> with a focus on quality.'). Soporta HTML para estilos."
                        },
                        summary: {
                            type: "string",
                            description: "Párrafo de descripción/resumen profesional en el Hero (ej: 'I\'m a <span class=\"highlight\">Full-Stack Developer...</span>'). Soporta HTML y clases de color: highlight, highlight-angular, highlight-firebase."
                        },
                        pictureUrl: {
                            type: "string",
                            description: "Ruta o URL de la imagen de perfil principal mostrada en el Hero (ej: 'assets/profile2.jpg')"
                        }
                    },
                    additionalProperties: true
                }
            },
            {
                name: "get_contact_info",
                description: "Obtiene la información de contacto y enlaces del documento about/contact.",
                inputSchema: {
                    type: "object",
                    properties: {}
                }
            },
            {
                name: "update_contact_info",
                description: "Actualiza la información de contacto y redes sociales (about/contact) en Firestore. Afecta a los botones de redes y descarga de CV del Hero.",
                inputSchema: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            description: "Correo electrónico de contacto profesional (se usa para el botón 'Hire Me' en el Header)"
                        },
                        phone: {
                            type: "string",
                            description: "Número de teléfono de contacto"
                        },
                        location: {
                            type: "string",
                            description: "Ubicación geográfica (ej: 'Mendoza, Argentina (Remote)')"
                        },
                        github: {
                            type: "string",
                            description: "URL completa de tu perfil de GitHub (se muestra como botón en el Hero y enlace en Header/redes)"
                        },
                        linkedin: {
                            type: "string",
                            description: "URL completa de tu perfil de LinkedIn (se muestra como botón en el Hero y enlace en Header/redes)"
                        },
                        resumeUrl: {
                            type: "string",
                            description: "Ruta o URL del archivo PDF de tu CV, descargado por el botón 'Get Resume' del Hero (ej: 'assets/facundo-salvucci_cv.pdf')"
                        }
                    },
                    additionalProperties: true
                }
            },
            {
                name: "list_skills",
                description: "Obtiene la lista de todas las habilidades del portafolio (skills) en Firestore.",
                inputSchema: {
                    type: "object",
                    properties: {}
                }
            },
            {
                name: "save_skill",
                description: "Crea o actualiza una habilidad en el portafolio (Skill). Si se pasa 'id', actualiza, sino genera un ID nuevo.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string", description: "ID del documento en Firestore. Si se omite, se generará uno nuevo." },
                        name: { type: "string", description: "Nombre de la habilidad (ej. Angular, Firebase, TypeScript)" },
                        imgUrl: { type: "string", description: "URL de la imagen del icono de la habilidad" },
                        icon: { type: "string", description: "Nombre opcional del icono Material Symbols" },
                        color: { type: "string", description: "Color principal en formato hex o rgb (ej. #dd0031)" },
                        bgColor: { type: "string", description: "Color de fondo de la tarjeta en formato hex o rgb (ej. #fef2f2)" },
                        featured: { type: "boolean", description: "Indica si es una habilidad destacada en el home" }
                    },
                    required: ["name", "color", "bgColor"]
                }
            },
            {
                name: "delete_skill",
                description: "Elimina una habilidad del portafolio por su ID.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string", description: "ID del documento de la habilidad a eliminar." }
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
                name: 'save_project',
                description: 'Crea o actualiza un proyecto del portafolio (Project).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', description: 'ID del documento en Firestore. Si se omite, se generará uno nuevo.' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        image: { type: 'string', description: 'URL o ruta de la imagen del proyecto' },
                        category: { type: 'string', description: 'Categoría del proyecto (Full-Stack, E-commerce, Dashboard, etc.)' },
                        statusLabel: { type: 'string', description: 'Estado opcional: Production, In Progress, etc.' },
                        tags: { type: 'array', items: { type: 'string' } },
                        link: { type: 'string', description: 'URL del proyecto en vivo' },
                        repoLink: { type: 'string', description: 'URL del repositorio GitHub' },
                    },
                    required: ['title', 'description', 'tags'],
                },
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
            },
            {
                name: "list_experience",
                description: "Obtiene la lista de toda la experiencia profesional (experience) en Firestore.",
                inputSchema: {
                    type: "object",
                    properties: {}
                }
            },
            {
                name: "save_experience",
                description: "Crea o actualiza una experiencia profesional (Experience) en Firestore. Si se pasa 'id', actualiza, sino genera un ID nuevo.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string", description: "ID del documento en Firestore. Si se omite, se generará uno nuevo." },
                        company: { type: "string", description: "Nombre de la empresa (ej: Freelance, Dubbz)" },
                        position: { type: "string", description: "Cargo o puesto desempeñado (ej: Full-Stack Developer)" },
                        period: { type: "string", description: "Periodo de tiempo trabajado (ej: '2023 - Present', '2023 - 2025')" },
                        description: { type: "string", description: "Descripción detallada del puesto (soporta HTML, ej: '<ul><li>Logro 1</li>...</ul>')" }
                    },
                    required: ["company", "position", "period", "description"]
                }
            },
            {
                name: "delete_experience",
                description: "Elimina una experiencia profesional del portafolio por su ID.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string", description: "ID del documento de la experiencia a eliminar." }
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
            case "save_skill": {
                const { id, ...data } = (args || {});
                if (id) {
                    const docRef = db.collection('skills').doc(id);
                    await docRef.set(data, { merge: true });
                    return {
                        content: [{ type: "text", text: `Skill '${id}' saved successfully` }]
                    };
                }
                else {
                    const docRef = await db.collection('skills').add(data);
                    return {
                        content: [{ type: "text", text: `Skill created with ID: ${docRef.id}` }]
                    };
                }
            }
            case "delete_skill": {
                const { id } = (args || {});
                if (!id) {
                    throw new Error("Missing required argument 'id'");
                }
                await db.collection('skills').doc(id).delete();
                return {
                    content: [{ type: "text", text: `Skill '${id}' deleted successfully` }]
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
            case 'save_project': {
                const { id, ...data } = (args || {});
                if (id) {
                    await db.collection('projects').doc(id).set(data, { merge: true });
                    return { content: [{ type: 'text', text: `Project '${id}' saved successfully` }] };
                }
                else {
                    const docRef = await db.collection('projects').add(data);
                    return { content: [{ type: 'text', text: `Project created with ID: ${docRef.id}` }] };
                }
            }
            case "delete_project": {
                const { id } = (args || {});
                if (!id) {
                    throw new Error("Missing required argument 'id'");
                }
                await db.collection('projects').doc(id).delete();
                return {
                    content: [{ type: "text", text: JSON.stringify({ success: true, message: `Project ${id} deleted successfully.` }) }]
                };
            }
            case "list_experience": {
                const colRef = db.collection('experience');
                const snapshot = await colRef.get();
                const experience = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                return {
                    content: [{ type: "text", text: JSON.stringify(experience) }]
                };
            }
            case "save_experience": {
                const { id, ...data } = (args || {});
                if (id) {
                    await db.collection('experience').doc(id).set(data, { merge: true });
                    return { content: [{ type: 'text', text: `Experience '${id}' saved successfully` }] };
                }
                else {
                    const docRef = await db.collection('experience').add(data);
                    return { content: [{ type: 'text', text: `Experience created with ID: ${docRef.id}` }] };
                }
            }
            case "delete_experience": {
                const { id } = (args || {});
                if (!id) {
                    throw new Error("Missing required argument 'id'");
                }
                await db.collection('experience').doc(id).delete();
                return { content: [{ type: 'text', text: `Experience '${id}' deleted successfully` }] };
            }
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    }
    catch (error) {
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
