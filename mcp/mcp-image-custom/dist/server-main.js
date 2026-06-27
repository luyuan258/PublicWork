/**
 * MCP Image Generator - Server Entry Point
 */
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { MCPServerImpl } from './server/mcpServer.js';
import { Logger } from './utils/logger.js';
const logger = new Logger();
/**
 * Application startup
 */
async function main() {
    try {
        logger.info('mcp-startup', 'Starting MCP Image Generator initialization', {
            nodeVersion: process.version,
            platform: process.platform,
            env: process.env['NODE_ENV'] || 'development',
        });
        const mcpServerImpl = new MCPServerImpl();
        const server = mcpServerImpl.initialize();
        const transport = new StdioServerTransport();
        await server.connect(transport);
        logger.info('mcp-startup', 'Image Generator MCP Server started successfully');
    }
    catch (error) {
        logger.error('mcp-startup', 'Failed to start MCP server', error, {
            errorType: error?.constructor?.name,
            stack: error?.stack,
        });
        process.exit(1);
    }
}
// Run main function
main().catch((error) => {
    logger.error('mcp-startup', 'Fatal error during startup', error);
    process.exit(1);
});
//# sourceMappingURL=server-main.js.map