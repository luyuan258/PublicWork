#!/usr/bin/env node
/**
 * MCP Image Generator - Entry Point Router
 *
 * Routes to:
 * - skills install  → bin/install-skills.js
 * - (default)       → MCP server startup
 */
export type { GeneratedImageResult } from './api/imageClient.js';
export { createMCPServer, MCPServerImpl } from './server/mcpServer.js';
export type { GenerateImageParams, MCPServerConfig } from './types/mcp.js';
//# sourceMappingURL=index.d.ts.map